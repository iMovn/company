import Link from "next/link";
import Image from "next/image";
import { DOMAIN_URL } from "lib/constants/global";
import logoPlaceholder from "/public/logos/imo-vn-brand.png";

type Props = {
  initialLogo?: string | null;
};

const Logo = ({ initialLogo }: Props) => {
  const logoUrl = initialLogo || logoPlaceholder.src;

  return (
    <div className="flex-shrink-0 bg-transparent">
      <Link
        href={DOMAIN_URL || "/"}
        className="flex items-center"
        prefetch={false}
        aria-label="Trang chủ"
      >
        <div className="md:w-11 w-9.5 md:h-11 h-9.5 relative">
          <Image
            src={logoUrl}
            alt="iMovn Logo"
            fill
            sizes="(max-width: 768px) 38px, 44px"
            className="object-contain select-none"
            loading="eager"
            priority
          />
        </div>
      </Link>
    </div>
  );
};

export default Logo;
