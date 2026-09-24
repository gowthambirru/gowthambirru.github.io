import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import gsap from "gsap";

// Attempt to register MorphSVGPlugin if available.
if (typeof window !== "undefined") {
  try {
    // @ts-ignore
    import("gsap/MorphSVGPlugin").then((plugin) => {
      if (plugin?.MorphSVGPlugin) {
        gsap.registerPlugin(plugin.MorphSVGPlugin);
      }
    }).catch(() => {
      // Morphing optional
    });
  } catch (e) {
    // Ignore fallback
  }
}

export const GlassDock = React.forwardRef((
  {
    items = [],
    className,
    dockClassName,
    ...props
  },
  ref
) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [direction, setDirection] = useState(0);

  const handleMouseEnter = (index) => {
    if (hoveredIndex !== null && index !== hoveredIndex) {
      setDirection(index > hoveredIndex ? 1 : -1);
    }
    setHoveredIndex(index);
  };

  const getTooltipPosition = (index) => index * 48 + 12;

  return (
    <div
      ref={ref}
      className={cn('w-max select-none', className)}
      {...props}
    >
      <div
        className={cn(
          "glass-dock relative flex gap-3 sm:gap-4 items-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl",
          "border border-white/10 bg-[#09090b]/85",
          "backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] justify-center",
          dockClassName
        )}
        onMouseLeave={() => {
          setHoveredIndex(null);
          setDirection(0);
        }}
      >
        <AnimatePresence>
          {hoveredIndex !== null && items[hoveredIndex] && (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: -54,
                x: getTooltipPosition(hoveredIndex),
              }}
              exit={{ opacity: 0, scale: 0.92, y: 12 }}
              transition={{ type: 'spring', stiffness: 220, damping: 20 }}
              className="absolute top-0 left-0 pointer-events-none z-30"
            >
              <div
                className={cn(
                  'px-3.5 py-1.5 rounded-lg',
                  'bg-black/95 text-white',
                  'shadow-xl flex items-center justify-center',
                  'border border-white/15',
                  'min-w-[80px]'
                )}
              >
                <div className="relative h-4 flex items-center justify-center overflow-hidden w-full">
                  <AnimatePresence mode="popLayout" custom={direction}>
                    <motion.span
                      key={items[hoveredIndex].title}
                      custom={direction}
                      initial={{
                        x: direction > 0 ? 25 : -25,
                        opacity: 0,
                        filter: 'blur(4px)',
                      }}
                      animate={{
                        x: 0,
                        opacity: 1,
                        filter: 'blur(0px)',
                      }}
                      exit={{
                        x: direction > 0 ? -25 : 25,
                        opacity: 0,
                        filter: 'blur(4px)',
                      }}
                      transition={{
                        duration: 0.22,
                        ease: 'easeOut',
                      }}
                      className="text-xs font-geom font-extrabold uppercase tracking-wider text-accent whitespace-nowrap"
                    >
                      {items[hoveredIndex].title}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {items.map((el, index) => {
          const Icon = el.icon;
          const isHovered = hoveredIndex === index;

          const handleClick = (e) => {
            e.stopPropagation();
            if (el.onClick) {
              el.onClick();
            } else if (el.href) {
              window.location.href = el.href;
            }
          };

          return (
            <div
              key={el.title || index}
              onMouseEnter={() => handleMouseEnter(index)}
              onClick={handleClick}
              className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleClick(e);
                }
              }}
              aria-label={el.title}
            >
              <motion.div
                whileTap={{ scale: 0.92 }}
                animate={{
                  scale: isHovered ? 1.15 : 1,
                  y: isHovered ? -3 : 0,
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                className={cn(
                  "flex items-center justify-center w-full h-full rounded-xl transition-colors duration-200",
                  el.primary
                    ? isHovered ? "bg-accent text-black shadow-[0_0_15px_#38BDF8]" : "bg-accent/90 text-black shadow-[0_0_10px_rgba(56,189,248,0.4)]"
                    : isHovered ? "text-white bg-white/10" : "text-slate-400 hover:text-white"
                )}
              >
                {Icon && (
                  <Icon
                    className={cn(
                      'h-4 w-4 sm:h-5 sm:w-5 transition-colors duration-200',
                      el.primary ? 'text-black' : isHovered ? 'text-accent' : 'text-slate-400'
                    )}
                  />
                )}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

GlassDock.displayName = 'GlassDock';
export default GlassDock;
