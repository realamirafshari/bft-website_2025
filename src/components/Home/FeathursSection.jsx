import Image from "next/image";
import xiaomiPhones from "../../image/xiaomi_phones.svg";
import laptopPhone from "../../image/mobile_laptop.png";
import phoneLayer from "../../image/phoneLayer.png";
import SectionTitle from "./SectionTitle";

const FeaturesSection = () => {
  return (
    <section className="relative py-12">
      <div className=" container mx-auto">
        <SectionTitle titleText={"Everything You Need"} />

        <div className="flex flex-col gap-8 p-4  mx-auto mt-6">
          <div className=" border border-border rounded-3xl p-8 transition-all duration-500 overflow-hidden">
            <div className=" flex flex-col lg:flex-row items-center gap-8">
              {/* Text Content */}
              <div className="flex-1">
                <div className="mb-6">
                  <h1 className="font-black text-2xl md:text-3xl text-primary-main mb-3">
                    Extensive Device Compatibility
                  </h1>
                  <div className="w-48 h-1 bg-secondary-main rounded-full mb-4"></div>
                  <p className="text-text leading-relaxed text-lg">
                    BFT Tool supports thousands of device models, with new ones
                    added regularly. Every feature is rigorously tested to
                    ensure a stable, fast, and trouble-free experience. Fully
                    compatible with Xiaomi devices powered by MTK (Dimensity &
                    Helio) processors. Engineered for high performance with an
                    extremely low system footprint.
                  </p>
                </div>

                {/* Feature Points */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[var(--color-secondary-main)] rounded-full"></div>
                    <span className="text-[var(--color-text)] font-medium">
                      Thousands of device models
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[var(--color-secondary-main)] rounded-full"></div>
                    <span className="text-[var(--color-text)] font-medium">
                      Regular updates
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[var(--color-secondary-main)] rounded-full"></div>
                    <span className="text-[var(--color-text)] font-medium">
                      MTK processor support
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[var(--color-secondary-main)] rounded-full"></div>
                    <span className="text-[var(--color-text)] font-medium">
                      Low system footprint
                    </span>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="flex-1 flex justify-center">
                <Image
                  src={xiaomiPhones}
                  alt="Xiaomi phones compatibility"
                  className="w-full max-w-md  "
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <section className="lg:w-1/2  border border-border rounded-2xl px-6 pt-6 transition-all duration-300 group overflow-hidden">
              <div className="flex flex-col h-full">
                <div className="flex-1">
                  <h3 className="font-bold text-2xl text-primary-main mb-4">
                    Simple, Smart, Always Ready
                  </h3>
                  <div className="w-48 h-1 bg-primary-main rounded-full mb-4"></div>

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

            <section className="lg:w-1/2 border border-border rounded-2xl p-6 overflow-hidden">
              <div className="flex flex-col h-full">
                <div className="flex-1 text-primary-main">
                  <h3 className="font-black text-xl md:text-2xl mb-4 leading-tight">
                    Unlocks screen, file-based encryption (FBE) full-disk
                    encryption (FDE) and decrypts user passwords.
                  </h3>
                  <div className="w-48 h-1 bg-primary-main/50 rounded-full mb-4"></div>
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
