"use client";

import ButtonLink from "@/app/components/ButtonLink";
import WordMark from "@/app/components/WordMark";
import { asLink, Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";

type NavbarProps = {
  settings: Content.SettingsDocument;
};

export default function Navbar({ settings }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="p-4 md:p-6">
      <div className="mx-auto flex max-w-6xl flex-col justify-between py-2 font-medium text-zinc-50 md:flex-row md:items-center">
        <div className="flex items-center justify-between">
          <Link href="/" className="z-50" onClick={() => setIsOpen(false)}>
            <WordMark />
            <span className="sr-only">{settings.data.site_title} Homepage</span>
          </Link>
          <button
            type="button"
            className="block p-2 text-3xl text-slate-50 md:hidden"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(true)}
          >
            <MdMenu />
            <span className="sr-only">Open menu</span>
          </button>
        </div>

        {/* Mobile nav */}
        <div
          className={clsx(
            "fixed bottom-0 left-0 right-0 top-0 z-40 flex flex-col items-end gap-4 bg-[#070815] pr-4 pt-14 transition-transform duration-300 ease-in-out motion-reduce:transition-none md:hidden",
            isOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <button
            type="button"
            className="fixed right-4 top-6 mb-4 block p-2 text-3xl text-slate-50 md:hidden"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(false)}
          >
            <MdClose />
            <span className="sr-only">Close menu</span>
          </button>

          <div className="grid w-full justify-items-center gap-8">
            {settings.data.navigation.map((item) => {
              if (item.cta_button) {
                return (
                  <ButtonLink
                    key={item.label}
                    field={item.link}
                    onClick={() => setIsOpen(false)}
                    aria-current={
                      pathname.includes(asLink(item.link) as string)
                        ? "page"
                        : undefined
                    }
                  >
                    {item.label}
                  </ButtonLink>
                );
              }
              return (
                <PrismicNextLink
                  className="block px-3 text-2xl first:mt-12"
                  key={item.label}
                  field={item.link}
                  onClick={() => setIsOpen(false)}
                  aria-current={
                    pathname.includes(asLink(item.link) as string)
                      ? "page"
                      : undefined
                  }
                >
                  {item.label}
                </PrismicNextLink>
              );
            })}
          </div>
        </div>

        {/* Desktop nav */}
        <ul className="hidden gap-6 md:flex">
          {settings.data.navigation.map((item) => {
            if (item.cta_button)
              return (
                <li key={item.label}>
                  <ButtonLink
                    field={item.link}
                    aria-current={
                      pathname.includes(asLink(item.link) as string)
                        ? "page"
                        : undefined
                    }
                  >
                    {item.label}
                  </ButtonLink>
                </li>
              );

            return (
              <li key={item.label}>
                <PrismicNextLink
                  field={item.link}
                  className="inline-flex min-h-11 items-center"
                  aria-current={
                    pathname.includes(asLink(item.link) as string)
                      ? "page"
                      : undefined
                  }
                >
                  {item.label}
                </PrismicNextLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
