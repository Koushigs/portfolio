import React, { useEffect, useRef } from "react";
import {
  Code2,
  Database,
  GitBranch,
  Globe2,
  Layers3,
  Server,
  Sparkles,
} from "lucide-react";

const MAX_DPR = 2;
const TAU = Math.PI * 2;
const COLORS = {
  cyan: "117, 236, 255",
  blue: "86, 159, 255",
  violet: "170, 139, 255",
};

const globeDots = Array.from({ length: 48 }, (_, index) => ({
  latitude: -1.12 + ((index * 0.71) % 2.2),
  longitude: (index * 2.399) % TAU,
  size: 0.65 + (index % 4) * 0.3,
  speed: 0.00007 + (index % 5) * 0.000017,
  color: index % 8 === 0 ? "violet" : index % 3 === 0 ? "blue" : "cyan",
}));

const orbitalParticles = Array.from({ length: 18 }, (_, index) => ({
  angle: (index / 18) * TAU,
  speed: 0.00014 + (index % 4) * 0.000028,
  orbit: index % 3,
}));

const continents = [
  [[0.84, -2.6], [0.74, -2.34], [0.5, -2.17], [0.35, -1.8], [0.08, -1.7], [-0.12, -1.95], [-0.02, -2.38], [0.2, -2.7], [0.54, -2.78]],
  [[0.78, -1.35], [0.6, -1.13], [0.38, -1.22], [0.18, -1.02], [-0.02, -0.96], [-0.22, -1.19], [-0.34, -1.42], [-0.08, -1.56], [0.25, -1.5], [0.52, -1.65]],
  [[0.28, -0.54], [0.05, -0.38], [-0.16, -0.28], [-0.26, -0.03], [-0.1, 0.16], [0.18, 0.12], [0.42, -0.1]],
  [[0.62, 0.25], [0.52, 0.62], [0.3, 0.78], [0.08, 0.88], [-0.12, 0.68], [-0.3, 0.74], [-0.48, 0.58], [-0.38, 0.32], [-0.12, 0.25], [0.12, 0.39], [0.38, 0.2]],
  [[0.48, 1.35], [0.31, 1.54], [0.1, 1.7], [-0.04, 1.92], [0.1, 2.1], [0.35, 2.04], [0.6, 1.82], [0.72, 1.54]],
  [[-0.48, 1.1], [-0.64, 1.28], [-0.77, 1.58], [-0.7, 1.88], [-0.5, 1.75], [-0.36, 1.42]],
];

const technologies = [
  ["python", "Python", Code2, "cyan"],
  ["javascript", "JavaScript", Code2, "violet"],
  ["git", "Git & GitHub", GitBranch, "blue"],
  ["django", "Django", Server, "cyan"],
  ["react", "React", Layers3, "blue"],
  ["mysql", "MySQL", Database, "blue"],
  ["postgresql", "PostgreSQL", Database, "violet"],
  ["html", "HTML5", Globe2, "cyan"],
  ["css", "CSS3", Sparkles, "violet"],
  ["api", "REST APIs", Server, "cyan"],
];

const project = (latitude, longitude, rotation, radius, centerX, centerY) => {
  const latitudeCos = Math.cos(latitude);
  const longitudeOffset = longitude + rotation;
  const x = latitudeCos * Math.cos(longitudeOffset);
  const z = latitudeCos * Math.sin(longitudeOffset);
  return { x: centerX + x * radius, y: centerY - Math.sin(latitude) * radius, z };
};

