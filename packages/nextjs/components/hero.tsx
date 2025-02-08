import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Coins, Headphones, Music, Play } from "lucide-react";
import { Badge } from "~~/components/ui/badge";
import { Button } from "~~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~~/components/ui/card";

export function Hero() {
  return (
    <section className="container flex flex-col items-center gap-8 pb-28 pt-0 lg:pt-8 sm:gap-10">
      {/* <div className="relative sm:mt-8 border border-red-500">
        <div className="absolute inset-0 -z-10 bg-primary/20 [filter:blur(180px)]" />
      </div> */}

      <div className="container relative z-10 mx-auto px-4 pt-8 md:pt-20 pb-4">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent mb-6">
            Crypto Jam Space
          </h1>
          <p className="text-md md:text-lg text-muted-foreground mb-12">Jam - Connect - Collaborate - Earn</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-16">
            <Card
              className="bg-card/50 backdrop-blur border-primary/20 
            hover:bg-gradient-to-t from-primary/20 to-transparent"
            >
              <CardHeader>
                <CardTitle className="font-heading text-2xl flex items-center gap-2">
                  <Music className="h-6 w-6 text-primary" />
                  For Artists
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">NFTune</Badge>
                  <span className="text-muted-foreground text-nowrap">Create Music NFTs</span>
                </div>
                <div className="flex items-center">
                  <Badge variant="secondary">Connect</Badge>
                  <span className="text-muted-foreground text-nowrap">Collaborate with others</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Earn</Badge>
                  <span className="text-muted-foreground text-nowrap">Monetize your music</span>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur border-primary/20 hover:bg-gradient-to-t from-primary/20 to-transparent">
              <CardHeader>
                <CardTitle className="font-heading text-2xl flex items-center gap-2">
                  <Headphones className="h-6 w-6 text-primary" />
                  For Listeners
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Explore</Badge>
                  <span className="text-muted-foreground text-nowrap">Play NFTunes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Stake</Badge>
                  <span className="text-muted-foreground text-nowrap">Support with JamCoins</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Earn</Badge>
                  <span className="text-muted-foreground text-nowrap">Profit from liked tracks</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-16">
            <Link href="/create">
              <Button asChild size="lg" className="gap-2">
                <span>
                  <Play className="h-5 w-5" />
                  Start Creating
                </span>
              </Button>
            </Link>
            <Link href="/explore">
              <Button size="lg" variant="destructive" className="gap-2">
                <Music className="h-5 w-5" />
                Play NFTunes
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div>
        <Image
          alt="Image"
          src="/images/Defaultminimalisticlogoformusicconnectionplainblackbac0da559d23-df0a-44ba-a7f7-cc3813d1201b0-(1).png"
          width={64}
          height={64}
        />
      </div>
      <Link href={"/getcoins"}>
        <div className="flex cursor-pointer items-center gap-1 rounded-full border bg-secondary px-3 py-0.5 hover:bg-secondary/60 text-secondary-foreground  shadow-xl animate-[glow_20s_infinite_alternate]">
          <Coins size={16} className="mx-2" />
          <span className="text-sm text-secondary-foreground mx-2">Get JamCoins</span>
          <ArrowRight size={16} className="mx-2" />
        </div>
      </Link>
    </section>
  );
}
