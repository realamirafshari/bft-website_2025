"use client";
import Image from "next/image";
import Logo from "../image/BFTLogo.svg";
import Link from "next/link";
import { useState } from "react";
import { RiMenu4Line } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
import NotificationHeader from "@/components/Home/NotificationHeader";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openHandler = () => setIsOpen((prev) => !prev);

  return (
    <>
      <header className="  flex bg-white justify-between px-6 md:px-12 py-4 items-center relative transition-all shadow-sm border-b border-border">
        {/* Logo */}
        <Link href={"/"}>
          <Image
            src={Logo}
            width={200}
            height={60}
            alt="BFT Logo"
            className="drop-shadow-sm"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex flex-row gap-8 text-lg font-medium">
            <li>
              <Link
                href="/"
                className="text-text hover:text-secondary-main transition-all duration-300 relative py-2 group"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary-main transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                href="/support-models"
                className="text-text hover:text-secondary-main transition-all duration-300 relative py-2 group"
              >
                Support Models
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary-main transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                href="/news"
                className="text-text hover:text-secondary-main transition-all duration-300 relative py-2 group"
              >
                News
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sectext-secondary-main transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                href="/help-center"
                className="text-text hover:text-secondary-main transition-all duration-300 relative py-2 group"
              >
                Help
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sectext-secondary-main transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          </ul>
          <Link
            href={"/signin"}
            className="px-6 py-3 bg-primary-main text-surface rounded-xl font-semibold hover:bg-primary-hover transition-all duration-300"
          >
            Signin / Signup
          </Link>
        </nav>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={openHandler}
          />
        )}

        {/* Mobile Menu */}
        <nav
          className={`fixed top-0 left-0 w-80 h-full flex flex-col gap-8 bg-white p-8 shadow-2xl lg:hidden z-50 transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Close Button */}
          <div className="flex justify-between items-center mb-8">
            <Image src={Logo} width={160} height={48} alt="BFT Logo" />
            <button
              className="p-2 rounded-lg hover:bg-surface  transition-colors"
              onClick={openHandler}
            >
              <MdOutlineClose className="text-2xl text-text" />
            </button>
          </div>

          <ul className="flex flex-col gap-2 flex-1">
            <li>
              <Link
                href="/"
                onClick={openHandler}
                className="flex items-center p-4 rounded-xl text-text hover:bg-surface hover:text-secondary-main transition-all duration-300 font-medium border border-transparent hover:border-border"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/support-models"
                onClick={openHandler}
                className="flex items-center p-4 rounded-xl text-text hover:bg-surface hover:text-secondary-main transition-all duration-300 font-medium border border-transparent hover:border-border"
              >
                Support Models
              </Link>
            </li>
            <li>
              <Link
                href="/news"
                onClick={openHandler}
                className="flex items-center p-4 rounded-xl text-text hover:bg-surface hover:text-secondary-main transition-all duration-300 font-medium border border-transparent hover:border-border"
              >
                News
              </Link>
            </li>
            <li>
              <Link
                href="/help-center"
                onClick={openHandler}
                className="flex items-center p-4 rounded-xl text-text hover:bg-surface hover:text-secondary-main transition-all duration-300 font-medium border border-transparent hover:border-border"
              >
                Help Center
              </Link>
            </li>
          </ul>

          <div className="pt-4 border-t border-border">
            <Link
              href={"/signin"}
              onClick={openHandler}
              className="w-full px-6 py-4 bg-primary-main text-surface rounded-xl font-semibold hover:bg-primary-hover transition-all duration-300 text-center block"
            >
              Signin / Signup
            </Link>
          </div>
        </nav>

        {/* Mobile Toggle Button */}
        <div className="lg:hidden">
          <button
            className="p-3 rounded-xl hover:bg-surface transition-colors duration-300 border border-border"
            onClick={openHandler}
          >
            {isOpen ? (
              <MdOutlineClose className="text-2xl" />
            ) : (
              <RiMenu4Line className="text-2xl" />
            )}
          </button>
        </div>
      </header>
      <NotificationHeader />
    </>
  );
};

export default Header;
