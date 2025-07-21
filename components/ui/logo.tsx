import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  showText?: boolean
  variant?: "default" | "white" | "dark"
}

interface LogoIconProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeMap = {
  sm: { width: 32, height: 32, textSize: "text-lg" },
  md: { width: 48, height: 48, textSize: "text-xl" },
  lg: { width: 64, height: 64, textSize: "text-2xl" },
  xl: { width: 96, height: 96, textSize: "text-4xl" },
}

export function Logo({ size = "md", className, showText = false, variant = "white" }: LogoProps) {
  const { width, height, textSize } = sizeMap[size]

  const textColor = {
    default: "text-blue-600",
    white: "text-white",
    dark: "text-slate-900",
  }[variant]

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative">
        <Image
          src="/logo.png"
          alt="YYC³ 言语云"
          width={width}
          height={height}
          className="object-contain drop-shadow-lg"
          priority
        />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={cn("font-bold leading-tight", textSize, textColor)}>YYC³</span>
          <span className={cn("text-xs opacity-80 leading-tight", textColor)}>言语云</span>
        </div>
      )}
    </div>
  )
}

export function LogoIcon({ size = "md", className }: LogoIconProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  return (
    <div className={cn("flex items-center justify-center", sizeClasses[size], className)}>
      <span className="text-white font-bold text-sm">YYC³</span>
    </div>
  )
}
