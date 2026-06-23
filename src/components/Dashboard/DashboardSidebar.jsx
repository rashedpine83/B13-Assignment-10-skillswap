"use client";

import { useSession, signOut } from "@/lib/auth-client";

import {
  QrCode,
  Magnifier,
  Briefcase,
  Envelope,
  CreditCard,
} from "@gravity-ui/icons";

import { DollarSign, PlusCircle, Users } from "lucide-react";
import { GoTasklist } from "react-icons/go";
import { Drawer } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PiSignOutBold } from "react-icons/pi";
import { BiEdit } from "react-icons/bi";

/* ✅ SIMPLE 3-LINE HAMBURGER ICON */
function MenuIcon() {
  return (
    <div className="flex flex-col justify-center items-center gap-[4px]">
      <span className="w-6 h-[2px] bg-gray-800 rounded"></span>
      <span className="w-6 h-[2px] bg-gray-800 rounded"></span>
      <span className="w-6 h-[2px] bg-gray-800 rounded"></span>
    </div>
  );
}

export function DashboardSidebar() {
  const { data: session, isPending } = useSession();

  const pathname = usePathname();
  const router = useRouter();

  if (isPending) return "Loading...";

  const user = session?.user;

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const freelancerDashboardLinks = [
    { icon: QrCode, href: "/dashboard/freelancer", label: "Overview" },
    {
      icon: Magnifier,
      href: "/browse-tasks",
      label: "Browse Tasks",
    },
    {
      icon: Briefcase,
      href: "/dashboard/freelancer/my-proposals",
      label: "My Proposals",
    },
    {
      icon: Briefcase,
      href: "/dashboard/freelancer/active-projects",
      label: "Active Projects",
    },
    {
      icon: DollarSign,
      href: "/dashboard/freelancer/earnings",
      label: "Earnings",
    },
    {
      icon: BiEdit,
      href: "/dashboard/freelancer/profile",
      label: "Edit Profile",
    },
  ];

  const clientDashboardLinks = [
    { icon: QrCode, href: "/dashboard/client", label: "Overview" },
    { icon: GoTasklist, href: "/dashboard/client/tasks", label: "My Tasks" },
    {
      icon: PlusCircle,
      href: "/dashboard/client/tasks/new-task",
      label: "Post Task",
    },
    { icon: Envelope, href: "/dashboard/client/proposals", label: "Proposals" },
    { icon: DollarSign, href: "/dashboard/client/payments", label: "Payments" },
  ];

  const adminDashboardLinks = [
    { icon: QrCode, href: "/dashboard/admin", label: "Overview" },
    { icon: Users, href: "/dashboard/admin/users", label: "Users" },
    { icon: GoTasklist, href: "/dashboard/admin/tasks", label: "Tasks" },
    { icon: CreditCard, href: "/dashboard/admin/payments", label: "Payments" },
  ];

  const navLinksMap = {
    freelancer: freelancerDashboardLinks,
    client: clientDashboardLinks,
    admin: adminDashboardLinks,
  };

  const navItems = navLinksMap[user?.role || "freelancer"];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* LOGO */}
      <div className="flex-shrink-0 pt-6 pb-10 ">
        <Link href="/" className="flex items-center gap-3">
          <div className="leading-none">
            <Image
              src="/images/logo1.png"
              alt="logo"
              width={130}
              height={130}
            />
          </div>
        </Link>
      </div>
      {/* MENU */}
      <div className="flex-1 overflow-y-auto">
        <nav className="space-y-2">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all  ${
                  active
                    ? "bg-gradient-to-r from-cyan-200 to-purple-200  shadow-lg w-full"
                    : "text-gray-600 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-purple-50 hover:text-cyan-600"
                }`}
              >
                <item.icon className="size-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* USER */}
      <div className="mt-auto border-t pt-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {user?.image ? (
            <Image
              src={user.image}
              alt="user"
              width={45}
              height={45}
              className="rounded-full border-2 border-cyan-400"
            />
          ) : (
            <div className="h-11 w-11 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white flex items-center justify-center font-bold">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
          )}

          <div>
            <p className="font-semibold text-sm">{user?.name}</p>
            <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-cyan-100 to-purple-100 text-purple-700 capitalize">
              {user?.role}
            </span>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <PiSignOutBold className="text-purple-500 text-3xl" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex">
      {/* MOBILE TOP BAR (ONLY HAMBURGER ICON) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b flex items-center px-4 z-50">
        <Drawer>
          <Drawer.Trigger className="p-2 flex gap-3">
            <MenuIcon />
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent">
              Skillswap
            </h1>
          </Drawer.Trigger>

          <Drawer.Backdrop>
            <Drawer.Content placement="left" className="w-72">
              <Drawer.Dialog className="h-screen p-5">
                <SidebarContent />
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex h-screen w-72 border-r px-5 py-5 bg-white fixed left-0 top-0">
        <SidebarContent />
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 lg:ml-72 pt-16 lg:pt-0 p-4">
        {/* YOUR PAGE CONTENT */}
      </main>
    </div>
  );
}
