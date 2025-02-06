import { Header } from "~~/components/Header";
import { Hero } from "~~/components/hero";
import { Features } from "~~/components/features-section";
import { Faq } from "~~/components/faq";
import { Footer } from "~~/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <Faq />
      <Footer />
    </>
  );
}
