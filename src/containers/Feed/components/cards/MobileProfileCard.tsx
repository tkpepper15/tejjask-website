import { CONFIG } from "site.config"
import Image from "next/image"
import React from "react"

type Props = {
  className?: string
}

const MobileProfileCard: React.FC<Props> = () => {
  return (
    <div className="block lg:hidden">
      <div className="p-1 mb-3 dark:text-white">😃 Profile</div>
      <div className="p-2 rounded-2xl bg-white dark:bg-zinc-700 mb-4">
        <div className="flex items-center gap-2">
          <Image
            src={CONFIG.profile.image}
            width={90}
            height={90}
            alt="profile_image"
            className="relative"
          />
          <div className="h-fit dark:text-white">
            <div className=" text-xl  italic font-bold">
              {CONFIG.profile.name}
            </div>
            <div className="text-sm text-gray-500 mb-2 dark:text-gray-400">
              {CONFIG.profile.role}
            </div>
            <div className="text-sm">{CONFIG.profile.bio}</div>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default MobileProfileCard
