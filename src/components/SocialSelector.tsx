"use client";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

export type Platform = {
  name: string;
  domain: string;
  icon: React.ReactNode;
  url: string;
};

type Props = {
  platforms?: Platform[];
  handle?: string;
  selectedPlatform?: Platform;
  onChange?: (p: Platform) => void;
  className?: string;
};

export default function SocialSelector({
  platforms: inputPlatforms,
  handle = "hello_trader",
  selectedPlatform,
  onChange,
  className = "",
}: Props) {
  const defaultPlatforms: Platform[] = useMemo(
    () => [
      {
        name: "X",
        domain: "Updates on @brightSide",
        icon: (
          <svg width="20" height="20" viewBox="0 0 512 512" fill="currentColor">
            <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
          </svg>
        ),
        url: "https://x.com/juicy_ag", // ✅ X (Twitter)
      },
      {
        name: "Privacy Policy",
        domain: "Read about Privacy Policy",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M14 18C14 17.4696 13.7893 16.9609 13.4142 16.5858C13.0391 16.2107 12.5304 16 12 16C11.4696 16 10.9609 16.2107 10.5858 16.5858C10.2107 16.9609 10 17.4696 10 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M19 11.0001L16.89 4.34305C16.7976 4.07719 16.6502 3.83382 16.4573 3.62884C16.2645 3.42387 16.0305 3.26191 15.7708 3.15355C15.511 3.0452 15.2313 2.99288 14.9499 3.00004C14.6686 3.00719 14.3919 3.07364 14.138 3.19505L12.862 3.80505C12.5928 3.93352 12.2983 4.00014 12 4.00005H8.5C8.06434 3.99996 7.64057 4.14213 7.29311 4.40494C6.94565 4.66774 6.6935 5.03682 6.575 5.45605L5 11.0001" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 11H22" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M17 21C18.6569 21 20 19.6569 20 18C20 16.3431 18.6569 15 17 15C15.3431 15 14 16.3431 14 18C14 19.6569 15.3431 21 17 21Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7 21C8.65685 21 10 19.6569 10 18C10 16.3431 8.65685 15 7 15C5.34315 15 4 16.3431 4 18C4 19.6569 5.34315 21 7 21Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        ),
        url: "/privacy_policy.pdf", // ✅ Local PDF
      },
      {
        name: "Terms & Conditions",
        domain: "Read about Terms & Conditions",
        icon: (
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
  <path d="M7 18V12C7 10.6739 7.52678 9.40215 8.46447 8.46447C9.40215 7.52678 10.6739 7 12 7C13.3261 7 14.5979 7.52678 15.5355 8.46447C16.4732 9.40215 17 10.6739 17 12V18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M5 21C5 21.2652 5.10536 21.5196 5.29289 21.7071C5.48043 21.8946 5.73478 22 6 22H18C18.2652 22 18.5196 21.8946 18.7071 21.7071C18.8946 21.5196 19 21.2652 19 21V20C19 19.4696 18.7893 18.9609 18.4142 18.5858C18.0391 18.2107 17.5304 18 17 18H7C6.46957 18 5.96086 18.2107 5.58579 18.5858C5.21071 18.9609 5 19.4696 5 20V21Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M21 12H22" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M18.5 4.5L18 5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M2 12H3" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 2V3" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M4.92902 4.92896L5.63602 5.63596" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 12V18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
        ),
        url: "/tc.pdf", // ✅ Local PDF
      },
    ],
    []
  );

  const platforms = inputPlatforms ?? defaultPlatforms;
  const [internal, setInternal] = useState<Platform>(selectedPlatform ?? platforms[0]);
  const active = selectedPlatform ?? internal;

  const setActive = (p: Platform) => {
    onChange ? onChange(p) : setInternal(p);
  };

  const handleClick = (url: string, title?: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    if (title) {
      link.download = title;
    }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div className="flex items-center gap-6">
        {platforms.map((p) => (
          <div key={p.name} className="flex flex-col items-center gap-2">
            <motion.button
              onMouseEnter={() => setActive(p)}
              className={`p-2 rounded-full border transition-colors cursor-pointer 
                ${
                  active.name === p.name
                    ? "border-neutral-400 text-neutral-400"
                    : "border-transparent text-neutral-400"
                } 
                hover:border-neutral-400 hover:text-neutral-600
              `}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.98 }}
              aria-label={p.name}
            >
              {p.name === "Terms & Conditions" && active.name !== p.name ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M7 18V12C7 10.6739 7.52678 9.40215 8.46447 8.46447C9.40215 7.52678 10.6739 7 12 7C13.3261 7 14.5979 7.52678 15.5355 8.46447C16.4732 9.40215 17 10.6739 17 12V18" stroke="#6F6F6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 21C5 21.2652 5.10536 21.5196 5.29289 21.7071C5.48043 21.8946 5.73478 22 6 22H18C18.2652 22 18.5196 21.8946 18.7071 21.7071C18.8946 21.5196 19 21.2652 19 21V20C19 19.4696 18.7893 18.9609 18.4142 18.5858C18.0391 18.2107 17.5304 18 17 18H7C6.46957 18 5.96086 18.2107 5.58579 18.5858C5.21071 18.9609 5 19.4696 5 20V21Z" stroke="#6F6F6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12H22" stroke="#6F6F6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18.5 4.5L18 5" stroke="#6F6F6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12H3" stroke="#6F6F6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 2V3" stroke="#6F6F6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4.92902 4.92896L5.63602 5.63596" stroke="#6F6F6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 12V18" stroke="#6F6F6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : p.name === "Privacy Policy" && active.name !== p.name ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M14 18C14 17.4696 13.7893 16.9609 13.4142 16.5858C13.0391 16.2107 12.5304 16 12 16C11.4696 16 10.9609 16.2107 10.5858 16.5858C10.2107 16.9609 10 17.4696 10 18" stroke="#6F6F6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19 11.0001L16.89 4.34305C16.7976 4.07719 16.6502 3.83382 16.4573 3.62884C16.2645 3.42387 16.0305 3.26191 15.7708 3.15355C15.511 3.0452 15.2313 2.99288 14.9499 3.00004C14.6686 3.00719 14.3919 3.07364 14.138 3.19505L12.862 3.80505C12.5928 3.93352 12.2983 4.00014 12 4.00005H8.5C8.06434 3.99996 7.64057 4.14213 7.29311 4.40494C6.94565 4.66774 6.6935 5.03682 6.575 5.45605L5 11.0001" stroke="#6F6F6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 11H22" stroke="#6F6F6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17 21C18.6569 21 20 19.6569 20 18C20 16.3431 18.6569 15 17 15C15.3431 15 14 16.3431 14 18C14 19.6569 15.3431 21 17 21Z" stroke="#6F6F6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 21C8.65685 21 10 19.6569 10 18C10 16.3431 8.65685 15 7 15C5.34315 15 4 16.3431 4 18C4 19.6569 5.34315 21 7 21Z" stroke="#6F6F6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : p.name === "X" && active.name !== p.name ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18.2438 2.25H21.5532L14.325 10.5094L22.8282 21.75H16.1719L10.9547 14.9344L4.99222 21.75H1.67816L9.40785 12.9141L1.25629 2.25H8.08129L12.7922 8.47969L18.2438 2.25ZM17.0813 19.7719H18.9141L7.08285 4.125H5.1141L17.0813 19.7719Z" fill="#6F6F6F"/>
                </svg>
              ) : p.name === "X" && active.name === p.name ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18.2438 2.25H21.5532L14.325 10.5094L22.8282 21.75H16.1719L10.9547 14.9344L4.99222 21.75H1.67816L9.40785 12.9141L1.25629 2.25H8.08129L12.7922 8.47969L18.2438 2.25ZM17.0813 19.7719H18.9141L7.08285 4.125H5.1141L17.0813 19.7719Z" fill="black"/>
                </svg>
              ) : (
                p.icon
              )}
            </motion.button>
          </div>
        ))}
      </div>
      <div className="text-base">
        <motion.button
          onClick={() => handleClick(active.url, active.name)}
          className="font-semibold text-neutral-400 hover:underline cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {active.domain}
        </motion.button>
      </div>
    </div>
  );
}
