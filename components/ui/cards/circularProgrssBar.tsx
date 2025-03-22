"use client";

import React from "react";

interface CircularProgressProps {
  nb_tasks:number
  completed_tasks:number
}

const CircularProgressCard: React.FC<CircularProgressProps> = ({nb_tasks,completed_tasks }) => {
  const radius = 40; // Radius of the circle
  const strokeWidth = 4;
  const value=Math.ceil((completed_tasks/nb_tasks)*100)
  const circumference = 2 * Math.PI * radius;
  const progress = (value / 100) * circumference;

  return (
    <div className="flex flex-col justify-around w-full items-center p-6  shadow-lg rounded-2xl">
      <div className="relative w-24 h-24">
        {/* Background Circle */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            strokeWidth={strokeWidth}
            fill="transparent"
            className="stroke-gray-300"
          />
          {/* Progress Circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            strokeWidth={strokeWidth}
            fill="transparent"
            stroke="blue"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            className="transition-all duration-500 ease-in-out"
          />
        </svg>
        {/* Display Percentage */}
        <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
          {value}%
        </div>
      </div>
      <p className="mt-4 text-gray-600">{completed_tasks} from {nb_tasks}</p>
    </div>
  );
};

export default CircularProgressCard;
