const UserInformation = async ({ session }) => {
  return (
    <div className="flex justify-center items-center">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full sm:w-xs  border p-4">
        <legend className="fieldset-legend">User Information</legend>

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={session.user.email}
          disabled
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={"............"}
          disabled
        />

        <button className="btn btn-disabled mt-4">Update Information</button>
      </fieldset>
    </div>
  );
};

export default UserInformation;
