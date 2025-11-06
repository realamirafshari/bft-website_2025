import Image from "next/image";
import samsung from "../../image/samsung.svg";
import xiaomi from "../../image/xiaomi.svg";
import huawei from "../../image/huawei.svg";
import Link from "next/link";

const PhoneBrandSection = () => {
  return (
    <div>
      <div className="divider mt-8 text-secondary-main">All Brands</div>
      <div className="flex  justify-between items-center mt-6">
        <Link href={"/"}>
          <Image src={samsung} width={150} />
        </Link>
        <Link href={"/"}>
          <Image src={xiaomi} width={150} />
        </Link>
        <Link href={"/"}>
          <Image src={huawei} width={150} />
        </Link>
      </div>
    </div>
  );
};

export default PhoneBrandSection;
