import { FerrisWheel, Music, Podcast, TrendingUp } from "lucide-react";
import { FeatureHoverCard } from "~~/components/feature-hover-card";

export default function AboutPage() {
  return (
    <section className="container flex flex-col items-center gap-6 py-24 sm:gap-7  ">
      <div className="flex flex-col gap-3">
        <span className="font-bold uppercase text-primary text-center">🎵 The Future of Music Creation </span>
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl text-balance text-center">
          Create - Explore - Learn - Earn
        </h2>
      </div>
      <p className="text-lg text-muted-foreground text-balance max-w-xl text-center">
        For artists, remixers, and listeners who want to collaborate, experiment, and earn through music.
      </p>

      <div className="relative z-10 mx-auto grid max-w-2xl text-primary">
        CryptoJam Space is a blockchain-based platform on Base where musicians can create and exchange music NFTs,
        called NFTunes. The project is designed to help musicians monetize their creativity by allowing them to sell and
        trade their music as NFTs.
      </div>


      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 py-10 sm:grid-cols-2 lg:grid-cols-2">
        <FeatureHoverCard
          icon={FerrisWheel}
          title="Collaboration"
          description="The platform introduces music challenges, where artists can respond to each other's tracks by creating
        remixes or new compositions. These collaborations generate unique NFTunes, owned jointly by the original creator
        and the remixing artist."
        />
        <FeatureHoverCard
          icon={Music}
          title="NFTunes"
          description="Additionally, CryptoJam plans to implement: AI-generated visuals for each composition. Easy audio playback and
        browsing of all recorded tracks. Challenges and voting for the best musical creations. Auctions for exclusive
        NFTunes."
        />
        <FeatureHoverCard
          icon={TrendingUp}
          title="JamCoin"
          description="JamCoin, is an ERC-20 token that powers staking = voting. Fans can stake
        JamCoin on their favorite compositions, boosting their ranking on the platform and benefit from it's growth."
        />

        <FeatureHoverCard
          icon={Podcast}
          title="Engagement"
          description="The project aims to create a vibrant, decentralized music ecosystem where musicians can collaborate, gain
        recognition, and earn from their work."
          className="lg:border-l"
        />
      </div>
    </section>
  );
}
