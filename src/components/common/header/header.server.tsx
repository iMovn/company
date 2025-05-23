// components/common/header/header.server.tsx
import { fetchMainMenu } from "@services/menu.service";
import HeaderClient from "./header.client";
import { fetchSettings } from "@services/setting.service";

export default async function HeaderServer() {
  const [menu, settings] = await Promise.all([
    fetchMainMenu(),
    fetchSettings(),
  ]);

  return <HeaderClient menu={menu} settings={settings} />;
}
