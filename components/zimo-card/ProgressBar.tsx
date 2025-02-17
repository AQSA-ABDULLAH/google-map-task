import React from "react";

// Define the type for the props
interface SquareProgressBarProps {
  percentage: number;
}

const SquareProgressBar: React.FC<SquareProgressBarProps> = ({ percentage }) => {
  const size = 32; // Size of the square
  const stroke = 3; // Stroke width
  const innerSize = size - stroke; // Inner size considering the stroke
  const progress = (percentage / 100) * 11 * innerSize; // Total length of the progress bar based on the percentage

  return (
    <div className="flex justify-center items-center relative">
      <svg
        height={size}
        width={size}
        className="relative"
      >
        {/* Background rectangle */}
        <rect
          x={stroke / 2}
          y={stroke / 2}
          width={innerSize}
          height={innerSize}
          fill="none"
          stroke="#e5e7eb" // Gray background
          strokeWidth={stroke}
          rx="6" // Rounded corners
          ry="6"
        />

        {/* Foreground progress rectangle */}
        <rect
          x={stroke / 2}
          y={stroke / 2}
          width={innerSize}
          height={innerSize}
          fill="none"
          stroke="#BE9F56" // Green progress
          strokeWidth={stroke}
          strokeDasharray={`${progress} ${4 * innerSize}`} // Total perimeter
          strokeDashoffset={4 * innerSize - progress} // Offset for progress
          rx="6" // Rounded corners
          ry="6"
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
      </svg>

      {/* Centered Percentage Text */}
      <div className="absolute flex justify-center items-center">
        <span className="text-[9px] font-semibold">{percentage}%</span>
      </div>
    </div>
  );
};

export default SquareProgressBar;
