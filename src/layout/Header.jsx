"use client";
import Image from "next/image";
import Logo from "../image/BFTLogo.svg";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LuSunMedium, LuMoon, LuMenu } from "react-icons/lu";

import NotificationHeader from "@/components/Home/NotificationHeader";
import { useSession } from "next-auth/react";

const Header = () => {
  const { data } = useSession();
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const themeHandler = (e) => {
    setTheme(e.target.checked ? "light" : "dark");
  };

  return (
    <>
      <header className="navbar bg-base-100 border-b border-base-300 py-4 px-6 md:px-12 transition-all">
        <div className="navbar-start">
          <div className="dropdown ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden mr-2"
            >
              <LuMenu className="text-2xl" />
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-lg dropdown-content bg-base-100 rounded-box z-1 mt-4 w-52 p-4 shadow *:my-2 *:font-medium *:hover:text-primary"
            >
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/models">Support Model</Link>
              </li>
              <li>
                <Link href="/whats-new">Whats New</Link>
              </li>
              <div className="divider"></div>
              {data ? (
                <Link
                  className="btn btn-outline w-full btn-primary hover:text-primary-content "
                  href={"/profile"}
                >
                  Hello , {data.user.fullName}
                </Link>
              ) : (
                <Link href="/signin" className="btn btn-primary ">
                  Signin/Signup
                </Link>
              )}
            </ul>
          </div>

          <Link href="/">
            <Image src={Logo} width={200} height={60} alt="logo" />
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal menu-lg px-1 font-medium *:hover:text-primary">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/models">Support Model</Link>
            </li>
            <li>
              <Link href="/whats-new">Whats New</Link>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              onChange={themeHandler}
              checked={theme === "light"}
            />

            <LuSunMedium className="swap-on text-3xl" />
            <LuMoon className="swap-off text-3xl" />
          </label>
          {data ? (
            <Link
              className="btn btn-outline btn-primary hover:text-primary-content hidden lg:flex ml-4"
              href={"/profile"}
            >
              Hello , {data.user.fullName}
            </Link>
          ) : (
            <Link
              href="/signin"
              className="btn btn-primary hidden lg:flex ml-4 "
            >
              Signin/Signup
            </Link>
          )}
        </div>
      </header>

      <NotificationHeader />
    </>
  );
};

export default Header;
