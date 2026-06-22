"use client";

import { useSession, signOut } from "@/lib/auth-client";

import {
  LayoutSideContentLeft,
  Briefcase,
  Envelope,
  Magnifier,
  QrCode,
  CreditCard,
} from "@gravity-ui/icons";

import { DollarSign, PlusCircle, Users, LogOut } from "lucide-react";

import { GoTasklist } from "react-icons/go";

import { Drawer } from "@heroui/react";

import Image from "next/image";
import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";

export function DashboardSidebar() {
  const { data: session, isPending } = useSession();

  const pathname = usePathname();
  const router = useRouter();

  if (isPending) {
    return <div>Loading...</div>;
  }

  const user = session?.user;

  const handleSignOut = async () => {
    await signOut();

    router.push("/");
  };

  const freelancerDashboardLinks = [
    {
      icon: QrCode,
      href: "/dashboard/freelancer",
      label: "Overview",
    },

    {
      icon: Magnifier,
      href: "/dashboard/freelancer/browse-tasks",
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
      label: "Projects",
    },

    {
      icon: DollarSign,
      href: "/dashboard/freelancer/earnings",
      label: "Earnings",
    },
  ];

  const clientDashboardLinks = [
    {
      icon: QrCode,
      href: "/dashboard/client",
      label: "Overview",
    },

    {
      icon: GoTasklist,
      href: "/dashboard/client/tasks",
      label: "My Tasks",
    },

    {
      icon: PlusCircle,
      href: "/dashboard/client/tasks/new-task",
      label: "Post Task",
    },

    {
      icon: Envelope,
      href: "/dashboard/client/proposals",
      label: "Proposals",
    },

    {
      icon: DollarSign,
      href: "/dashboard/client/payments",
      label: "Payments",
    },
  ];

  const adminDashboardLinks = [
    {
      icon: QrCode,
      href: "/dashboard/admin",
      label: "Overview",
    },

    {
      icon: Users,
      href: "/dashboard/admin/users",
      label: "Users",
    },

    {
      icon: GoTasklist,
      href: "/dashboard/admin/tasks",
      label: "Tasks",
    },

    {
      icon: CreditCard,
      href: "/dashboard/admin/payments",
      label: "Payments",
    },
  ];

  const navLinksMap = {
    freelancer: freelancerDashboardLinks,

    client: clientDashboardLinks,

    admin: adminDashboardLinks,
  };

  const navItems = navLinksMap[user?.role || "freelancer"];

  // Reusable sidebar content

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Logo */}

      <div className="mb-8">
        <Link href="/">
          <Image src="/images/logo1.png" alt="logo" width={120} height={120} />
        </Link>
      </div>

      {/* Menu */}

      <div className="flex-1 overflow-y-auto">
        <nav className="space-y-2">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`
                  
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-2xl
                  text-sm
                  font-medium
                  transition-all
                  
                  ${
                    active
                      ? `
                      bg-gradient-to-r
                      from-cyan-500
                      to-purple-600
                      text-white
                      shadow-lg
                      `
                      : `
                      text-gray-600
                      hover:bg-gradient-to-r
                      hover:from-cyan-50
                      hover:to-purple-50
                      hover:text-cyan-600
                      `
                  }
                  
                `}
              >
                <item.icon className="size-5" />

                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom User */}

      <div
        className="
        mt-auto
        border-t
        pt-5
      "
      >
        <div
          className="
          flex
          items-center
          justify-between
        "
        >
          <div className="flex items-center gap-3">
            {user?.image ? (
              <Image
                src={user.image}
                alt="user"
                width={45}
                height={45}
                className="
                rounded-full
                border-2
                border-cyan-400
              "
              />
            ) : (
              <div
                className="
                h-11
                w-11
                rounded-full
                bg-gradient-to-r
                from-cyan-500
                to-purple-600
                text-white
                flex
                items-center
                justify-center
                font-bold
              "
              >
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>
            )}

            <div>
              <p className="font-semibold text-sm">{user?.name}</p>

              <span
                className="
                text-xs
                px-2
                py-1
                rounded-full
                bg-gradient-to-r
                from-cyan-100
                to-purple-100
                text-purple-700
                capitalize
              "
              >
                {user?.role}
              </span>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="
            p-2
            rounded-lg
            hover:bg-gradient-to-r
            hover:from-cyan-50
            hover:to-purple-50
            hover:text-purple-600
            transition
          "
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Button */}

      <div
        className="
        fixed
        top-4
        left-4
        z-50
        lg:hidden
      "
      >
        <Drawer>
          <Drawer.Trigger
            className="
            p-3
            rounded-xl
            bg-gradient-to-r
            from-cyan-500
            to-purple-600
            text-white
            shadow-lg
          "
          >
            <LayoutSideContentLeft />
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

      {/* Desktop Sidebar */}

      <aside
        className="
        hidden
        lg:flex
        h-screen
        w-72
        border-r
        px-5
        py-5
        bg-white
      "
      >
        <SidebarContent />
      </aside>
    </>
  );
}
