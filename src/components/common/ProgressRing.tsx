import React from 'react';

interface ProgressRingProps {
  progress: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  color?: string;
  showText?: boolean;
}

export default function ProgressRing({
  progress,
  size = 64,
  strokeWidth = 6,
  color = 'stroke-indigo-600',
  showText = true,
}: ProgressRingProps) {
  // Clamp progress between 0 and 100
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (clampedProgress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-95" width={size} height={size}>
        {/* Background Circle */}
        <circle
          className="stroke-slate-100"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Foreground Circle */}
        <circle
          className={`transition-all duration-500 ease-out ${color}`}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      {showText && (
        <span className="absolute text-xs font-extrabold text-slate-800 tracking-tighter">
          {clampedProgress}%
        </span>
      )}
    </div>
  );
}
