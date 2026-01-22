export default function TextLoading({ paddingX = 'px-[40px]' }: { paddingX?: string }) {
  return <span className={`${paddingX} rounded-md ml-2  mt-0.5 bg-slate-200 animate-pulse`}></span>
}
