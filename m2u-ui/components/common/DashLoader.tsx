import type React from 'react'

type DashLoaderProps = {
  color?: string
  size?: 'small' | 'medium' | 'large'
}

const DashLoader: React.FC<DashLoaderProps> = ({ color = '#4F46E5', size = 'medium' }) => {
  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'h-4 w-4'
      case 'large':
        return 'h-8 w-8'
      case 'medium':
      default:
        return 'h-6 w-6'
    }
  }

  return (
    <div className="flex justify-center items-center">
      <svg
        className={`animate-spin ${getSizeClass()}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke={color} strokeWidth="4"></circle>
        <path
          className="opacity-75"
          fill={color}
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  )
}

export default DashLoader
