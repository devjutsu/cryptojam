import Image from "next/image";
import { Card, CardContent } from "~~/components/ui/card";
import { cn } from "~~/lib/utils";

interface TestimonialCardProps {
  name: string;
  username: string;
  image: string;
  text: string;
  className?: string;
}

export function TestimonialCard({ name, username, image, text, className }: TestimonialCardProps) {
  return (
    <Card className={cn("mt-7 inline-block break-inside-avoid shadow-lg", className)}>
      <CardContent className="flex flex-col items-start gap-4 divide-y p-7">
        <p className="text-foreground">{text}</p>
        <div className="flex items-center gap-4 w-full pt-4">
          <div className="relative size-10">
            <Image alt="Picture" src={image} fill className="rounded-full object-cover" />
          </div>
          <div>
            <p className="font-semibold leading-none text-foreground">{name}</p>
            <p className="mt-1 leading-none text-muted-foreground">@{username}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
