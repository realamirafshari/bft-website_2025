import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PhoneBrandsSetting from "@/template/profilePage/PhoneBrandsSetting";
import SupportModels from "@/template/profilePage/SupportModels";
import UserInformation from "@/template/profilePage/UserInformation";
import { getServerSession } from "next-auth";

const Tabbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="tabs tabs-border">
      <input
        type="radio"
        name="my_tabs_2"
        className="tab "
        aria-label="User Information"
        defaultChecked
      />
      <div className="tab-content  p-4">
        <UserInformation session={session} />
      </div>

      {session.user.role === "admin" && (
        <>
          <input
            type="radio"
            name="my_tabs_2"
            className="tab"
            aria-label="Phone Brand"
          />
          <div className="tab-content  p-4">
            <PhoneBrandsSetting />
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            className="tab"
            aria-label=" Support Models"
          />
          <div className="tab-content  p-4">
            <SupportModels />
          </div>
        </>
      )}
    </div>
  );
};

export default Tabbar;
