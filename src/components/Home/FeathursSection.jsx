import Image from "next/image";
import xiaomiPhones from "../../image/xiaomi_phones.svg";
import laptopPhone from "../../image/mobile_laptop.png";
import phoneLayer from "../../image/phoneLayer.png";
import SectionTitle from "./SectionTitle";

const FeaturesSection = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto">
        <section className="">
          <div className="container mx-auto">
            <SectionTitle titleText={"Powerful Features"} />

            {/* Main Highlight Features Section */}
            <div className="mt-12">

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
                {/* Feature 1 */}
                <div className="group  rounded-2xl border-2 border-secondary/20 transition-all duration-500  overflow-hidden">
                  <div className="p-8">
                    <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center mb-6">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-black text-secondary mb-4">
                      Find Second Space User Lock
                    </h3>
                    <div className="w-20 h-1 bg-secondary rounded-full mb-4"></div>
                    <p className="text-text leading-relaxed">
                      Discover and access hidden user profiles and second space
                      locks with advanced detection algorithms. BFT identifies
                      all user partitions and security layers.
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="group  rounded-2xl border-2 border-secondary/20 transition-all duration-500  overflow-hidden ">
                  <div className="p-8">
                    <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center mb-6 transition-transform duration-300">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-black text-secondary mb-4">
                      Fast Password Unlock
                    </h3>
                    <div className="w-20 h-1 bg-secondary rounded-full mb-4"></div>
                    <p className="text-text leading-relaxed">
                      Unlock phone passwords without opening the device or
                      reading full dumps. Our advanced algorithms bypass
                      security at unprecedented speeds.
                    </p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                        <span className="text-text">
                          No physical access required
                        </span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                        <span className="text-text">
                          Bypasses all security layers
                        </span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                        <span className="text-text">
                          Works on latest Android versions
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="group  rounded-2xl border-2 border-secondary/20 transition-all duration-500  overflow-hidden ">
                  <div className="p-8">
                    <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center mb-6 ">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-black text-secondary mb-4">
                      Full Encryption Support
                    </h3>
                    <div className="w-20 h-1 bg-secondary rounded-full mb-4"></div>
                    <p className="text-text leading-relaxed">
                      Handle both File-Based Encryption (FBE) and Full-Disk
                      Encryption (FDE) with ease. BFT decrypts user passwords
                      without compromising data integrity.
                    </p>
                    <div className="mt-4 inline-block bg-secondary/10 text-secondary font-semibold px-4 py-2 rounded-lg">
                      Android 9-13 Supported
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="flex flex-col gap-8 p-4 mx-auto ">
          {/* MAIN FEATURE BOX */}
          <div className="border-2 border-secondary/20 rounded-3xl p-8 transition-all duration-500 overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Text Content */}
              <div className="flex-1">
                <div className="mb-6">
                  <h1 className="font-black text-2xl md:text-3xl text-secondary mb-3">
                    Extensive Device Compatibility
                  </h1>
                  <div className="w-48 h-1 bg-secondary/50 rounded-full mb-4"></div>

                  <p className="text-text leading-relaxed text-lg">
                    BFT Tool supports thousands of device models, with new ones
                    added regularly. Every feature is rigorously tested to
                    ensure a stable, fast, and trouble-free experience. Fully
                    compatible with Xiaomi devices powered by MTK (Dimensity &
                    Helio) processors. Engineered for high performance with an
                    extremely low system footprint.
                    <span className="font-bold text-secondary">
                      Also includes advanced security bypass technologies such
                      as detecting and unlocking Second Space user lock, and
                      unlocking phone passwords without reading the dump
                    </span>{" "}
                    ultra fast and without opening the device.
                  </p>
                </div>

                {/* Feature Points */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span className="text-secondary font-medium">
                      Thousands of device models
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span className="text-secondary font-medium">
                      Regular updates
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span className="text-secondary font-medium">
                      MTK processor support
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span className="text-secondary font-medium">
                      Low system footprint
                    </span>
                  </div>

                  {/* NEW FEATURES */}
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span className="text-secondary font-medium">
                      Detect & unlock Second Space user lock
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span className="text-secondary font-medium">
                      Unlock password without dump (ultra-fast)
                    </span>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="flex-1 flex justify-center">
                <Image
                  src={xiaomiPhones}
                  alt="Xiaomi phones compatibility"
                  className="w-full max-w-md"
                />
              </div>
            </div>
          </div>

          {/* BOTTOM TWO CARDS */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* CARD 1 */}
            <section className="lg:w-1/2 border-2 border-secondary/20 rounded-2xl px-6 pt-6 transition-all duration-300 group overflow-hidden">
              <div className="flex flex-col h-full">
                <div className="flex-1">
                  <h3 className="font-bold text-2xl text-secondary mb-4">
                    Simple, Smart, Always Ready
                  </h3>
                  <div className="w-48 h-1 bg-secondary/50 rounded-full mb-4"></div>

                  <p className="text-text leading-relaxed mb-6 ">
                    BFT is designed to give you a seamless, hassle-free
                    experience from the very first click. Everything you need is
                    right where you expect it to be. With continuous
                    improvements, fast updates, and reliable performance, you
                    can count on BFT to stay ahead of every challenge. No
                    complicated setup, no extra hardware. Just install BFT and
                    start working — it's that easy.
                  </p>
                </div>
                <div className="flex justify-center">
                  <Image
                    src={laptopPhone}
                    alt="Laptop and phone interface"
                    className="w-full max-w-sm transform"
                  />
                </div>
              </div>
            </section>

            {/* CARD 2 */}
            <section className="lg:w-1/2 border-2 border-secondary/20 rounded-2xl p-6 overflow-hidden">
              <div className="flex flex-col h-full">
                <div className="flex-1">
                  <h3 className="font-black text-secondary text-xl md:text-2xl mb-4 leading-tight">
                    Unlocks screen, file-based encryption (FBE), full-disk
                    encryption (FDE) and decrypts user passwords.
                  </h3>
                  <div className="w-48 h-1 bg-secondary/50 rounded-full mb-4"></div>

                  <p className="leading-relaxed mb-6 text-text">
                    BFT is optimized for Xiaomi MTK phones, supporting Android
                    13 - 9 (up to MIUI 14). No need to read the full dump — it's
                    fast, lightweight, and doesn't require much storage space.
                    Runs smoothly without interruptions or bad sector issues,
                    even on 128GB and 256GB UFS storage.
                  </p>
                </div>

                <div className="flex justify-center">
                  <Image
                    src={phoneLayer}
                    alt="Phone layer structure"
                    className="w-full max-w-sm transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
