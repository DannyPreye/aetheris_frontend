// import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { HeroSection } from "@/components/marketing/sections/hero";
import { FeaturesPreview } from "@/components/marketing/sections/features";
import { FAQSection } from "@/components/marketing/sections/faq";
import { CTASection } from "@/components/marketing/sections/cta";
import { serverSession } from "@/auth";

export default async function HomePage() {
  const session = await serverSession();

  // if (session) {
  //   redirect("/dashboard");
  // }

  return (
    <>
      <HeroSection />
      <FeaturesPreview />
      <FAQSection />
      <CTASection />
    </>
  );
}
