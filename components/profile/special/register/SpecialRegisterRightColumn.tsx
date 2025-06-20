'use client'

import { specialRegisterData } from '@/data/profile/special/special-register-data'
import { SpecialRegisterRightColumnProps } from '@/types/profile'
import Image from 'next/image'

function SpecialRegisterRightColumn({ hoveredStat }: SpecialRegisterRightColumnProps) {
  const currentSpecial = specialRegisterData.find((stat) => stat.name === hoveredStat)

  return (
    <div className="p-4">
      {currentSpecial ? (
        <div className="flex flex-col items-center">
          <Image
            src={currentSpecial.icon}
            className="mb-2"
            width={200}
            height={200}
            alt={`${currentSpecial.name} icon`}
            sizes="(min-width: 768px) 50vw"
            unoptimized
          />
          <h3 className="text-7xl uppercase font-bold text-primary tracking-wider">
            {currentSpecial.name}
          </h3>
          <p className="text-muted-foreground text-2xl mt-2 font-[roboto]">
            {currentSpecial.description}
          </p>
        </div>
      ) : (
        <p className="text-muted-foreground text-2xl font-[roboto-mono]">
          {' '}
          Hover over a stat to see details.
        </p>
      )}
    </div>
  )
}

export default SpecialRegisterRightColumn
