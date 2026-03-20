import { cn } from "@/lib/utils";
import { TestimonialCard, TestimonialAuthor } from "@/components/ui/testimonial-card";

interface TestimonialsSectionProps {
  title: string;
  description: string;
  testimonials: Array<{
    author: TestimonialAuthor;
    text: string;
    href?: string;
  }>;
  className?: string;
}

export function TestimonialsSection({
  title,
  description,
  testimonials,
  className,
}: TestimonialsSectionProps) {
  return (
    <section className={cn("text-white py-12 sm:py-20 px-0", className)}>
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-4 text-center sm:gap-12">
        <div className="flex flex-col items-center gap-4 px-4 sm:gap-6">
          <h2 className="max-w-[720px] text-3xl font-bold leading-tight sm:text-5xl sm:leading-tight">
            {title}
          </h2>
          <p className="text-base max-w-[600px] font-medium text-zinc-500 sm:text-lg">
            {description}
          </p>
        </div>
        <div className="relative w-full overflow-hidden">
          {/* Single track with 2 identical sets — animates translateX(0) → translateX(-50%) */}
          <div className="group flex w-max animate-marquee-seamless hover:[animation-play-state:paused] gap-6">
            {/* Set 1 */}
            {testimonials.map((testimonial, i) => (
              <TestimonialCard key={`a-${i}`} {...testimonial} />
            ))}
            {/* Set 2 — seamless duplicate */}
            {testimonials.map((testimonial, i) => (
              <TestimonialCard key={`b-${i}`} aria-hidden={true} {...testimonial} />
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/4 bg-gradient-to-r from-[#161616] sm:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/4 bg-gradient-to-l from-[#161616] sm:block" />
        </div>
      </div>
    </section>
  );
}
