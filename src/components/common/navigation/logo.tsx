import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SettingsData } from "@/types/setting";
import { fetchSettings } from "@/app/api/setting";

const Logo = () => {
  const [settings, setSettings] = useState<SettingsData | null>(null);
  useEffect(() => {
    const getData = async () => {
      const data = await fetchSettings();
      setSettings(data);
    };
    getData();
  }, []);

  return (
    <div className="flex-shrink-0 bg-transparent">
      <Link href="/" className="flex items-center">
        <div className="md:w-11 w-9.5 md:h-11 h-9.5 relative">
          <Image
            src={`${settings?.logo || "/logos/imo-vn-brand.png"}`}
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
