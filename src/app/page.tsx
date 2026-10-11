import { DonationSection } from "@/components/sections/DonationSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { GoalSection } from "@/components/sections/GoalSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { StorySection } from "@/components/sections/StorySection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StorySection />
      <GoalSection />
      <DonationSection />
      <FAQSection />
    </>
  );
}
