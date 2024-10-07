// @ts-nocheck
'use client'

import Scene from "@/components/Scene";
import Mars from "@/components/Mars";
import { useState } from "react";

export default function MarsPage () {
  const [isQuaking, setIsQuaking] = useState(false)
  return (
    <>
      <Scene enableControl={true}>
        <Mars isPageHome={false} isQuaking={isQuaking} setIsQuaking={setIsQuaking}/>
      </Scene>
    </>
  )
}