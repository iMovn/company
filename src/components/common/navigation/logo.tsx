import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex-shrink-0">
      <Link href="/" className="flex items-center">
        <div className="w-10 h-10 relative">
          <Image
            src="/logos/imovn-brand-name.png"
            alt="Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </Link>
    </div>
  );
};

export default Logo;
