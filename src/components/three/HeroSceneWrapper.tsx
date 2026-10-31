"use client";

import dynamic from "next/dynamic";
import type { EquipmentType, StageMode } from "./FloatingEquipment";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[420px] rounded-3xl bg-zinc-950/40 border border-zinc-800/80 flex items-center justify-center">
      <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>INITIALIZING 3D ENGINE...</span>
      </div>
    </div>
  ),
});

export interface HeroSceneWrapperProps {
  activeEquipment?: EquipmentType;
  stageMode?: StageMode;
  className?: string;
}

export default function HeroSceneWrapper({
  activeEquipment = "power_rack",
  stageMode = "orbit",
  className,
}: HeroSceneWrapperProps) {
  return <HeroScene activeEquipment={activeEquipment} stageMode={stageMode} className={className} />;
}
