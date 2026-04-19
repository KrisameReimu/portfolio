import React, {useEffect, useRef} from "react";
import "./DragonTrail.scss";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const lerp = (start, end, amount) => start + (end - start) * amount;

function createTailPoints(x, y, count) {
  return Array.from({length: count}, (_, index) => ({
    x: x - index * 22,
    y: y + Math.sin(index * 0.45) * 8
  }));
}

function drawSmoothLine(ctx, points) {
  if (points.length < 2) return;

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  for (let i = 1; i < points.length - 1; i += 1) {
    const current = points[i];
    const next = points[i + 1];
    ctx.quadraticCurveTo(
      current.x,
      current.y,
      (current.x + next.x) / 2,
      (current.y + next.y) / 2
    );
  }

  const last = points[points.length - 1];
  ctx.lineTo(last.x, last.y);
}

function drawWing(ctx, origin, direction, scale, flip = 1) {
  const span = 70 * scale;
  const rise = 34 * scale;
  const curl = 26 * scale;

  ctx.save();
  ctx.translate(origin.x, origin.y);
  ctx.rotate(direction + flip * 0.35);
  ctx.scale(flip, 1);

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(-span * 0.45, -rise, -span, -rise * 0.15);
  ctx.quadraticCurveTo(-span * 0.6, rise * 0.25, -span * 0.18, rise * 0.65);
  ctx.quadraticCurveTo(-span * 0.05, curl * 0.2, 0, 0);
  ctx.closePath();
  ctx.fillStyle = "rgba(25, 20, 18, 0.84)";
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(-10 * scale, -2 * scale);
  ctx.quadraticCurveTo(-span * 0.55, -rise * 0.65, -span * 0.82, -rise * 0.1);
  ctx.quadraticCurveTo(-span * 0.48, rise * 0.1, -span * 0.14, rise * 0.52);
  ctx.closePath();
  ctx.fillStyle = "rgba(149, 95, 59, 0.2)";
  ctx.fill();

  ctx.restore();
}

function drawParticle(ctx, particle) {
  const life = clamp(particle.life, 0, 1);
  const size = particle.size * (0.45 + life * 0.75);
  const alpha = clamp(life * 0.95, 0, 1);

  const gradient = ctx.createRadialGradient(
    particle.x,
    particle.y,
    0,
    particle.x,
    particle.y,
    size
  );
  gradient.addColorStop(0, `rgba(255, 244, 180, ${alpha})`);
  gradient.addColorStop(0.35, `rgba(255, 183, 74, ${alpha * 0.92})`);
  gradient.addColorStop(0.7, `rgba(232, 97, 31, ${alpha * 0.78})`);
  gradient.addColorStop(1, "rgba(232, 97, 31, 0)");

  ctx.beginPath();
  ctx.fillStyle = gradient;
  ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
  ctx.fill();
}

