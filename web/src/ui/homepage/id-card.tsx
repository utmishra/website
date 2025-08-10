import Image from 'next/image'
import { Social } from './social'

export default function IdCard() {
  return (
    <div className="id-card flex flex-col items-center gap-0 sm:flex-col sm:gap-2 md:flex-row md:items-start md:justify-center xl:flex-row xl:items-start xl:justify-start xl:gap-4">
      <div className="p-4">
        <Image
          src="/utmishra.webp"
          alt="Utkarsh Mishra's avatar"
          width="160"
          height="160"
          style={{ borderRadius: '50%' }}
          priority
        />
      </div>
      <div className="flex flex-col items-center gap-2 md:items-start xl:items-start">
        <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-normal">
          Utkarsh Mishra
        </h1>
        <h2 className="text-lg sm:text-xl md:text-2xl xl:text-3xl font-normal">
          Senior Full Stack Engineer
        </h2>
        <p>Zurich, Switzerland</p>
        <Social />
      </div>
    </div>
  )
}
