"use client";
import { Skeleton } from "@/shadcn/components/ui/skeleton";
import { LazyMotion, domAnimation, m } from "framer-motion";
import React, { useEffect, useState } from "react";
import { cn } from "./utils";

interface GwImageProps {
  src: string;
  alt: string;
  className?: string;
  superStyle?: React.CSSProperties;
}

export default function GwImage({ src, alt, className, superStyle }: GwImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = src;

    const handleImageLoad = () => {
      setIsLoading(false);
    };

    const handleImageError = () => {
      setIsLoading(false);
      setIsError(true);
    };

    image.addEventListener("load", handleImageLoad);
    image.addEventListener("error", handleImageError);

    return () => {
      image.removeEventListener("load", handleImageLoad);
      image.removeEventListener("error", handleImageError);
    };
  }, [src]);

  if (isLoading) {
    // Render skeleton or loading state here
    return (
      <LazyMotion features={domAnimation}>
        <m.div className={className} initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 1 } }}>
          <Skeleton className={className} style={superStyle} />
        </m.div>
      </LazyMotion>
    );
  }

  if (isError) {
    // Render error state here
    return (
      <div className={cn("!flex justify-center items-center bg-secondary", className)} style={superStyle}>
        <span>Image cannot be loaded</span>
      </div>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.img src={src} alt={alt} loading="lazy" className={cn("bg-secondary-foreground", className)} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 1 } }} exit={{ opacity: 0, zoom: 0.5, transition: { duration: 1 } }} style={superStyle} />
    </LazyMotion>
  );
}
