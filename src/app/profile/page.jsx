import { authOptions } from "../api/auth/[...nextauth]/route";
import Tabbar from "@/components/profilePage/Tabbar";
import SignOut from "@/template/authPage/SignOut";
import { FaUserLarge } from "react-icons/fa6";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { metadataConfig } from "@/utils/metadataConfig";

export const metadata = metadataConfig.profile;

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  return (
    <div className=" container mx-auto   py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-primary to-secondary rounded-2xl mb-4 shadow-lg">
            <FaUserLarge className="text-2xl text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent sm:text-5xl">
            Dashboard
          </h1>
        </div>

        {/* Main Card */}
        <div className=" ">
          {/* User Header Banner */}
          <div className=" flex flex-col">
            <div className=" flex flex-col ">
              <div className="flex flex-col md:flex-row justify-between mb-6 bg-linear-to-r from-primary via-primary/90 to-secondary px-4 py-6 rounded-3xl ">
                <div className="flex flex-col justify-center md:flex-row items-center gap-4">
                  <div className="avatar avatar-online w-20 h-20 bg-white/20  flex items-center justify-center backdrop-blur-sm border-2 border-primary rounded-full">
                    <div className="w-24 rounded-full flex justify-center items-center">
                      <span className="text-2xl font-bold text-white">
                        {(session.user.userID || "User")
                          .charAt(0)
                          .toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1 text-center md:text-start">
                    <h2 className="text-2xl font-bold text-white">
                      {session.user.userID || "Bft User"} , Welcome
                    </h2>

                    <SignOut />
                  </div>
                </div>
              </div>

              <Tabbar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