function NeuralNetworkHero() {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return undefined;

    const context = canvas.getContext("2d");
    if (!context) return undefined;

    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const size = { width: 0, height: 0, dpr: 1 };
    let animationFrame;
    let visible = true;
    let reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const bounds = wrapper.getBoundingClientRect();
      size.width = bounds.width;
      size.height = bounds.height;
      size.dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = Math.floor(size.width * size.dpr);
      canvas.height = Math.floor(size.height * size.dpr);
      canvas.style.width = `${size.width}px`;
      canvas.style.height = `${size.height}px`;
      context.setTransform(size.dpr, 0, 0, size.dpr, 0, 0);
    };

    const strokePath = (points, color, alpha, lineWidth = 0.7, glow = 0) => {
      if (points.length < 2) return;
      context.beginPath();
      points.forEach((point, index) => {
        if (index === 0) context.moveTo(point.x, point.y);
        else context.lineTo(point.x, point.y);
      });
      context.strokeStyle = `rgba(${color}, ${alpha})`;
      context.lineWidth = lineWidth;
      context.shadowBlur = glow;
      context.shadowColor = `rgb(${color})`;
      context.stroke();
      context.shadowBlur = 0;
    };

    const draw = (time) => {
      animationFrame = undefined;
      if (!visible) return;

      pointer.x += (pointer.targetX - pointer.x) * 0.045;
      pointer.y += (pointer.targetY - pointer.y) * 0.045;
      const centerX = size.width * 0.5 + pointer.x * size.width * 0.025;
      const centerY = size.height * 0.43 + pointer.y * size.height * 0.018;
      const radius = Math.min(size.width, size.height) * (size.width > 600 ? 0.31 : 0.27);
      const rotation = reducedMotion ? 0.7 : time * 0.00014 + 0.7;

      context.clearRect(0, 0, size.width, size.height);
      context.globalCompositeOperation = "lighter";

      const atmosphere = context.createRadialGradient(centerX, centerY, radius * 0.1, centerX, centerY, radius * 1.5);
      atmosphere.addColorStop(0, "rgba(117, 236, 255, .16)");
      atmosphere.addColorStop(0.4, "rgba(46, 130, 232, .08)");
      atmosphere.addColorStop(0.72, "rgba(170, 139, 255, .035)");
      atmosphere.addColorStop(1, "rgba(5, 7, 13, 0)");
      context.fillStyle = atmosphere;
      context.fillRect(centerX - radius * 1.6, centerY - radius * 1.6, radius * 3.2, radius * 3.2);

      const surface = context.createRadialGradient(centerX - radius * 0.4, centerY - radius * 0.48, radius * 0.05, centerX, centerY, radius);
      surface.addColorStop(0, "rgba(62, 182, 240, .15)");
      surface.addColorStop(0.65, "rgba(18, 74, 145, .1)");
      surface.addColorStop(1, "rgba(84, 57, 175, .04)");
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, TAU);
      context.fillStyle = surface;
      context.fill();

      for (let latIndex = -4; latIndex <= 4; latIndex += 1) {
        const latitude = (latIndex / 5) * (Math.PI / 2);
        const points = [];
        for (let step = 0; step <= 72; step += 1) {
          points.push(project(latitude, (step / 72) * TAU, rotation, radius, centerX, centerY));
        }
        strokePath(points, latIndex % 3 === 0 ? COLORS.violet : COLORS.cyan, 0.16 + (1 - Math.abs(latIndex) / 5) * 0.08);
      }

      for (let longIndex = 0; longIndex < 12; longIndex += 1) {
        const points = [];
        for (let step = 0; step <= 44; step += 1) {
          points.push(project(-Math.PI / 2 + (step / 44) * Math.PI, (longIndex / 12) * TAU, rotation, radius, centerX, centerY));
        }
        strokePath(points, longIndex % 4 === 0 ? COLORS.blue : COLORS.cyan, 0.12);
      }

      continents.forEach((continent, index) => {
        const points = continent.map(([latitude, longitude]) => project(latitude, longitude, rotation, radius * 1.006, centerX, centerY));
        const visiblePoints = points.filter((point) => point.z > -0.2);
        if (visiblePoints.length < 3) return;
        context.beginPath();
        visiblePoints.forEach((point, pointIndex) => {
          if (pointIndex === 0) context.moveTo(point.x, point.y);
          else context.lineTo(point.x, point.y);
        });
        context.closePath();
        context.fillStyle = `rgba(${index % 2 ? COLORS.blue : COLORS.cyan}, .1)`;
        context.strokeStyle = `rgba(${index % 2 ? COLORS.blue : COLORS.cyan}, .42)`;
        context.lineWidth = 0.8;
        context.shadowBlur = 8;
        context.shadowColor = `rgb(${COLORS.cyan})`;
        context.fill();
        context.stroke();
        context.shadowBlur = 0;
      });

      globeDots.forEach((dot) => {
        const point = project(dot.latitude, dot.longitude + (reducedMotion ? 0 : time * dot.speed), rotation, radius * 1.012, centerX, centerY);
        if (point.z < -0.22) return;
        const depth = 0.35 + point.z * 0.65;
        const color = COLORS[dot.color];
        context.beginPath();
        context.arc(point.x, point.y, dot.size * 3.2, 0, TAU);
        context.fillStyle = `rgba(${color}, ${0.015 + depth * 0.04})`;
        context.fill();
        context.beginPath();
        context.arc(point.x, point.y, dot.size * (0.6 + depth * 0.55), 0, TAU);
        context.fillStyle = `rgba(${color}, ${0.35 + depth * 0.52})`;
        context.shadowBlur = 7 + depth * 8;
        context.shadowColor = `rgb(${color})`;
        context.fill();
        context.shadowBlur = 0;
      });

      context.beginPath();
      context.arc(centerX, centerY, radius, 0, TAU);
      context.strokeStyle = "rgba(117, 236, 255, .45)";
      context.lineWidth = 1.1;
      context.shadowBlur = 18;
      context.shadowColor = "rgba(117, 236, 255, .7)";
      context.stroke();
      context.shadowBlur = 0;

      const rings = [
        { x: radius * 1.18, y: radius * 0.28, angle: -0.35, color: COLORS.cyan, speed: 0.00011 },
        { x: radius * 1.05, y: radius * 0.22, angle: 0.82, color: COLORS.violet, speed: -0.00014 },
        { x: radius * 0.92, y: radius * 0.17, angle: -1.14, color: COLORS.blue, speed: 0.00009 },
      ];
      rings.forEach((ring, index) => {
        context.save();
        context.translate(centerX, centerY);
        context.rotate(ring.angle + (reducedMotion ? 0 : time * ring.speed));
        context.beginPath();
        context.ellipse(0, 0, ring.x, ring.y, 0, 0, TAU);
        context.strokeStyle = `rgba(${ring.color}, ${index === 1 ? ".3" : ".22"})`;
        context.lineWidth = index === 1 ? 1 : 0.75;
        context.shadowBlur = 9;
        context.shadowColor = `rgb(${ring.color})`;
        context.stroke();
        const satelliteAngle = reducedMotion ? index * 1.8 : time * ring.speed * 1.8 + index * 1.8;
        const satelliteX = Math.cos(satelliteAngle) * ring.x;
        const satelliteY = Math.sin(satelliteAngle) * ring.y;
        context.beginPath();
        context.arc(satelliteX, satelliteY, 2 + index * 0.35, 0, TAU);
        context.fillStyle = `rgba(${ring.color}, .9)`;
        context.fill();
        context.restore();
      });

      orbitalParticles.forEach((particle) => {
        const angle = particle.angle + (reducedMotion ? 0 : time * particle.speed);
        const orbitalRadius = radius * (1.13 + particle.orbit * 0.12);
        const x = centerX + Math.cos(angle) * orbitalRadius;
        const y = centerY + Math.sin(angle) * orbitalRadius * (0.22 + particle.orbit * 0.07);
        const color = particle.orbit === 1 ? COLORS.violet : particle.orbit === 2 ? COLORS.blue : COLORS.cyan;
        context.beginPath();
        context.arc(x, y, 1 + particle.orbit * 0.25, 0, TAU);
        context.fillStyle = `rgba(${color}, .65)`;
        context.shadowBlur = 8;
        context.shadowColor = `rgb(${color})`;
        context.fill();
        context.shadowBlur = 0;
      });

      const platformY = centerY + radius * 1.25;
      context.save();
      context.translate(centerX, platformY);
      context.scale(1, 0.22);
      context.beginPath();
      context.arc(0, 0, radius * 0.82, 0, TAU);
      context.fillStyle = "rgba(35, 125, 210, .08)";
      context.shadowBlur = 25;
      context.shadowColor = "rgba(117, 236, 255, .85)";
      context.fill();
      context.strokeStyle = "rgba(117, 236, 255, .42)";
      context.lineWidth = 1;
      context.stroke();
      context.beginPath();
      context.arc(0, 0, radius * 0.56, 0, TAU);
      context.strokeStyle = "rgba(170, 139, 255, .35)";
      context.stroke();
      context.restore();
      context.fillStyle = "rgba(117, 236, 255, .1)";
      context.fillRect(centerX - radius * 0.35, centerY + radius * 0.66, radius * 0.7, radius * 0.62);

      context.globalCompositeOperation = "source-over";
      if (!reducedMotion) animationFrame = requestAnimationFrame(draw);
    };

    const handlePointerMove = (event) => {
      const bounds = wrapper.getBoundingClientRect();
      pointer.targetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      pointer.targetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    };

    const resetPointer = () => {
      pointer.targetX = 0;
      pointer.targetY = 0;
    };

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reducedMotion && !animationFrame) animationFrame = requestAnimationFrame(draw);
      else if (!visible && animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = undefined;
      }
    });
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = (event) => {
      reducedMotion = event.matches;
      if (reducedMotion) cancelAnimationFrame(animationFrame);
      else if (visible) animationFrame = requestAnimationFrame(draw);
    };

    resize();
    draw(0);
    visibilityObserver.observe(wrapper);
    motionQuery.addEventListener("change", handleMotionChange);
    wrapper.addEventListener("pointermove", handlePointerMove);
    wrapper.addEventListener("pointerleave", resetPointer);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrame);
      visibilityObserver.disconnect();
      motionQuery.removeEventListener("change", handleMotionChange);
      wrapper.removeEventListener("pointermove", handlePointerMove);
      wrapper.removeEventListener("pointerleave", resetPointer);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="neural-network" ref={wrapperRef} role="img" aria-label="Animated holographic Earth with developer technology cards">
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="hero-tech-cards">
        {technologies.map(([id, label, Icon, tone]) => (
          <span className={`tech-label tech-card tech-card-${id} tech-${tone}`} key={id}>
            <Icon size={13} aria-hidden="true" /> {label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default NeuralNetworkHero;
