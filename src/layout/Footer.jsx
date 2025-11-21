import Link from "next/link";
import BftLogo from "../image/BFTLogo.svg";
import {
  FaTelegram,
  FaInstagram,
  FaRegEnvelope,
  FaXTwitter,
} from "react-icons/fa6";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
        <aside>
          <Image width={200} height={60} alt="logo BFT" src={BftLogo} />
          <h1 className=" text-secondary-main w-50 md:w-60">
            Professional forensic tools for modern device analysis and recovery.
          </h1>
        </aside>
        <nav>
          <h6 className="footer-title">Quick Access</h6>
          <Link className="link link-hover" href={"/"}>
            Home
          </Link>
          <Link className="link link-hover" href={"/models"}>
            Support Models
          </Link>
          <Link className="link link-hover" href={"/whats-new"}>
            Whats New
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">Contact Info</h6>
          <Link
            className="link link-hover"
            href={"https://t.me/BrutalForensicTools"}
          >
            Telegram
          </Link>
          <Link
            className="link link-hover"
            href={"https://instagram.com/brutalforensics"}
          >
            Instagram
          </Link>
          <Link
            className="link link-hover"
            href="mailto:brutalforensictool@gmail.com?subject=Hello&body=Hi there!"
          >
            Email
          </Link>

          <Link
            className="link link-hover"
            href={"https://x.com/brutalforensic"}
          >
            X - (Twitte)
          </Link>
          <Link
            className="link link-hover"
            href={"https://www.youtube.com/@brutalforensictoolteam"}
          >
            Youtube
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
      <h1 className="h-12 flex justify-center items-center">
        © {currentYear} BFT Team - All rights reserved
      </h1>
    </>
  );
};

export default Footer;
