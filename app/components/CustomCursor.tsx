"use client";
import React, { useEffect, useRef } from "react";

export default function CustomCursor() {
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const cursorOutlineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursorDot = cursorDotRef.current;
        const cursorOutline = cursorOutlineRef.current;
        const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (!isFinePointer || reduceMotion) return;

        const handleMouseMove = (e: MouseEvent) => {
            const posX = e.clientX;
            const posY = e.clientY;

            if (cursorDot) {
                cursorDot.style.left = `${posX}px`;
                cursorDot.style.top = `${posY}px`;
            }

            if (cursorOutline) {
                cursorOutline.animate(
                    {
                        left: `${posX}px`,
                        top: `${posY}px`,
                    },
                    { duration: 600, fill: "forwards", easing: "cubic-bezier(0.175, 0.885, 0.32, 1.275)" }
                );
            }
        };

        const handleMouseEnter = () => document.body.classList.add("hovering");
        const handleMouseLeave = () => document.body.classList.remove("hovering");

        window.addEventListener("mousemove", handleMouseMove);

        let interactiveElements: NodeListOf<Element>;
        const attachHoverEffects = () => {
            interactiveElements = document.querySelectorAll(
                "a, button, .tech-switch, .project-slab, .locale-toggle, input, textarea"
            );
            interactiveElements.forEach((el) => {
                el.addEventListener("mouseenter", handleMouseEnter);
                el.addEventListener("mouseleave", handleMouseLeave);
            });
        };

        // Slight delay to ensure child components are mounted.
        const timeoutId = setTimeout(attachHoverEffects, 500);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            clearTimeout(timeoutId);
            interactiveElements?.forEach((el) => {
                el.removeEventListener("mouseenter", handleMouseEnter);
                el.removeEventListener("mouseleave", handleMouseLeave);
            });
            document.body.classList.remove("hovering");
        };
    }, []);

    return (
        <>
            <div className="cursor-dot" ref={cursorDotRef}></div>
            <div className="cursor-outline" ref={cursorOutlineRef}></div>
        </>
    );
}
