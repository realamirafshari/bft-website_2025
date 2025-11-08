import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Signin from "@/template/authPage/Signin";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const SigninPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");
  return (
    <div>
      <Signin />
    </div>
  );
};

export default SigninPage;
