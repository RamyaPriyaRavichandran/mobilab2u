export default function DotLoader({ width, height, color }: { width?: string; height?: string; color?: string }) {
  return (
    <div className={`flex space-x-2 justify-center items-center  bg-white hover:bg-${color} dark:invert`}>
      <span className="sr-only">Loading...</span>
      <div
        className={`h-3 w-3 ${color ? `bg-${color} hover:bg-white` : 'bg-black'}  rounded-full animate-bounce [animation-delay:-0.3s]`}
      ></div>
      <div
        className={`h-3 w-3 ${color ? `bg-${color} hover:bg-white` : 'bg-black'}  rounded-full animate-bounce [animation-delay:-0.10s]`}
      ></div>
      <div
        className={`h-3 w-3 ${color ? `bg-${color} hover:bg-white` : 'bg-black'}  rounded-full animate-bounce [animation-delay:-0.3s]`}
      ></div>
    </div>
  )
}
