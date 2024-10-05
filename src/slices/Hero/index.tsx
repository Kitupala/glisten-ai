import Bounded from "@/app/components/Bounded";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import AnimatedContent from "./AnimatedContent";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero = ({ slice }: HeroProps): JSX.Element => {
  return (
    <Bounded
      className="text-center"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <AnimatedContent slice={slice} />
    </Bounded>
  );
};

export default Hero;
