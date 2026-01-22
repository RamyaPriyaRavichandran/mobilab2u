import { FC, SVGProps } from 'react'

export default function TextCointainer({
  Icon,
  label,
  value,
}: {
  Icon?: FC<SVGProps<SVGSVGElement>>
  label: string
  value: string | number
}) {
  return (
    <div className="flex items-center col-span-1">
      {Icon && <Icon className="h-5 w-5 text-brand-400 mr-2" />}
      <div>
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-sm">{value || '-'}</p>
      </div>
    </div>
  )
}
