"use client";

import BuyTokens from "~~/components/BuyTokens";

export default function GetcoinsPage() {
  return (
    <section className="container flex flex-col items-center gap-6 py-24 sm:gap-7  ">
      <div className="flex flex-col gap-3">
        <span className="font-bold uppercase text-primary text-center">🪙 Get Jam Coin </span>
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl text-balance text-center">
          Fuel of the Platform
        </h2>
      </div>
      <p className="text-lg text-muted-foreground text-balance max-w-xl text-center">Purchase with ETH</p>

      <BuyTokens />
      <div className="relative z-10 mx-auto grid max-w-2xl text-primary">
        JamCoin is the lifeblood of CryptoJam, empowering musicians and listeners alike. Use JamCoin to mint your
        NFTunes, stake on your favorite tracks to boost their visibility, and participate in challenges, auctions, and
        community voting. The more engagement a track gets, the more rewards both creators and stakers can earn!
      </div>
    </section>
  );
}
