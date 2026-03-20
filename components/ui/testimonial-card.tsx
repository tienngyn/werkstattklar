import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export interface TestimonialAuthor {
  name: string;
  handle: string;
  avatar: string;
}

export interface TestimonialCardProps {
  author: TestimonialAuthor;
  text: string;
  href?: string;
  className?: string;
}

export function TestimonialCard({ author, text, href, className }: TestimonialCardProps) {
  const Card = href ? "a" : "div";
  return (
    <Card
      {...(href ? { href } : {})}
      className={cn(
        "flex flex-col rounded-xl border-t border-white/[0.06]",
        "bg-gradient-to-b from-white/[0.05] to-white/[0.02]",
        "p-4 text-start sm:p-5",
        "hover:from-white/[0.08] hover:to-white/[0.04]",
        "max-w-[300px] sm:max-w-[300px]",
        "transition-colors duration-300 shrink-0",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={author.avatar} alt={author.name} />
        </Avatar>
        <div className="flex flex-col items-start">
          <h3 className="text-sm font-semibold text-white leading-none">{author.name}</h3>
          <p className="text-xs text-zinc-500 mt-0.5">{author.handle}</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{text}</p>
    </Card>
  );
}
