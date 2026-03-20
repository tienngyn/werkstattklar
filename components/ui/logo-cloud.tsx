import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { cn } from '@/lib/utils';

type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type LogoCloudProps = React.ComponentProps<'div'> & {
  logos: Logo[];
  speed?: number;
  speedOnHover?: number;
};

export function LogoCloud({ className, logos, speed = 80, speedOnHover = 25, ...props }: LogoCloudProps) {
  return (
    <div
      {...props}
      className={cn(
        'overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]',
        className
      )}
    >
      <InfiniteSlider gap={48} speed={speed} speedOnHover={speedOnHover}>
        {logos.map((logo) => (
          <img
            alt={logo.alt}
            className="pointer-events-none h-5 select-none opacity-40 hover:opacity-70 transition-opacity duration-300 brightness-0 invert"
            height={logo.height || 20}
            key={`logo-${logo.alt}`}
            loading="lazy"
            src={logo.src}
            width={logo.width || 'auto'}
          />
        ))}
      </InfiniteSlider>
    </div>
  );
}
