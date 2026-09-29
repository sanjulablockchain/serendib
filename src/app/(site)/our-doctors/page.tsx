import { Affiliated } from "@/components/sections/Affiliated";
import { DoctorFinder } from "@/components/sections/DoctorFinder";
import { DoctorsHero } from "@/components/sections/DoctorsHero";
import { Guarantee } from "@/components/sections/Guarantee";
import { Container } from "@/components/ui/Container";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: "Our Doctors", path: "/our-doctors" });

export default function OurDoctorsPage() {
  return (
    <>
      <DoctorsHero />
      <Container>
        <Affiliated />
        <DoctorFinder />
        <Guarantee />
      </Container>
    </>
  );
}
