"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface MagneticElementProps {
    children: React.ReactNode;
    className?: string;
    as?: React.ElementType;
}

export default function MagneticElement({ children, className = "", as: Component = "div" }: MagneticElementProps) {
    const elementRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const strength = 12;

            gsap.to(element, {
                x: x / strength,
                y: y / strength,
                duration: 0.4,
                ease: "power2.out",
            });
        };

        const handleMouseLeave = () => {
            gsap.to(element, {
                x: 0,
                y: 0,
                duration: 1.2,
                ease: "elastic.out(1, 0.3)",
            });
        };

        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            element.removeEventListener("mousemove", handleMouseMove);
            element.removeEventListener("mouseleave", handleMouseLeave);
            gsap.killTweensOf(element);
        };
    }, []);

    return (
        <Component ref={elementRef} className={`magnetic-target ${className}`}>
            {children}
        </Component>
    );
}
