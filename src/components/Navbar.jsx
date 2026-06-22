"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";
import { Menu, X } from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session } = useSession();

  const user = session?.user;

  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut();
  };

  const navLinks = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Browse Tasks",
      href: "/browse-tasks",
    },
    {
      label: "Browse Freelancers",
      href: "/browse-freelancers",
    },
  ];

  const dashboardLinks = {
    freelancer: "/dashboard/freelancer",
    client: "/dashboard/client",
    admin: "/dashboard/admin",
  };

  if (user?.email) {
    navLinks.push({
      label: "Dashboard",
      href:
        dashboardLinks[
          user?.role || "freelancer"
        ],
    });
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100">

      <div className="max-w-7xl mx-auto px-">

        <div className="relative flex h-20 items-center justify-between">

          
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
          {/* CENTER MENU */}

          <div
            className="
            hidden
            lg:block
            absolute
            left-1/2
            -translate-x-1/2
          "
          >
            <ul
              className="
              flex
              items-center
              gap-2
              rounded-full
              border
              bg-white
              px-3
              py-2
              shadow-sm
            "
            >
              {navLinks.map((link) => {

                const active =
                  pathname === link.href;

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`
                      rounded-full
                      px-5
                      py-2
                      text-sm
                      font-medium
                      transition-all
                      duration-300
                      
                      ${
                        active
                          ? `
                          bg-gradient-to-r
                          from-cyan-500
                          to-purple-600
                          text-white
                          shadow-md
                          `
                          : `
                          text-gray-700
                          hover:bg-gradient-to-r
                          hover:from-cyan-500
                          hover:to-purple-600
                          hover:text-white
                          `
                      }
                    `}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* RIGHT AUTH */}

          <div className="hidden lg:flex items-center gap-4 z-10">

            {user ? (
              <>
                <div className="flex items-center gap-3">

                  {user?.image ? (
                    <Image
                      src={user.image}
                      alt="user"
                      width={42}
                      height={42}
                      className="
                      rounded-full
                      border-2
                      border-cyan-400
                    "
                    />
                  ) : (
                    <div
                      className="
                      h-10
                      w-10
                      rounded-full
                      bg-purple-600
                      text-white
                      flex
                      items-center
                      justify-center
                      font-bold
                    "
                    >
                      {user?.name
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>
                  )}

                  <div>
                    <p className="font-semibold text-sm">
                      {user?.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handleSignOut}
                  className="
                  bg-gradient-to-r
                  from-cyan-500
                  to-purple-600
                  text-white
                "
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="
                  text-sm
                  font-medium
                  text-gray-700
                  hover:text-cyan-600
                "
                >
                  Sign In
                </Link>

                <Link
                  href="/signup"
                  className="
                  rounded-xl
                  px-5
                  py-3
                  bg-gradient-to-r
                  from-cyan-500
                  to-purple-600
                  text-white
                  font-medium
                  hover:scale-105
                  transition
                "
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* MOBILE BUTTON */}

          <button
            onClick={() =>
              setIsMenuOpen(
                !isMenuOpen
              )
            }
            className="lg:hidden"
          >
            {isMenuOpen ? (
              <X />
            ) : (
              <Menu />
            )}
          </button>

        </div>
      </div>
      {/* MOBILE MENU */}

<div
  className={`
    lg:hidden
    overflow-hidden
    transition-all
    duration-300
    ${
      isMenuOpen
        ? "max-h-[500px] opacity-100 mt-4"
        : "max-h-0 opacity-0"
    }
  `}
>
  <div
    className="
    rounded-3xl
    border
    border-gray-200
    bg-white
    shadow-lg
    p-4
    space-y-2
  "
  >
    {navLinks.map((link) => {
      const active =
        pathname === link.href;

      return (
        <Link
          key={link.href}
          href={link.href}
          onClick={() =>
            setIsMenuOpen(false)
          }
          className={`
            block
            rounded-xl
            px-4
            py-3
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
                `
                : `
                text-gray-700
                hover:bg-cyan-50
                `
            }
          `}
        >
          {link.label}
        </Link>
      );
    })}

    {/* Auth section */}

    <div className="border-t pt-4 mt-4">

      {user ? (
        <div className="space-y-4">

          <div className="flex items-center gap-3">

            {user?.image ? (
              <Image
                src={user.image}
                alt="user"
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <div
                className="
                h-10
                w-10
                rounded-full
                bg-gradient-to-r
                from-cyan-500
                to-purple-600
                flex
                items-center
                justify-center
                text-white
                font-bold
              "
              >
                {user?.name
                  ?.charAt(0)
                  .toUpperCase()}
              </div>
            )}

            <div>
              <p className="font-medium">
                {user?.name}
              </p>

              <p className="text-xs text-gray-500">
                {user?.email}
              </p>
            </div>

          </div>

          <Button
            onClick={handleSignOut}
            className="
            w-full
            bg-gradient-to-r
            from-cyan-500
            to-purple-600
            text-white
          "
          >
            Sign Out
          </Button>
        </div>
      ) : (
        <div className="space-y-3">

          <Link
            href="/signin"
            className="
            block
            text-center
            border
            rounded-xl
            py-3
          "
          >
            Sign In
          </Link>

          <Link
            href="/signup"
            className="
            block
            text-center
            py-3
            rounded-xl
            text-white
            bg-gradient-to-r
            from-cyan-500
            to-purple-600
          "
          >
            Get Started
          </Link>

        </div>
      )}

    </div>
  </div>
</div>
    </nav>
  );
}