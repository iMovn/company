import Link from "next/link";
import Image from "next/image";
import { SettingsData } from "@shared/types/setting";
import { DOMAIN_URL } from "@shared/constants/global";

type Props = {
  initialLogo: SettingsData;
};

const Logo = ({ initialLogo }: Props) => {
  return (
    <div className="flex-shrink-0 bg-transparent">
      <Link href={DOMAIN_URL || "/"} className="flex items-center">
        <div className="md:w-11 w-9.5 md:h-11 h-9.5 relative">
          <Image
            src={`${initialLogo?.logo || "/logos/imo-vn-brand.png"}`}
            alt="Logo"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain"
            priority
          />
        </div>
      </Link>
    </div>
  );
};

export default Logo;
