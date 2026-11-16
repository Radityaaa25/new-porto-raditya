import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { Hero } from "@/components/sections/Hero";
import { Highlights } from "@/components/sections/Highlights";
import { HomeClosing } from "@/components/sections/HomeClosing";
import { HomeToolbox } from "@/components/sections/HomeToolbox";
import { IntroStatement } from "@/components/sections/IntroStatement";
import { MarqueeBand } from "@/components/sections/MarqueeBand";
import { Process } from "@/components/sections/Process";
import { WorkRail } from "@/components/sections/WorkRail";

export default function HomePage() {
  return (
    <>
      <Hero />
      <IntroStatement />
      <WorkRail />
      <MarqueeBand />
      <Process />
      <AboutTeaser />
      <HomeToolbox />
      <ExperienceTimeline />
      <Highlights />
      <HomeClosing />
    </>
  );
}
