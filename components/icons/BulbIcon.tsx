import React from 'react';

export const BulbIcon: React.FC<{ className?: string; isPrimary?: boolean; }> = ({ className, isPrimary }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className || "h-5 w-5"}
  >
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M12 2a7 7 0 0 0-7 7c0 3.04 1.63 5.59 4 6.67V18h6v-2.33c2.37-1.08 4-3.63 4-6.67a7 7 0 0 0-7-7z" />
    {isPrimary && <path d="M12 6a3.5 3.5 0 0 0 0 7" />}
  </svg>
);