"use client";

import React, { useEffect, useRef } from "react";

interface MagneticElementProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    className?: string;
    as?: React.ElementType;
    [key: string]: unknown;
}

export default function MagneticElement({
    children,
    className = "",
    as: Component = "div",
    ...props
}: MagneticElementProps) {
    const elementRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element || window.matchMedia("(hover: none)").matches) return;

        let frameId = 0;
        const strength = 12;

        const handlePointerMove = (event: PointerEvent) => {
            const rect = element.getBoundingClientRect();
            const offsetX = (event.clientX - rect.left - rect.width / 2) / strength;
            const offsetY = (event.clientY - rect.top - rect.height / 2) / strength;

            cancelAnimationFrame(frameId);
            frameId = window.requestAnimationFrame(() => {
                element.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
            });
        };

        const handlePointerLeave = () => {
            cancelAnimationFrame(frameId);
            element.style.transform = "translate3d(0, 0, 0)";
        };

        element.addEventListener("pointermove", handlePointerMove);
        element.addEventListener("pointerleave", handlePointerLeave);

        return () => {
            cancelAnimationFrame(frameId);
            element.removeEventListener("pointermove", handlePointerMove);
            element.removeEventListener("pointerleave", handlePointerLeave);
        };
    }, []);

    return (
        <Component ref={elementRef} className={`magnetic-target ${className}`} {...props}>
            {children}
        </Component>
    );
}
