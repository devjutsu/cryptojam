import Link from "next/link";
import Image from "next/image";

import { NavItem } from "~~/components/nav-item";
import { Button } from "~~/components/ui/button";
import { MobileNavbar } from "~~/components/mobile-navbar";
import { MobileNavItem } from "~~/components/mobile-nav-item";
import { cn } from "~~/lib/utils";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        "container flex items-center justify-between gap-10 pr-8 pl-[32px] py-2",
        className,
      )}
    >
      <Link href="/" className="flex items-center gap-3">
        <Image
          alt="Image"
          src="/images/Defaultminimalisticlogoformusicconnectionplainblackbac0da559d23-df0a-44ba-a7f7-cc3813d1201b0-(1).png"
          width={128}
          height={500}
        />
        <span className="font-heading text-xl font-bold text-primary">Crypto Jam Space</span>
      </Link>
      <div className="flex items-center gap-10">
        <nav className="hidden items-center gap-10 md:flex justify-end">
          <NavItem href="/create" label="Create NFTune" />
          <NavItem href="/explore" label="Explore & Play" />
          <NavItem href="/getcoins" label="Get Coins" />
          <NavItem href="/about" label="About" />
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button asChild>
            <Link href="#" className="cursor-pointer">
              Sign in
            </Link>
          </Button>
        </div>
      </div>
      <MobileNavbar>
        <div className="rounded-b-lg bg-background py-4 container text-foreground shadow-xl">
          <nav className="flex flex-col gap-1 pt-2">
            <MobileNavItem href="/about" label="About" />
            <MobileNavItem href="/docs" label="Docs" />
            <MobileNavItem href="/blog" label="Blog" />
            <MobileNavItem href="/pricing" label="Pricing" />
            <Button size="lg" asChild className="mt-2 w-full">
              <Link href="#" className="cursor-pointer">
                Get Started
              </Link>
            </Button>
          </nav>
        </div>
      </MobileNavbar>
    </header>
  );
}
