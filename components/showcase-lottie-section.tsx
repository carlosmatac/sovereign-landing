"use client"

import { useEffect, useState } from "react"
import Lottie from "lottie-react"
import type { LottieComponentProps } from "lottie-react"
import { MktContainer, MktSectionX } from "@/components/marketing-layout"

type AnimationData = LottieComponentProps["animationData"]

export function ShowcaseLottieSection() {
  const [animationData, setAnimationData] = useState<AnimationData | null>(null)

  useEffect(() => {
    fetch("/showcase.json")
      .then((res) => res.json())
      .then(setAnimationData)
      .catch(() => {})
  }, [])

  return (
    <MktSectionX className="overflow-x-hidden">
      <MktContainer className="pb-6 pt-4 md:pb-10 md:pt-6 lg:pb-12">
        <div className="mx-auto w-full max-w-[1100px]">
          {animationData ? (
            <Lottie
              animationData={animationData}
              loop
              autoplay
              className="h-auto w-full"
              rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
            />
          ) : (
            <div
              className="w-full"
              style={{ aspectRatio: "4117 / 2127" }}
              aria-hidden="true"
            />
          )}
        </div>
      </MktContainer>
    </MktSectionX>
  )
}
