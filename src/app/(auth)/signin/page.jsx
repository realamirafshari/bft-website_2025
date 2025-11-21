import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Signin from "@/template/authPage/Signin";
import { metadataConfig } from "@/utils/metadataConfig";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export const metadata = metadataConfig.signin;
const SigninPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("profile");
  return (
    <div>
      <Signin />
    </div>
  );
};

export default SigninPage;
