import React, { useEffect, useRef } from "react";

function InteractiveText({ segments, ariaLabel, className = "" }) {
  const containerRef = useRef(null);
  const letterRefs = useRef([]);
  const frameRef = useRef(null);
  const resetTimerRef = useRef(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resetLetters = () => {
      letterRefs.current.forEach((letter) => {
        if (letter) letter.style.transform = "";
      });
    };

    const scheduleReset = () => {
      window.clearTimeout(resetTimerRef.current);
      resetTimerRef.current = window.setTimeout(resetLetters, 1100);
    };

    const handlePointerMove = (event) => {
      if (reducedMotionRef.current || event.pointerType === "touch") return;
      const container = containerRef.current;
      if (!container) return;

      const bounds = container.getBoundingClientRect();
      const pointerX = event.clientX - bounds.left;
      const pointerY = event.clientY - bounds.top;
      const letters = letterRefs.current;

      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = window.requestAnimationFrame(() => {
        letters.forEach((letter, index) => {
          if (!letter) return;
          const letterBounds = letter.getBoundingClientRect();
          const centerX = letterBounds.left - bounds.left + letterBounds.width / 2;
          const centerY = letterBounds.top - bounds.top + letterBounds.height / 2;
          const distance = Math.hypot(pointerX - centerX, pointerY - centerY);
          const influence = Math.max(0, 1 - distance / 110);

          if (!influence) {
            letter.style.transform = "";
            return;
          }

          const directionX = centerX - pointerX;
          const directionY = centerY - pointerY;
          const magnitude = influence * influence;
          const variation = ((index % 5) - 2) * 0.8;
          const translateX = (directionX / Math.max(distance, 1)) * magnitude * 13 + variation;
          const translateY = (directionY / Math.max(distance, 1)) * magnitude * 11;
          const rotate = ((index % 2 ? -1 : 1) * magnitude * 8) + variation;
          const scale = 1 + magnitude * 0.045;

          letter.style.transform = `translate3d(${translateX.toFixed(2)}px, ${translateY.toFixed(2)}px, 0) rotate(${rotate.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        });
      });
      scheduleReset();
    };

    const handlePointerLeave = () => {
      window.cancelAnimationFrame(frameRef.current);
      window.clearTimeout(resetTimerRef.current);
      resetLetters();
    };

    const handleTouchStart = () => {
      if (reducedMotionRef.current) return;
      letterRefs.current.forEach((letter, index) => {
        if (!letter) return;
        const direction = index % 2 ? 1 : -1;
        letter.style.transform = `translate3d(${direction * ((index % 4) + 1) * 3}px, -${(index % 3) + 1}px, 0) rotate(${direction * 3}deg)`;
      });
      scheduleReset();
    };

    const container = containerRef.current;
    container?.addEventListener("pointermove", handlePointerMove);
    container?.addEventListener("pointerleave", handlePointerLeave);
    container?.addEventListener("touchstart", handleTouchStart, { passive: true });

    return () => {
      container?.removeEventListener("pointermove", handlePointerMove);
      container?.removeEventListener("pointerleave", handlePointerLeave);
      container?.removeEventListener("touchstart", handleTouchStart);
      window.cancelAnimationFrame(frameRef.current);
      window.clearTimeout(resetTimerRef.current);
    };
  }, []);

  let letterIndex = 0;
  return (
    <span
      className={`interactive-text ${className}`}
      ref={containerRef}
      aria-label={ariaLabel}
      role="text"
    >
      <span aria-hidden="true">
        {segments.map((segment, segmentIndex) => (
          <span className={segment.className || ""} key={`${segment.text}-${segmentIndex}`}>
            {[...segment.text].map((character) => {
              if (character === "\n") return <br key={`break-${letterIndex++}`} />;
              const currentIndex = letterIndex++;
              return (
                <span
                  className="interactive-letter"
                  key={`${character}-${currentIndex}`}
                  ref={(element) => {
                    letterRefs.current[currentIndex] = element;
                  }}
                >
                  {character === " " ? "\u00a0" : character}
                </span>
              );
            })}
          </span>
        ))}
      </span>
    </span>
  );
}

export default InteractiveText;
