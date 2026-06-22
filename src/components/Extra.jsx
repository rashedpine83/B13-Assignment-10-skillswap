 {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center rounded-lg p-2 text-white transition hover:bg-white/10 md:hidden"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="border-t border-white/10 bg-[#0B0B0F] md:hidden">
          <div className="space-y-3 px-4 py-6">
            {/* Nav Links */}
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div className="border-t border-white/10 pt-4">
              <div className="flex flex-col gap-3">
                <Link
                  href="/signin"
                  className="rounded-xl px-4 py-3 text-base font-medium text-violet-400 transition hover:bg-white/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>

                <Link
                  href="/signup"
                  className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:scale-105 hover:bg-zinc-200"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

<div className="flex-shrink-0">
  <Link href="/" className="flex items-center gap-3">
    <div className="leading-none">
      <Image src="/images/logo.png" alt="logo" width={300} height={300} />
    </div>
  </Link>
</div>;







 {/* LOGO */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center gap-3">
            <div className="leading-none">
              <Image
                src="/images/logo1.png"
                alt="logo"
                width={200}
                height={200}
              />
            </div>
          </Link>
        </div>





"use client";
import { useSession } from "@/lib/auth-client";
// import { getUserSession } from "@/lib/core/session";
import {
  LayoutSideContentLeft,
  Briefcase,
  Envelope,
  Magnifier,
  QrCode,
  CreditCard,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { DollarSign, PlusCircle, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GoTasklist } from "react-icons/go";

export function DashboardSidebar() {
  // const user = getUserSession();
  const { data: session, isPending } = useSession();
  if (isPending) {
    return <div>Loading...</div>;
  }
  const user = session?.user;
  console.log(user);

  const freelancerDashboardLinks = [
    { icon: QrCode, href: "/dashboard/freelancer", label: "Overview" },
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
      label: "Active Projects",
    },
    {
      icon: DollarSign,
      href: "/dashboard/freelancer/earnings",
      label: "Earnings",
    },
    {
      icon: Users,
      href: "/dashboard/freelancer/edit-profile",
      label: "Edit Profile",
    },
  ];

  const clientDashboardLinks = [
    { icon: QrCode, href: "/dashboard/client", label: "Overview" },
    { icon: GoTasklist, href: "/dashboard/client/tasks", label: "My Tasks" },
    {
      icon: PlusCircle,
      href: "/dashboard/client/tasks/new-task",
      label: "Post Tasks",
    },
    {
      icon: Envelope,
      href: "/dashboard/client/proposals",
      label: "Proposals",
    },
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

  // const navContent = (
  //   <nav className="flex flex-col gap-1">
  //     {navItems.map((item) => (
  //       <Link
  //         key={item.label}
  //         className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
  //         href={item.href}
  //       >
  //         <item.icon className="size-5 text-muted" />
  //         {item.label}
  //       </Link>
  //     ))}
  //   </nav>
  // );

  // const navItems = [
  //   { icon: QrCode, href: "/dashboard/client", label: "Overview" },
  //   { icon: GoTasklist, href: "/dashboard/client/my-tasks", label: "My Tasks" },
  //   {
  //     icon: PlusCircle,
  //     href: "/dashboard/client/post-tasks",
  //     label: "Post Tasks",
  //   },
  //   {
  //     icon: Envelope,
  //     href: "/dashboard/client/proposals",
  //     label: "Proposals",
  //   },
  //   { icon: DollarSign, href: "/dashboard/client/payments", label: "Payments" },
  // ];

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          key={item.label}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          href={item.href}
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
        {/* LOGO */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center gap-3">
            <div className="leading-none">
              <Image
                src="/images/logo1.png"
                alt="logo"
                width={100}
                height={100}
              />
            </div>
          </Link>
        </div>
        {navContent}
      </aside>
      <Drawer>
        <Button className="lg:hidden" variant="secondary">
          <LayoutSideContentLeft />
          Sidebar
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}



import Link from "next/link";
import {
  FiArrowLeft,
  FiCalendar,
  FiDollarSign,
  FiClock,
  FiUser,
} from "react-icons/fi";

import { getSingleTask } from "@/lib/api/tasks";

const TaskDetailsPage = async ({ params }) => {
  const { id } = await params;

  const task = await getSingleTask(id);

  return (
    <div className="min-h-screen bg-gray-50 p-4">

      <div className="max-w-4xl mx-auto">

        {/* Back Button */}
        <Link
          href="/browse-tasks"
          className="
          inline-flex items-center gap-2 mb-4
          px-4 py-2
          rounded-lg
          bg-white
          border
          shadow-sm
          hover:border-cyan-400
          hover:text-cyan-600
          text-sm
          transition-all
          "
        >
          <FiArrowLeft size={16} />
          Back
        </Link>

        {/* Main Card */}
        <div
          className="
          bg-white
          rounded-3xl
          border
          border-gray-100
          shadow-lg
          p-5
          hover:shadow-cyan-100
          transition-all
          "
        >

          {/* Category + Status */}
          <div className="flex flex-wrap gap-2 mb-4">

            <span className="px-3 py-1 rounded-full bg-cyan-100 text-cyan-700 text-xs font-medium">
              {task.category}
            </span>

            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium capitalize">
              {task.status}
            </span>

          </div>

          {/* Title */}
          <h1
            className="
            text-2xl md:text-3xl font-bold
            bg-gradient-to-r from-cyan-500 to-purple-600
            bg-clip-text text-transparent
            "
          >
            {task.title}
          </h1>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3 mt-5">

            {/* Budget */}
            <div className="flex items-center gap-3 border rounded-xl p-3">
              <FiDollarSign className="text-cyan-500" />
              <div>
                <p className="text-xs text-gray-400">Budget</p>
                <p className="font-semibold text-cyan-600 text-sm">
                  ${task.budget}
                </p>
              </div>
            </div>

            {/* Deadline */}
            <div className="flex items-center gap-3 border rounded-xl p-3">
              <FiCalendar className="text-purple-500" />
              <div>
                <p className="text-xs text-gray-400">Deadline</p>
                <p className="font-medium text-sm">
                  {new Date(task.deadline).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Posted */}
            <div className="flex items-center gap-3 border rounded-xl p-3">
              <FiClock className="text-cyan-500" />
              <div>
                <p className="text-xs text-gray-400">Posted</p>
                <p className="text-sm font-medium">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Client */}
            <div className="flex items-center gap-3 border rounded-xl p-3">
              <FiUser className="text-purple-500" />
              <div>
                <p className="text-xs text-gray-400">Client</p>
                <p className="text-sm font-medium break-all">
                  {task.emailId}
                </p>
              </div>
            </div>

          </div>

          {/* Description */}
          <div className="mt-5 border-t pt-4">
            <h2 className="text-lg font-bold mb-2">
              Description
            </h2>

            <p className="text-gray-600 text-sm leading-6">
              {task.description}
            </p>
          </div>

          {/* Sign In Card */}
          <div
            className="
            mt-5
            rounded-2xl
            border
            border-gray-100
            bg-gradient-to-r
            from-cyan-50
            to-purple-50
            p-5
            hover:shadow-md
            hover:scale-[1.01]
            transition-all
            text-center
            "
          >
            <h3 className="text-lg font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
              Sign in as a freelancer to submit a proposal
            </h3>

            <p className="text-gray-500 text-xs mt-2">
              Login required to apply for this task
            </p>

            <Link href="/signin">
              <button
                className="
                mt-4
                px-6 py-2
                rounded-xl
                text-white
                text-sm
                font-medium
                bg-gradient-to-r
                from-cyan-500
                to-purple-600
                hover:scale-105
                transition-all
                "
              >
                Sign In
              </button>
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default TaskDetailsPage;