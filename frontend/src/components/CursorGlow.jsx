import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const el = ref.current;
    let raf;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;

    function onMove(e) {
      tx = e.clientX;
      ty = e.clientY;
    }

    function loop() {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      if (el) el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    }

    function onEnter(e) {
      if (e.target.closest?.("a, button, [role=button], input, textarea, select")) {
        el.style.width = "44px";
        el.style.height = "44px";
        el.style.borderColor = "rgba(201,138,43,0.7)";
        el.style.backgroundColor = "rgba(201,138,43,0.08)";
      }
    }
    function onLeave(e) {
      if (e.target.closest?.("a, button, [role=button], input, textarea, select")) {
        el.style.width = "26px";
        el.style.height = "26px";
        el.style.borderColor = "rgba(191,78,58,0.5)";
        el.style.backgroundColor = "transparent";
      }
    }

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="cursor-glow hidden md:block" style={{ left: 0, top: 0 }} aria-hidden="true" />;
}
