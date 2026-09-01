import { animate, inView } from "motion";
import Lenis from "lenis";

/**
 * Inicializa Lenis smooth scroll com config premium.
 * Chamado pelo Layout uma única vez por page load + view transition swap.
 */
export function initLenis(): Lenis {
  const lenis = new Lenis({
    duration: 1.4,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    syncTouch: false,
    touchMultiplier: 1.6,
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  return lenis;
}

/**
 * Magnetic button — segue cursor com spring decaimento.
 * Aplicado em qualquer elemento com data-magnetic.
 */
export function initMagnetic(): void {
  const els = document.querySelectorAll<HTMLElement>("[data-magnetic]");

  els.forEach((el) => {
    const strength = parseFloat(el.dataset.magneticStrength || "0.35");

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      animate(el, { x: dx, y: dy }, { duration: 0.5, ease: [0.16, 1, 0.3, 1] });
    };

    const onLeave = () => {
      animate(el, { x: 0, y: 0 }, { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] });
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
  });
}

/**
 * Char-by-char reveal — split text em spans, anima com stagger.
 * Aplica em [data-split].
 */
export function initSplitReveal(): void {
  const els = document.querySelectorAll<HTMLElement>("[data-split]");

  els.forEach((el) => {
    if (el.dataset.splitDone === "1") return;
    el.dataset.splitDone = "1";

    const text = el.textContent || "";
    el.textContent = "";

    const words = text.split(/(\s+)/);
    words.forEach((word) => {
      if (/^\s+$/.test(word)) {
        el.appendChild(document.createTextNode(word));
        return;
      }
      const wordSpan = document.createElement("span");
      wordSpan.style.display = "inline-block";
      wordSpan.style.whiteSpace = "nowrap";
      [...word].forEach((ch) => {
        const charSpan = document.createElement("span");
        charSpan.className = "char";
        charSpan.textContent = ch;
        wordSpan.appendChild(charSpan);
      });
      el.appendChild(wordSpan);
    });

    const chars = el.querySelectorAll<HTMLElement>(".char");
    inView(el, () => {
      chars.forEach((c, i) => {
        setTimeout(() => c.classList.add("in"), i * 22);
      });
    }, { margin: "0px 0px -10% 0px" });
  });
}

/**
 * Custom cursor blob — segue mouse com lag, expande em hover.
 */
export function initCursor(): void {
  if (window.matchMedia("(hover: none)").matches) return;
  if (window.innerWidth < 768) return;

  const cursor = document.getElementById("cursor");
  if (!cursor) return;

  let mx = 0, my = 0, cx = 0, cy = 0;

  document.addEventListener("pointermove", (e) => {
    mx = e.clientX;
    my = e.clientY;
  });

  function tick() {
    cx += (mx - cx) * 0.18;
    cy += (my - cy) * 0.18;
    cursor!.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
    requestAnimationFrame(tick);
  }
  tick();

  // hover targets
  const hoverables = document.querySelectorAll<HTMLElement>("a, button, [data-magnetic], [data-cursor='hover']");
  hoverables.forEach((el) => {
    el.addEventListener("pointerenter", () => cursor.classList.add("hover"));
    el.addEventListener("pointerleave", () => cursor.classList.remove("hover"));
  });
}

/**
 * Aurora orbs — parallax simples com window.scrollY (raf throttled).
 */
export function initAurora(): void {
  const orbs = document.querySelectorAll<HTMLElement>("[data-orb]");
  if (!orbs.length) return;

  let ticking = false;

  function update() {
    const sy = window.scrollY;
    orbs.forEach((orb, i) => {
      const speed = parseFloat(orb.dataset.orbSpeed || "0.2");
      const ty = -sy * speed * (i % 2 === 0 ? 1 : -1);
      orb.style.transform = `translate3d(0, ${ty}px, 0)`;
    });
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );

  update();
}

/**
 * Reveal-on-scroll — IntersectionObserver mais previsivel que animation-timeline.
 * Aplica classe .in quando elemento entra em 10% da viewport.
 */
export function initReveal(): void {
  const els = document.querySelectorAll<HTMLElement>(".reveal");
  if (!els.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0, rootMargin: "0px 0px 25% 0px" }
  );

  els.forEach((el) => io.observe(el));

  // Safety #1: se ja estiver visivel ao montar, marcar imediatamente
  requestAnimationFrame(() => {
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 1.25 && r.bottom > 0) {
        el.classList.add("in");
        io.unobserve(el);
      }
    });
  });

  // Safety #2: depois de 2s forca tudo visivel — evita itens "stuck"
  // em casos de IO falhar (e.g. scroll automatizado, page transition)
  setTimeout(() => {
    document.querySelectorAll<HTMLElement>(".reveal:not(.in)").forEach((el) => {
      el.classList.add("in");
    });
  }, 2000);
}

/**
 * Bootstrap chamado pelo Layout no astro:page-load.
 */
export function bootstrap(): void {
  initLenis();
  initCursor();
  initMagnetic();
  initSplitReveal();
  initReveal();
  initAurora();
}
