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
    <footer className="w-full bg-base-300">
      <section className="flex flex-col border-b border-border justify-center items-center gap-6 py-12 px-4  ">
        <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl  ">
          Follow Us
        </h1>
        <p className="text-text font-medium text-lg text-center max-w-md">
          Stay connected with the latest updates and news
        </p>
        <div className="flex gap-6 text-3xl *:p-3 *:bg-white *:rounded-xl *:text-primary *:hover:text-primary *:hover:scale-110 *:transition-all *:duration-300">
          <Link href={"https://t.me/BrutalForensicTools"}>
            <FaTelegram />
          </Link>
          <Link href={"https://instagram.com/brutalforensics"}>
            <FaInstagram />
          </Link>
          <Link href={"#"}>
            <FaRegEnvelope />
          </Link>
          <Link href={"#"}>
            <FaXTwitter />
          </Link>
        </div>
      </section>

      {/* Main Footer Content */}
      <section className="py-12 px-4 mx-auto   ">
        <div className="flex flex-col lg:flex-row  justify-evenly gap-8">
          {/* Logo */}
          <div className=" flex justify-center lg:justify-start ">
            <div className="max-w-xs lg:max-w-md">
              <Image
                src={BftLogo}
                alt="BFT Logo"
                className="w-70 md:w-90 h-auto mx-auto"
              />
              <h1 className="mt-4 font-medium text-secondary-main w-70 md:w-90">
                Professional forensic tools for modern device analysis and
                recovery.
              </h1>
            </div>
          </div>

          {/* Quick Links */}
          <div className=" text-center lg:text-left">
            <h3 className="font-bold text-xl mb-6 pb-2 border-b-2 border-primary inline-block">
              Quick Access
            </h3>
            <div className="flex flex-col gap-3  *:text-text  *:hover:text-primary  *:transition-colors *:duration-300 *:font-medium *:py-1   ">
              <Link href={"#"}>Home</Link>
              <Link href={"#"}>Features</Link>
              <Link href={"#"}>Support Models</Link>
              <Link href={"#"}>Help Center</Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className=" text-center lg:text-left">
            <h3 className="font-bold text-xl  mb-6 pb-2 border-b-2 border-primary inline-block">
              Contact Info
            </h3>
            <div className="flex flex-col gap-3 text-text dark:text-gray-300">
              <p className="font-medium">Email: support@bft.com</p>
              <p className="font-medium">Telegram: @BrutalForensicTools</p>
              <p className="font-medium">Support: 24/7 Available</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary-main/10 p-6 flex flex-col md:flex-row text-center gap-4 justify-evenly font-medium">
        <h1>© {currentYear} BFT Team - All rights reserved</h1>
        <div className="*:px-2 *:text-primary">
          <Link href={"#"}>Privacy policy </Link>
          <Link href={"#"}>Terms of service </Link>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
