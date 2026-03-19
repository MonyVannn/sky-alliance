import Image from "next/image";
import Link from "next/link";
import type { KeyboardEvent } from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";
import { FiArrowUpRight } from "react-icons/fi";
import type { IconType } from "react-icons";

export type TeamMemberSocials = {
  linkedin?: string;
  facebook?: string;
  tiktok?: string;
  x?: string;
};

export type TeamMemberCardProps = {
  name: string;
  title: string;
  bio: string;
  /** Longer profile copy for the team sheet; falls back to `bio` if omitted. */
  extendedBio?: string;
  imageSrc: string;
  imageAlt?: string;
  socials?: TeamMemberSocials;
  onSelect?: () => void;
};

const SOCIAL_ITEMS: {
  key: keyof TeamMemberSocials;
  Icon: IconType;
  label: string;
}[] = [
  { key: "linkedin", Icon: FaLinkedinIn, label: "LinkedIn" },
  { key: "facebook", Icon: FaFacebookF, label: "Facebook" },
  { key: "tiktok", Icon: FaTiktok, label: "TikTok" },
  { key: "x", Icon: FaXTwitter, label: "X" },
];

export default function TeamMemberCard({
  name,
  title,
  bio,
  imageSrc,
  imageAlt,
  socials,
  onSelect,
}: TeamMemberCardProps) {
  const alt = imageAlt ?? name;

  function handleActivate() {
    onSelect?.();
  }

  function handleKeyDown(e: KeyboardEvent<HTMLElement>) {
    if (!onSelect) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect();
    }
  }

  return (
    <article
      tabIndex={0}
      onClick={handleActivate}
      onKeyDown={handleKeyDown}
      className="group relative aspect-4/5 w-full cursor-pointer overflow-hidden bg-neutral-300 outline-none focus-visible:ring-2 focus-visible:ring-purple-medium focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8f4ff]"
    >
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className="object-cover object-top"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/75 via-black/25 to-transparent"
        aria-hidden
      />

      <div className="pointer-events-none absolute bottom-0 left-0 z-1 p-7 pr-4 transition-opacity duration-300 group-hover:opacity-0 group-focus-within:opacity-0">
        <h3 className="text-lg font-bold tracking-tight text-white sm:text-xl">
          {name}
        </h3>
        <p className="mt-1 text-sm text-white/90">{title}</p>
      </div>

      {socials ? (
        <div className="absolute right-4 top-4 z-20 flex gap-2">
          {SOCIAL_ITEMS.map(({ key, Icon, label }) => {
            const href = socials[key];
            if (!href) return null;
            return (
              <Link
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} on ${label}`}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
                className="flex size-10 items-center justify-center bg-black/40 text-white transition-colors hover:bg-black/55"
              >
                <Icon className="size-[18px]" />
              </Link>
            );
          })}
        </div>
      ) : null}

      <div className="absolute inset-x-0 bottom-0 z-10 translate-y-full bg-white px-6 pb-6 pt-5 transition-transform duration-300 ease-out group-hover:translate-y-0 group-focus-within:translate-y-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-medium text-neutral-600">{title}</p>
            <h3 className="mt-1 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
              {name}
            </h3>
          </div>
          <FiArrowUpRight
            className="size-6 shrink-0 text-neutral-900"
            aria-hidden
          />
        </div>
        <div className="my-4 h-px bg-neutral-200" aria-hidden />
        <p className="text-sm leading-relaxed text-neutral-600">{bio}</p>
      </div>
    </article>
  );
}
