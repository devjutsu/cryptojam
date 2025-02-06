import { Music, Headphones, Play, Coins, ArrowRight } from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "~~/components/ui/card";
import { Badge } from "~~/components/ui/badge";
import { Button } from "~~/components/ui/button";

export function Hero() {
  return (
    <section className="container flex flex-col items-center gap-8 pb-28 pt-20 sm:gap-10">
      <div className="relative sm:mt-8">
        <div className="absolute inset-0 -z-10 bg-primary/20 [filter:blur(180px)]" />
      </div>
      <div className="container relative z-10 mx-auto px-4 pt-20 pb-16">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h1 className="font-heading text-6xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent mb-6">
            Crypto Jam Space
          </h1>
          <p className="text-2xl text-muted-foreground mb-12">Jam - Connect - Collaborate - Earn</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-16">
            <Card className="bg-card/50 backdrop-blur border-primary/20">
              <CardHeader>
                <CardTitle className="font-heading text-2xl flex items-center gap-2">
                  <Music className="h-6 w-6 text-primary" />
                  For Artists
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">NFTune</Badge>
                  <span className="text-muted-foreground">Create Music NFTs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Connect</Badge>
                  <span className="text-muted-foreground">Collaborate with others</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Earn</Badge>
                  <span className="text-muted-foreground">Monetize your music</span>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur border-primary/20">
              <CardHeader>
                <CardTitle className="font-heading text-2xl flex items-center gap-2">
                  <Headphones className="h-6 w-6 text-primary" />
                  For Listeners
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Explore</Badge>
                  <span className="text-muted-foreground">Play NFTunes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Stake</Badge>
                  <span className="text-muted-foreground">Support with JamCoins</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Earn</Badge>
                  <span className="text-muted-foreground">Profit from liked tracks</span>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex gap-4">
            <Button size="lg" className="gap-2">
              <Play className="h-5 w-5" />
              Start Creating
            </Button>
            <Button size="lg" variant="secondary" className="gap-2">
              <Music className="h-5 w-5" />
              Play NFTunes
            </Button>
          </div>
        </div>
      </div>
      <div className="flex cursor-pointer items-center gap-1 rounded-full border bg-secondary px-3 py-0.5 hover:bg-secondary/60 text-secondary-foreground">
        <Coins size={16} className="mx-2" />
        <span className="text-sm text-secondary-foreground mx-2">Get JamCoins</span>
        <ArrowRight size={16} className="mx-2" />
      </div>
    </section>
  );
}
