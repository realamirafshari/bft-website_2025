"use client";
import Image from "next/image";
import Logo from "../image/BFTLogo.svg";
import Link from "next/link";
import { useState } from "react";
import { RiMenu4Line } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openHandler = () => setIsOpen((prev) => !prev);

  return (
    <>
      <header className="flex bg-white justify-evenly px-4 py-4 items-center relative">
        {/* Logo */}
        <div className="">
          <Image src={Logo} width={200} height={60} alt="BFT Logo" />
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-10">
          <ul className="flex flex-row gap-10 text-lg *:hover:text-secondary-main *:transition-all ">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/support-models">Support Models</Link>
            </li>
            <li>
              <Link href="/news">News</Link>
            </li>
            <li>
              <Link href="/help-center">Help</Link>
            </li>
          </ul>
          <Link
            href={"/signin"}
            className="btn bg-primary-main text-primary-light border-none hover:bg-primary-hover transition-all"
          >
            Signin / Signup
          </Link>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="absolute top-0 left-0 w-1/2 flex flex-col gap-8 bg-white min-h-screen p-6 shadow-xl lg:hidden z-50">
            <ul className="flex flex-col gap-2 text-xl  *:rounded-xl *:hover:bg-base-300 *:hover:cursor-pointer *:p-4 *:hover:text-secondary-main *:transition-all ">
              <Link href="/">Home</Link>

              <Link href="/support-models">Support Models</Link>

              <Link href="/news">News</Link>

              <Link href="/help-center">Help</Link>
            </ul>
            <Link
              href={"/login"}
              className="btn bg-primary-main text-primary-light border-none"
            >
              Login / SignUp
            </Link>{" "}
          </nav>
        )}

        {/* Mobile Toggle Button */}
        <div className="lg:hidden">
          <button className="btn text-xl bg-transparent shadow-none" onClick={openHandler}>
            {isOpen ? <MdOutlineClose /> : <RiMenu4Line />}
          </button>
        </div>
      </header>
      <section className="bg-secondary-light h-10 text-secondary-main text-center font-semibold p-8 flex justify-center items-center">
        Version 1.105 is now available! Read about the new features and fixes
        from September.
      </section>
    </>
  );
};

export default Header;
