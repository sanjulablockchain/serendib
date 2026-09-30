import { AfterHours } from "@/components/sections/AfterHours";
import { Compliance } from "@/components/sections/Compliance";
import { Doctors } from "@/components/sections/Doctors";
import { Hero } from "@/components/sections/Hero";
import { MakeTheSwitch } from "@/components/sections/MakeTheSwitch";
import { Marquee } from "@/components/sections/Marquee";
import { News } from "@/components/sections/News";
import { Partners } from "@/components/sections/Partners";
import { PlanOptions } from "@/components/sections/PlanOptions";
import { TransferTeaser } from "@/components/sections/TransferTeaser";
import { Stats } from "@/components/sections/Stats";
import { Container } from "@/components/ui/Container";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Container>
        <Stats />
        <PlanOptions />
        <AfterHours />
        <Doctors />
        <Partners />
        <Compliance />
        <TransferTeaser />
        <News />
        <MakeTheSwitch />
      </Container>
    </>
  );
}
