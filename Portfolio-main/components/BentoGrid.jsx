import { cn } from "@/lib/utils";
import { GlowingEffect } from "./GlowingEffect";

export const BentoGrid = ({ className, children }) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[18rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}) => {
  return (
    <div
      className={cn(
        "group/bento shadow-input relative row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-gray-700 bg-black p-4 transition duration-200 hover:shadow-none",
        className,
      )}
    >
      <GlowingEffect
        blur={0}
        borderWidth={3}
        spread={80}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
      />
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        <div className="flex items-center gap-2">
          {icon}
          <div className="font-head text-xl font-semibold text-white md:text-2xl lg:text-3xl">
            {title}
          </div>
        </div>
        <div className="mt-2 text-sm font-normal text-gray-300 md:text-base">
          {description}
        </div>
      </div>
    </div>
  );
};
