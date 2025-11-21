import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AddUser from "@/template/profilePage/AddUser";
import DownloadSoftwarePage from "@/template/profilePage/DownloadSoftwarePage";
import PhoneBrandsSetting from "@/template/profilePage/PhoneBrandsSetting";
import ResellersPage from "@/template/profilePage/Resellers";
import SupportModels from "@/template/profilePage/SupportModels";
import UpdateNews from "@/template/profilePage/UpdateNews";
import UserInformation from "@/template/profilePage/UserInformation";
import { getServerSession } from "next-auth";

const Tabbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="tabs tabs-border">
      <input
        type="radio"
        name="my_tabs"
        className="tab "
        aria-label="User Information"
        defaultChecked
      />
      <div className="tab-content  p-4">
        <UserInformation session={session} />
      </div>
      <input
        type="radio"
        name="my_tabs"
        className="tab "
        aria-label="Download Software"
      />
      <div className="tab-content  p-4">
        <DownloadSoftwarePage />
      </div>

      {session.user.role === "admin" && (
        <>
          <input
            type="radio"
            name="my_tabs"
            className="tab"
            aria-label="Add User"
          />
          <div className="tab-content  p-4">
            <AddUser />
          </div>
          <input
            type="radio"
            name="my_tabs"
            className="tab"
            aria-label="Phone Brand"
          />
          <div className="tab-content  p-4">
            <PhoneBrandsSetting />
          </div>

          <input
            type="radio"
            name="my_tabs"
            className="tab"
            aria-label=" Support Models"
          />
          <div className="tab-content  p-4">
            <SupportModels />
          </div>

          <input
            type="radio"
            name="my_tabs"
            className="tab"
            aria-label=" Update News"
          />
          <div className="tab-content  p-4">
            <UpdateNews />
          </div>

          <input
            type="radio"
            name="my_tabs"
            className="tab"
            aria-label="Resellers"
          />
          <div className="tab-content p-4">
            <ResellersPage />
          </div>
        </>
      )}
    </div>
  );
};

export default Tabbar;
