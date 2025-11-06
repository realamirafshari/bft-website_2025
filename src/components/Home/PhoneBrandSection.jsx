import Image from "next/image";
import samsung from "../../image/samsung.svg";
import xiaomi from "../../image/xiaomi.svg";
import huawei from "../../image/huawei.svg";
import Link from "next/link";

const PhoneBrandSection = () => {
  return (
    <div>
      <div className="divider mt-8 text-secondary-main">All Brands</div>
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 mt-6 px-4 items-center">
        <Link href="/">
          <Image src={samsung} width={150} alt="Samsung logo" className="mx-auto" />
        </Link>

        <Link href="/">
          <Image src={xiaomi} width={150} alt="Xiaomi logo" className="mx-auto" />
        </Link>

        <Link href="/">
          <Image src={huawei} width={150} alt="Huawei logo" className="mx-auto" />
        </Link>
      </div>
    </div>
  );
};

export default PhoneBrandSection;
