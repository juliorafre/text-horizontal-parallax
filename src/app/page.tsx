'use client';
import Image from 'next/image';
import type { LenisRef } from 'lenis/react';
import { ReactLenis } from 'lenis/react';
import { useEffect, useRef } from 'react';
import { useTransform, MotionValue, motion, useScroll } from 'motion/react';
import 'lenis/dist/lenis.css';

export default function Home() {
  const lenisRef = useRef<LenisRef>(null);
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  });

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time);
      requestAnimationFrame(update);
    }

    const rafId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    console.log(scrollYProgress);
  }, [scrollYProgress]);

  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
      <div className="overflow-hidden font-[Regular]">
        <div className="h-[100vh]"></div>
        <div ref={container}>
          <Slide left="-40%" src="/images/1.jpg" direction="left" progress={scrollYProgress} />
          <Slide left="-25%" src="/images/2.jpg" direction="right" progress={scrollYProgress} />
          <Slide left="-75%" src="/images/3.jpg" direction="left" progress={scrollYProgress} />
        </div>
        <div className="h-[100vh]"></div>
      </div>
    </ReactLenis>
  );
}

interface SlideProps {
  left: string;
  src: string;
  direction: 'left' | 'right';
  progress: MotionValue<number>;
}

const Slide = (props: SlideProps) => {
  const direction = props.direction == 'left' ? -1 : 1;

  const translateX = useTransform(props.progress, [0, 1], [150 * direction, -150 * direction]);

  return (
    <motion.div style={{ left: props.left, x: translateX }} className="relative flex whitespace-nowrap">
      <Phrase src={props.src} />
      <Phrase src={props.src} />
      <Phrase src={props.src} />
    </motion.div>
  );
};

interface PhraseProps {
  src: string;
}

const Phrase = ({ src }: PhraseProps) => {
  return (
    <div className="px-5 flex gap-5 items-center">
      <p className="text-[7.5vw]">Front End Developer</p>
      <span className="relative h-[7.5vw] aspect-[4/2] rounded-full overflow-hidden">
        <Image className="object-cover" src={src} alt="image" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
      </span>
    </div>
  );
};
