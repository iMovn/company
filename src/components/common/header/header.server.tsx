// components/common/header/header.server.tsx
import { cache } from "react";
import { fetchMainMenu } from "lib/api/menu.service";
import { fetchSettings } from "lib/api/setting.service";
import HeaderClient from "./header.client";

// Sử dụng React cache để tránh duplicate requests
const cachedFetchMenu = cache(fetchMainMenu);
const cachedFetchSettings = cache(fetchSettings);

export default async function HeaderServer() {
  const [menu, settings] = await Promise.allSettled([
    cachedFetchMenu(),
    cachedFetchSettings(),
  ]);

  return (
    <HeaderClient
      menu={menu.status === "fulfilled" ? menu.value : []}
      settings={settings.status === "fulfilled" ? settings.value : null}
    />
  );
}