export default function DragonTrail({onBoundsChange, mode = "viewport"}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || typeof window === "undefined") {
      return undefined;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return undefined;
    }

    const embedded = mode === "embedded";
    const reduceMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const coarsePointerQuery = window.matchMedia("(pointer: coarse)");
    const state = {
      width: 0,
      height: 0,
      dpr: 1,
      head: {x: 0, y: 0},
      target: {x: 0, y: 0},
      velocity: {x: 0, y: 0},
      tail: createTailPoints(0, 0, 18),
      particles: [],
      frame: 0,
      offset: {left: 0, top: 0},
      active: !(reduceMotionQuery.matches || coarsePointerQuery.matches)
    };

    if (!state.active) {
      if (container) {
        container.style.display = "none";
      }
      return undefined;
    }

    const resize = () => {
      const rect =
        embedded && container ? container.getBoundingClientRect() : null;
      const width = embedded && rect ? rect.width : window.innerWidth;
      const height = embedded && rect ? rect.height : window.innerHeight;
      const dpr = clamp(window.devicePixelRatio || 1, 1, 2);

      state.width = width;
      state.height = height;
      state.dpr = dpr;
      state.offset =
        embedded && rect ? {left: rect.left, top: rect.top} : {left: 0, top: 0};
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const startX = width * 0.76;
      const startY = height * 0.23;
      state.head = {x: startX, y: startY};
      state.target = {x: startX, y: startY};
      state.tail = createTailPoints(startX, startY, 18);
      if (typeof onBoundsChange === "function") {
        onBoundsChange({
          x: startX - 160,
          y: startY - 130,
          width: 320,
          height: 260
        });
      }
    };

    const emitFlame = intensity => {
      const neck = state.tail[1] || state.head;
      const angle = Math.atan2(state.head.y - neck.y, state.head.x - neck.x);
      const mouthX = state.head.x + Math.cos(angle) * 24;
      const mouthY = state.head.y + Math.sin(angle) * 24;
      const count = Math.round(5 + intensity * 7);

      for (let i = 0; i < count; i += 1) {
        const spread = (Math.random() - 0.5) * (0.9 + intensity * 0.45);
        const speed = 2.4 + Math.random() * 3.6 + intensity * 0.85;
        state.particles.push({
          x: mouthX,
          y: mouthY,
          vx: Math.cos(angle + spread) * speed + (Math.random() - 0.5) * 1.2,
          vy: Math.sin(angle + spread) * speed + (Math.random() - 0.5) * 1.2,
          life: 1,
          size: 8 + Math.random() * 12 + intensity * 2
        });
      }
    };

    const onPointerMove = event => {
      const x = event.clientX - state.offset.left;
      const y = event.clientY - state.offset.top;

      if (x < -80 || y < -80 || x > state.width + 80 || y > state.height + 80) {
        return;
      }

      const dx = x - state.target.x;
      const dy = y - state.target.y;
      const speed = Math.hypot(dx, dy);

      state.target.x = x;
      state.target.y = y;
      state.velocity.x = dx;
      state.velocity.y = dy;

      if (speed > 20) {
        emitFlame(clamp(speed / 120, 0.15, 1));
      }
    };

    const onPointerLeave = () => {
      state.target.x = state.width * 0.76;
      state.target.y = state.height * 0.23;
    };

    const draw = () => {
      state.frame += 1;

      ctx.clearRect(0, 0, state.width, state.height);

      state.head.x = lerp(state.head.x, state.target.x, 0.08);
      state.head.y = lerp(state.head.y, state.target.y, 0.08);

      state.tail[0].x = state.head.x;
      state.tail[0].y = state.head.y;

      for (let i = 1; i < state.tail.length; i += 1) {
        const anchor = state.tail[i - 1];
        const point = state.tail[i];
        const drag = clamp(0.22 - i * 0.006, 0.05, 0.18);
        point.x = lerp(point.x, anchor.x, drag);
        point.y = lerp(point.y, anchor.y, drag);
      }

      const neck = state.tail[1] || state.head;
      const angle = Math.atan2(state.head.y - neck.y, state.head.x - neck.x);
      const midpoint =
        state.tail[Math.floor(state.tail.length * 0.45)] || state.head;
      const wingPulse = 0.5 + Math.sin(state.frame * 0.05) * 0.15;
      const bodyPoints = [...state.tail].reverse();

      const backdrop = ctx.createRadialGradient(
        state.head.x - 18,
        state.head.y - 16,
        0,
        state.head.x,
        state.head.y,
        180
      );
      backdrop.addColorStop(0, "rgba(149, 95, 59, 0.18)");
      backdrop.addColorStop(0.45, "rgba(149, 95, 59, 0.06)");
      backdrop.addColorStop(1, "rgba(149, 95, 59, 0)");
      ctx.fillStyle = backdrop;
      ctx.beginPath();
      ctx.arc(state.head.x, state.head.y, 180, 0, Math.PI * 2);
      ctx.fill();

      drawWing(ctx, midpoint, angle - Math.PI / 5, wingPulse, 1);
      drawWing(ctx, midpoint, angle + Math.PI / 5, wingPulse * 0.9, -1);

      ctx.save();
      drawSmoothLine(ctx, bodyPoints);
      ctx.strokeStyle = "rgba(24, 20, 18, 0.9)";
      ctx.lineWidth = 32;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
      ctx.strokeStyle = "rgba(149, 95, 59, 0.55)";
      ctx.lineWidth = 18;
      ctx.stroke();
      ctx.strokeStyle = "rgba(255, 244, 232, 0.25)";
      ctx.lineWidth = 5;
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.translate(state.head.x, state.head.y);
      ctx.rotate(angle);

      ctx.fillStyle = "rgba(24, 20, 18, 0.96)";
      ctx.beginPath();
      ctx.ellipse(0, 0, 28, 19, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(8, -10);
      ctx.quadraticCurveTo(32, -28, 42, -8);
      ctx.quadraticCurveTo(28, -12, 18, -2);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(6, 10);
      ctx.quadraticCurveTo(30, 28, 44, 10);
      ctx.quadraticCurveTo(28, 18, 20, 6);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(0, -14);
      ctx.lineTo(-10, -32);
      ctx.lineTo(2, -24);
      ctx.lineTo(12, -34);
      ctx.closePath();
      ctx.fillStyle = "rgba(214, 194, 167, 0.95)";
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(0, 14);
      ctx.lineTo(-8, 30);
      ctx.lineTo(4, 24);
      ctx.lineTo(12, 34);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.arc(10, -4, 3.2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 233, 170, 0.95)";
      ctx.fill();

      const fireAngle = clamp(state.velocity.x, -60, 60) / 300;
      const fireLength = clamp(
        Math.hypot(state.velocity.x, state.velocity.y) / 80,
        0.25,
        1
      );
      const fireGradient = ctx.createLinearGradient(16, 0, 110, 0);
      fireGradient.addColorStop(0, "rgba(255, 248, 202, 0.95)");
      fireGradient.addColorStop(0.32, "rgba(255, 195, 85, 0.9)");
      fireGradient.addColorStop(0.68, "rgba(240, 111, 35, 0.62)");
      fireGradient.addColorStop(1, "rgba(240, 111, 35, 0)");

      ctx.save();
      ctx.rotate(fireAngle * 0.25);
      ctx.fillStyle = fireGradient;
      ctx.beginPath();
      ctx.moveTo(16, -4);
      ctx.quadraticCurveTo(
        44 + fireLength * 46,
        -18 - fireLength * 14,
        92 + fireLength * 34,
        0
      );
      ctx.quadraticCurveTo(44 + fireLength * 46, 20 + fireLength * 14, 16, 4);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      ctx.restore();

      if (typeof onBoundsChange === "function") {
        const xs = state.tail.map(point => point.x);
        const ys = state.tail.map(point => point.y);
        const minX = Math.min(...xs, state.head.x) - 70;
        const maxX = Math.max(...xs, state.head.x) + 120;
        const minY = Math.min(...ys, state.head.y) - 90;
        const maxY = Math.max(...ys, state.head.y) + 90;
        onBoundsChange({
          x: minX,
          y: minY,
          width: maxX - minX,
          height: maxY - minY
        });
      }

      if (
        state.frame % 2 === 0 &&
        Math.hypot(state.velocity.x, state.velocity.y) > 4
      ) {
        emitFlame(
          clamp(Math.hypot(state.velocity.x, state.velocity.y) / 180, 0.1, 0.45)
        );
      }

      const nextParticles = [];
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (const particle of state.particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.965;
        particle.vy *= 0.965;
        particle.vy += 0.03;
        particle.life -= 0.025;

        if (particle.life > 0) {
          drawParticle(ctx, particle);
          nextParticles.push(particle);
        }
      }
      ctx.restore();
      state.particles = nextParticles;

      state.velocity.x *= 0.72;
      state.velocity.y *= 0.72;

      state.raf = window.requestAnimationFrame(draw);
    };

    resize();
    state.raf = window.requestAnimationFrame(draw);
    if (embedded && container) {
      if (typeof ResizeObserver !== "undefined") {
        const observer = new ResizeObserver(resize);
        observer.observe(container);
        state.containerObserver = observer;
      } else {
        window.addEventListener("resize", resize);
      }
    } else {
      window.addEventListener("resize", resize);
    }
    window.addEventListener("pointermove", onPointerMove, {passive: true});
    window.addEventListener("mouseout", onPointerLeave);
    window.addEventListener("blur", onPointerLeave);

    const onReducedMotionChange = () => {
      if (reduceMotionQuery.matches || coarsePointerQuery.matches) {
        if (container) {
          container.style.display = "none";
        }
        window.cancelAnimationFrame(state.raf);
      } else {
        if (container) {
          container.style.display = "block";
        }
      }
    };

    if (typeof reduceMotionQuery.addEventListener === "function") {
      reduceMotionQuery.addEventListener("change", onReducedMotionChange);
      coarsePointerQuery.addEventListener("change", onReducedMotionChange);
    }

    return () => {
      window.cancelAnimationFrame(state.raf);
      if (state.containerObserver) {
        state.containerObserver.disconnect();
      } else {
        window.removeEventListener("resize", resize);
      }
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mouseout", onPointerLeave);
      window.removeEventListener("blur", onPointerLeave);

      if (typeof reduceMotionQuery.removeEventListener === "function") {
        reduceMotionQuery.removeEventListener("change", onReducedMotionChange);
        coarsePointerQuery.removeEventListener("change", onReducedMotionChange);
      }
    };
  }, [onBoundsChange, mode]);

  return (
    <div
      ref={containerRef}
      className={`dragon-trail dragon-trail--${mode}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
