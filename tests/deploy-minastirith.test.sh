#!/usr/bin/env bash
# Testes do workflow .gitea/workflows/deploy-minastirith.yml (CA1, CA3, CA4 da issue #20), sem rede e sem secret real.
set -uo pipefail
cd "$(dirname "$0")/.."
WF=.gitea/workflows/deploy-minastirith.yml
T=$(mktemp -d); trap 'rm -rf "$T"' EXIT
fail=0; ok() { echo "ok   $1"; }; ko() { echo "FALHA $1"; fail=1; }
step() { python3 -c "
import sys,yaml;d=yaml.safe_load(open('$WF'))
print([s for s in d['jobs']['deploy']['steps'] if s.get('name','').startswith(sys.argv[1])][0]['run'])" "$1"; }

# CA1: em PR o Publish e pulado e o artefato nao sobe; o Build roda sempre.
IF=$(python3 -c "import yaml;d=yaml.safe_load(open('$WF'));print(d['jobs']['deploy']['if'])")
[[ "$IF" == *"!= 'pull_request'"* && "$IF" == *"refs/heads/prd"* ]] && ok "CA1 Publish pulado em PR" || ko "CA1 condicao do Publish"
python3 -c "import yaml;d=yaml.safe_load(open('$WF'));assert 'if' not in d['jobs']['build']" && ok "CA1 Build sem condicao" || ko "CA1 Build condicionado"

# Stubs: ssh-keyscan/ssh/rsync/sleep falham ou imprimem; $HOME isolado.
mkdir -p "$T/bin" "$T/home"
printf '#!/bin/sh\necho "$HOST_SENTINEL_FAKE" >/dev/null; echo "stub-keyscan"; exit 0\n' > "$T/bin/ssh-keyscan"
printf '#!/bin/sh\nexit 0\n' > "$T/bin/sleep"
printf '#!/bin/sh\necho "rsync: connection unexpectedly closed" >&2; exit 12\n' > "$T/bin/rsync"
chmod +x "$T"/bin/*
export PATH="$T/bin:$PATH" HOME="$T/home"
export DEPLOY_PATH=/opt/nginx/manager/rvmtech HOST=sentinela-host.invalid PORT=29999 USER_=sentinela-user
ssh-keygen -q -t ed25519 -N '' -f "$T/k" >/dev/null
# chave sem \n final (caso real dos runs falhos): o passo deve normalizar e passar
export SSH_KEY_B64=$(printf '%s' "$(cat "$T/k")" | base64 -w0)

step "Configure SSH" > "$T/cfg.sh"
bash -e -o pipefail "$T/cfg.sh" > "$T/cfg.log" 2>&1 && ok "chave sem newline final aceita" || { ko "Configure SSH"; cat "$T/cfg.log"; }

# CA3: backup REAL (ssh stub executa o comando remoto localmente) e depois rsync quebrado.
mkdir -p "$T/sshstub" "$T/srv/rvmtech" "$T/dist"; echo "site antigo" > "$T/srv/rvmtech/index.html"
printf '#!/bin/bash\nbash -c "${@: -1}"\n' > "$T/sshstub/ssh"; chmod +x "$T/sshstub/ssh"
export DEPLOY_PATH="$T/srv/rvmtech"
step "Backup" > "$T/bkp.sh"; step "Publish" > "$T/pub.sh"
PATH="$T/sshstub:$PATH" bash -e -o pipefail "$T/bkp.sh" > "$T/bkp.log" 2>&1 && ok "CA3 backup executado" || { ko "CA3 backup"; cat "$T/bkp.log"; }
tar -tzf "$DEPLOY_PATH.bak.tgz" | grep -q 'rvmtech/index.html' && ok "CA3 .bak.tgz existe e tem o site anterior" || ko "CA3 .bak.tgz ausente"
(cd "$T" && bash -e -o pipefail "$T/pub.sh" > "$T/pub.log" 2>&1); rc=$?
[ $rc -ne 0 ] && ok "CA3 rsync com falha => job vermelho" || ko "CA3 job verde com falha"
grep -q "rsync falhou 3x" "$T/pub.log" && ok "CA3 mensagem do passo" || ko "CA3 mensagem"
[ -s "$DEPLOY_PATH.bak.tgz" ] && ok "CA3 backup segue la apos a falha" || ko "CA3 backup sumiu"

# CA4: falha de conexao REAL do ssh (host que nao resolve e porta recusada) nao pode vazar host, porta ou usuario.
for H in sentinela-host.invalid 127.0.0.1; do
  export HOST=$H PORT=29999 USER_=sentinela-user
  for st in Backup Verify; do
    step "$st" > "$T/net.sh"
    bash -e -o pipefail "$T/net.sh" > "$T/net-$st-$H.log" 2>&1 && ko "CA4 $st deveria falhar sem rede"
  done
done
cat "$T"/net-*.log > "$T/all.log"; grep -q -E 'Could not resolve|refused|Connection' "$T/all.log" && ok "CA4 ssh real falhou como esperado" || ko "CA4 ssh nao falhou por rede"
export HOST=sentinela-host.invalid
if grep -qE "sentinela-host|sentinela-user|29999|127\.0\.0\.1|BEGIN OPENSSH|$(head -c 20 <<<"$SSH_KEY_B64")" "$T"/*.log; then ko "CA4 segredo no log"; grep -hE "sentinela|29999|127\.0\.0\.1" "$T"/*.log | head; else ok "CA4 sem segredo no log"; fi
grep -nE 'set -x|ssh -v' "$WF" >/dev/null && ko "CA4 modo verboso no workflow" || ok "CA4 sem set -x/ssh -v"
exit $fail
