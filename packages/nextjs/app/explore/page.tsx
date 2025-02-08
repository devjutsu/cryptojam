export default function ExplorePage() {
  return (
    <section className="container flex flex-col items-center gap-6 py-24 sm:gap-7">
      <div className="flex flex-col gap-3">
        <span className="font-bold uppercase text-primary text-center">Explore - Play</span>
      </div>
      <p className="text-lg text-muted-foreground text-balance max-w-xl text-center">...</p>
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 py-10 md:grid-cols-2 lg:grid-cols-4"></div>
    </section>
  );
}
