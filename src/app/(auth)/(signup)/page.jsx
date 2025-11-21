import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Signup from "@/template/authPage/Signup";
import { metadataConfig } from "@/utils/metadataConfig";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export const metadata = metadataConfig.signup;
const SignupPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");
  return (
    <div>
      <Signup />
    </div>
  );
};

export default SignupPage;
