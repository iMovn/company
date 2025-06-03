"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@components/ui/Tooltip";
import { AtSign, MapPinHouse, PhoneIncoming } from "lucide-react";
import Link from "next/link";

interface FooterContactInfoProps {
  address?: string;
  linkMap?: string;
  phone?: string;
  email?: string;
}

export function FooterContactInfo({
  address,
  linkMap,
  phone,
  email,
}: FooterContactInfoProps) {
  return (
    <section className="text-sm space-x-4 ml-3 pt-2 text-neutral-300">
      {address && (
        <Link href={linkMap || "#"} rel="nofollow" target="_blank">
          <Tooltip>
            <TooltipTrigger className="cursor-pointer">
              <MapPinHouse />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-neutral-0">{address}</p>
            </TooltipContent>
          </Tooltip>
        </Link>
      )}

      {phone && (
        <Link href={`tel:${phone}`} rel="nofollow" target="_blank">
          <Tooltip>
            <TooltipTrigger className="cursor-pointer">
              <PhoneIncoming />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-neutral-0">{phone}</p>
            </TooltipContent>
          </Tooltip>
        </Link>
      )}

      {email && (
        <Link href={`mailto:${email}`} rel="nofollow" target="_blank">
          <Tooltip>
            <TooltipTrigger className="cursor-pointer">
              <AtSign />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-neutral-0">{email}</p>
            </TooltipContent>
          </Tooltip>
        </Link>
      )}
    </section>
  );
}
