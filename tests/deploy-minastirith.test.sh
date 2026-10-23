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

# CA3: rsync quebrado -> job vermelho, mensagem do passo, aponta o backup (que roda antes do rsync).
step "Publish" > "$T/pub.sh"; mkdir -p "$T/dist"; cd "$T"
bash -e -o pipefail "$T/pub.sh" > "$T/pub.log" 2>&1; rc=$?
cd - >/dev/null
[ $rc -ne 0 ] && ok "CA3 rsync com falha => job vermelho" || ko "CA3 job verde com falha"
grep -q "rsync falhou 3x" "$T/pub.log" && grep -q "bak.tgz" "$T/pub.log" && ok "CA3 mensagem do passo e backup" || ko "CA3 mensagem"
python3 - <<P && ok "CA3 backup antes do rsync" || ko "CA3 ordem dos passos"
import yaml;n=[s.get('name','') for s in yaml.safe_load(open('$WF'))['jobs']['deploy']['steps']]
assert n.index(next(x for x in n if x.startswith('Backup')))<n.index(next(x for x in n if x.startswith('Publish')))
P

# CA4: nenhum valor sentinela (host, porta, usuario, chave) nos logs.
if grep -rqE "sentinela-host|sentinela-user|29999|BEGIN OPENSSH|$(head -c 20 <<<"$SSH_KEY_B64")" "$T"/*.log; then ko "CA4 segredo no log"; else ok "CA4 sem segredo no log"; fi
grep -nE 'set -x|-v ' "$WF" >/dev/null && ko "CA4 modo verboso no workflow" || ok "CA4 sem set -x/ssh -v"
exit $fail
