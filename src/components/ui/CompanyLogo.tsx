"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./CompanyLogo.module.css";

interface CompanyLogoProps {
  name: string;
  slug: string;
  size?: "small" | "large";
}

export function CompanyLogo({ name, slug, size = "small" }: CompanyLogoProps) {
  const [hasError, setHasError] = useState(false);
  const initial = name.charAt(0).toUpperCase();

  // Look for the locally downloaded image
  const logoUrl = `/logos/${slug}.png`;

  if (hasError) {
    return (
      <div className={`${styles.fallback} ${styles[size]}`}>
        <span className={styles.fallbackText}>{initial}</span>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${styles[size]}`}>
      <Image
        src={logoUrl}
        alt={`${name} logo`}
        fill
        className={styles.image}
        onError={() => setHasError(true)}
        unoptimized 
      />
    </div>
  );
}
