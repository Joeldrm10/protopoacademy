import { useEffect, useRef, useState, type ReactNode } from "react";

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  disabled?: boolean;
  threshold?: number;
}

const AnimateOnScroll = ({ children, className = "", delay = 0, disabled = false, threshold = 0.15 }: AnimateOnScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(typeof window !== "undefined" && window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (disabled) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [disabled, threshold]);

  const offset = isMobile ? 16 : 30;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: disabled || isVisible ? 1 : 0,
        transform: disabled || isVisible ? "translateY(0)" : `translateY(${offset}px)`,
        transition: disabled ? "none" : `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default AnimateOnScroll;
