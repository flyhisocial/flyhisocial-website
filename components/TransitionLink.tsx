"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { usePageTransition } from "./PageTransition";

type Props = ComponentProps<typeof Link> & { href: string };

// A Link that plays the pixel wipe (or smooth-scrolls for #anchors on the same page).
export default function TransitionLink({ href, onClick, ...rest }: Props) {
  const { navigate } = usePageTransition();
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    navigate(href);
  };
  return <Link href={href} onClick={handle} {...rest} />;
}
