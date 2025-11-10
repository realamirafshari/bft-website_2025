import UserInformation from "@/template/profilePage/UserInformation";

const Tabbar = async ({ session }) => {
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
          <div className="tab-content  p-4">Add New Phone Brand</div>

          <input
            type="radio"
            name="my_tabs_2"
            className="tab"
            aria-label=" Phone Model"
          />
          <div className="tab-content  p-4">Add New Phone Model</div>
        </>
      )}
    </div>
  );
};

export default Tabbar;
