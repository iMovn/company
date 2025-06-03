// import { Container } from "@components/ui/Containers";
// import { GradientBackgroundTwoColor } from "@components/ui/GradientBackground/TwoColor";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@components/ui/Tooltip";
// import { fetchMobileMenu } from "lib/api/menu.service";
// import { fetchSettings } from "lib/api/setting.service";
// import { AtSign, MapPinHouse, PhoneIncoming } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { ContactForm } from "../form/ContactForm";
// import GradientText from "@components/ui/GradientText";
// import CountUp from "@components/ui/CountUp";

// export default async function Footer() {
//   const [settings, menus] = await Promise.all([
//     fetchSettings(),
//     fetchMobileMenu(),
//   ]);

//   // Lọc menu cha (level 0)
//   const parentMenus = menus.filter((menu) => !menu.parent_id);

//   return (
//     <GradientBackgroundTwoColor className="mt-24">
//       <Container as="footer" size="md" className="my-32">
//         {settings.content?.content && (
//           <section
//             className="content-footer prose prose-sm dark:prose-invert"
//             dangerouslySetInnerHTML={{ __html: settings.content.content }}
//           />
//         )}

//         <section className="form-group grid md:grid-cols-[40%_58%] gap-4 my-20 dark:bg-neutral-950/80 bg-neutral-50 rounded-2xl shadow-lg">
//           <div className="md:p-8 p-5">
//             <GradientText
//               colors={["#40ffaa", "#4079ff", "#40ffaa"]}
//               animationSpeed={3}
//               showBorder={false}
//               className="text-3xl font-archivo !font-bold rounded-none"
//             >
//               Làm việc với IMO VN
//             </GradientText>

//             <p className="text-sm">
//               Để đảm bảo chất lượng chúng tôi chỉ nhận 3 dự án mỗi quý.
//             </p>

//             <CountUp
//               from={0}
//               to={100}
//               separator=","
//               direction="up"
//               duration={1}
//               className="count-up-text"
//             />
//           </div>
//           <ContactForm className="md:border-l-[1px] md:p-8 p-5" />
//         </section>

//         <section className="flex items-center gap-2 mb-8">
//           {settings.logo && (
//             <div className="md:w-16 w-14 md:h-16 h-14 relative">
//               <Image
//                 src={settings.logo}
//                 alt={settings.company.name || "Company Logo"}
//                 fill
//                 sizes="(max-width: 768px) 38px, 44px"
//                 className="object-contain select-none"
//                 loading="eager"
//                 priority
//               />
//             </div>
//           )}

//           <div className="text-sm">
//             <p>© {new Date().getFullYear()} - All rights reserved</p>
//             {settings.company.copyright && (
//               <p
//                 dangerouslySetInnerHTML={{ __html: settings.company.copyright }}
//               />
//             )}
//           </div>
//         </section>

//         <nav className="mb-8 ml-3">
//           <ul className="md:flex flex-1 items-center gap-4">
//             {parentMenus.map((menu) => (
//               <li key={menu.id} className="md:mb-0 mb-3">
//                 <Link
//                   href={menu.link || "#"}
//                   className="md:text-base text-sm hover:text-primary transition-colors"
//                 >
//                   {menu.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </nav>

//         <section className="text-sm space-x-4 ml-3 pt-2 text-neutral-300">
//           {settings.company.address && (
//             <Link
//               href={settings.company.link_map || "#"}
//               rel="nofollow"
//               target="_blank"
//             >
//               <Tooltip>
//                 <TooltipTrigger className="cursor-pointer">
//                   <MapPinHouse />
//                 </TooltipTrigger>
//                 <TooltipContent>
//                   <p className="text-neutral-0">{settings.company.address}</p>
//                 </TooltipContent>
//               </Tooltip>
//             </Link>
//           )}
//           {settings.company.phone && (
//             <Link
//               href={`tel:${settings.company.phone}` || "#"}
//               rel="nofollow"
//               target="_blank"
//             >
//               <Tooltip>
//                 <TooltipTrigger className="cursor-pointer">
//                   <PhoneIncoming />
//                 </TooltipTrigger>
//                 <TooltipContent>
//                   <p className="text-neutral-0">{settings.company.phone}</p>
//                 </TooltipContent>
//               </Tooltip>
//             </Link>
//           )}
//           {settings.company.email && (
//             <Link
//               href={`mailto:${settings.company.email}` || "#"}
//               rel="nofollow"
//               target="_blank"
//             >
//               <Tooltip>
//                 <TooltipTrigger className="cursor-pointer">
//                   <AtSign />
//                 </TooltipTrigger>
//                 <TooltipContent>
//                   <p className="text-neutral-0">{settings.company.email}</p>
//                 </TooltipContent>
//               </Tooltip>
//             </Link>
//           )}
//         </section>
//       </Container>
//     </GradientBackgroundTwoColor>
//   );
// }
