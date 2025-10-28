import parritLogo from "@/assets/parrit-logo.png";
import { cn } from "@/lib/utils";

interface ParritAvatarProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const ParritAvatar = ({ size = "md", className }: ParritAvatarProps) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div
      className={cn(
        "flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center p-1.5 backdrop-blur-sm border border-primary/20",
        sizeClasses[size],
        className
      )}
    >
      <img
        src={parritLogo}
        alt="Parrit AI"
        className="w-full h-full object-contain opacity-90"
        style={{ filter: "brightness(0) saturate(100%) invert(45%) sepia(85%) saturate(2500%) hue-rotate(200deg)" }}
      />
    </div>
  );
};
