"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LuShieldCheck, LuUserRound, LuSearch } from "react-icons/lu";

const AddUser = () => {
  const [userID, setUserID] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [isVerified, setIsVerified] = useState(true);

  const [userList, setUserList] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // 👈 New search state

  const usersPerPage = 15;

  // Fetch users list
  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users when search term changes
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(userList);
    } else {
      const filtered = userList.filter(user =>
        user.userID?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
    setCurrentPage(1); // Reset to first page when searching
  }, [searchTerm, userList]);

  const fetchUsers = () => {
    setIsLoading(true);
    fetch("/api/auth/user")
      .then((res) => res.json())
      .then((data) => {
        setUserList(data);
        setFilteredUsers(data);
      })
      .catch((err) => toast.error("Failed to fetch users"))
      .finally(() => setIsLoading(false));
  };

  // Submit new user
  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const method = editingUserId ? "PATCH" : "POST";
      const url = editingUserId ? `/api/auth/user/${editingUserId}` : "/api/auth/user";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userID,
          fullName,
          email: email || `${userID}@example.com`,
          password: password || undefined, // Only send password if provided
          role,
          isVerified,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Error");
        return;
      }

      toast.success(
        editingUserId
          ? "User updated successfully"
          : "User created successfully"
      );

      // Refresh users list
      fetchUsers();

      // Reset form
      resetForm();
    } catch {
      toast.error("Network error");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setUserID("");
    setFullName("");
    setEmail("");
    setPassword("");
    setRole("user");
    setIsVerified(true);
    setEditingUserId(null);
  };

  // Simple pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const deleteHandler = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      const res = await fetch(`/api/auth/user/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Error deleting user");
        return;
      }

      toast.success("User deleted successfully");
      fetchUsers(); // Refresh the list
    } catch (err) {
      toast.error("Network error");
      console.error(err);
    }
  };

  const editHandler = (user) => {
    setEditingUserId(user._id);
    setUserID(user.userID);
    setFullName(user.fullName);
    setEmail(user.email);
    setRole(user.role);
    setIsVerified(user.isVerified);
    setPassword(""); // Clear password field for safety
  };

  const cancelEdit = () => {
    resetForm();
  };

  return (
    <div className="min-h-screen mt-4">
      <div className="mx-auto">
        {/* Main Card */}
        <div className="">
          <div className="">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                User Management
              </h1>
              <p className="text-lg max-w-2xl mx-auto">
                Create and manage user accounts seamlessly
              </p>
            </div>

            {/* Add/Edit User Form */}
            <div className="mb-12">
              <div className="rounded-xl border border-base-300 bg-base-100">
                <div className="p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h1 className="text-xl md:text-2xl font-bold">
                      {editingUserId ? "Edit User" : "Add New User"}
                    </h1>
                    {editingUserId && (
                      <button
                        onClick={cancelEdit}
                        className="btn btn-ghost btn-sm"
                      >
                        Cancel Edit
                      </button>
                    )}
                  </div>

                  <form onSubmit={submitHandler} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* User ID Field */}
                      <div className="space-y-2">
                        <label className="flex items-center text-sm font-semibold">
                          User ID
                          <span className="text-error ml-1">*</span>
                        </label>
                        <input
                          type="text"
                          value={userID}
                          onChange={(e) => setUserID(e.target.value)}
                          placeholder="Enter user ID"
                          className="w-full px-4 py-3 border border-base-300 outline-none rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-base-200"
                          required
                        />
                      </div>

                      {/* Full Name Field */}
                      <div className="space-y-2">
                        <label className="flex items-center text-sm font-semibold">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Enter full name"
                          className="w-full px-4 py-3 border border-base-300 outline-none rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-base-200"
                        />
                      </div>

                      {/* Email Field */}
                      <div className="space-y-2">
                        <label className="text-sm font-semibold">Email</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter email address"
                          className="w-full px-4 py-3 border border-base-300 outline-none rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-base-200"
                        />
                        <p className="text-xs text-warning">
                          {!email && "If not provided, will be auto-generated"}
                        </p>
                      </div>

                      {/* Password Field */}
                      <div className="space-y-2">
                        <label className="flex items-center text-sm font-semibold">
                          Password
                          {!editingUserId && <span className="text-error ml-1">*</span>}
                        </label>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder={editingUserId ? "Leave blank to keep current password" : "Enter password"}
                          className="w-full px-4 py-3 border border-base-300 outline-none rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-base-200"
                          required={!editingUserId}
                        />
                      </div>

                      {/* Role Selection */}
                      <div className="space-y-2">
                        <label className="text-sm font-semibold">
                          User Role
                        </label>
                        <select
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="w-full px-4 py-3 border border-base-300 outline-none rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-base-200 appearance-none"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>

                      {/* Verification Status */}
                      <div className="flex items-center justify-center lg:justify-start gap-3 p-3 bg-base-200 rounded-lg border border-base-300">
                        <input
                          type="checkbox"
                          checked={isVerified}
                          onChange={(e) => setIsVerified(e.target.checked)}
                          className="w-5 h-5 text-primary bg-base-100 border-base-300 rounded focus:ring-primary focus:ring-2"
                        />
                        <label className="text-sm font-semibold">
                          Account Verified
                        </label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center pt-4">
                      <button
                        type="submit"
                        className={`w-full lg:w-auto px-8 py-4 bg-primary hover:bg-primary/70 text-primary-content font-semibold rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                          isLoading ? "opacity-75 cursor-not-allowed" : ""
                        }`}
                        disabled={isLoading}
                      >
                        <div className="flex items-center justify-center space-x-2">
                          {isLoading ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>
                                {editingUserId ? "Updating..." : "Creating..."} User
                              </span>
                            </>
                          ) : (
                            <>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span>{editingUserId ? "Update User" : "Create User"}</span>
                            </>
                          )}
                        </div>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Users List Section */}
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div className="flex items-center">
                  <h2 className="text-xl md:text-2xl font-bold">Users List</h2>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  {/* Search Box */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LuSearch className="h-5 w-5 text-base-content/70" />
                    </div>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search users..."
                      className="w-full sm:w-64 pl-10 pr-4 py-2 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-base-200 outline-none transition-all duration-200"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        <span className="text-base-content/50 hover:text-base-content">×</span>
                      </button>
                    )}
                  </div>
                  
                  <div className="bg-info text-info-content px-4 py-2 rounded-full text-sm font-semibold">
                    <div className="flex items-center space-x-1">
                      <span>{filteredUsers.length} Users</span>
                      {searchTerm && (
                        <span className="text-xs opacity-80">
                          (of {userList.length} total)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-base-100 rounded-xl border border-base-300 overflow-hidden">
                <div className="p-0">
                  {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                      <span className="ml-3">Loading users...</span>
                    </div>
                  ) : (
                    <>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-base-200 border-b border-base-300">
                              <th className="text-left py-4 px-6 text-sm font-semibold">
                                User
                              </th>
                              <th className="text-left py-4 px-6 text-sm font-semibold">
                                Email
                              </th>
                              <th className="text-left py-4 px-6 text-sm font-semibold">
                                Role
                              </th>
                              <th className="text-left py-4 px-6 text-sm font-semibold">
                                Status
                              </th>
                              <th className="text-left py-4 px-6 text-sm font-semibold">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentUsers.map((user, index) => (
                              <tr
                                key={index}
                                className="border-b border-base-300 hover:bg-base-200 transition-colors"
                              >
                                <td className="py-4 px-6">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-primary text-primary-content rounded-full flex items-center justify-center">
                                      <span className="font-bold text-sm">
                                        {user.fullName
                                          ? user.fullName.charAt(0).toUpperCase()
                                          : "U"}
                                      </span>
                                    </div>
                                    <div>
                                      <div className="font-semibold">
                                        {user.fullName || "No Name"}
                                      </div>
                                      <div className="text-sm opacity-70">
                                        @{user.userID}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-4 px-6">{user.email}</td>
                                <td className="py-4 px-6">
                                  <div
                                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                      user.role === "admin"
                                        ? "bg-error text-error-content"
                                        : "bg-success text-success-content"
                                    }`}
                                  >
                                    {user.role === "admin" ? (
                                      <>
                                        <LuShieldCheck className="w-4 h-4 mr-1" />
                                        Admin
                                      </>
                                    ) : (
                                      <>
                                        <LuUserRound className="w-4 h-4 mr-1" />
                                        User
                                      </>
                                    )}
                                  </div>
                                </td>
                                <td className="py-4 px-6">
                                  <div
                                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                      user.isVerified
                                        ? "bg-success text-success-content"
                                        : "bg-warning text-warning-content"
                                    }`}
                                  >
                                    {user.isVerified ? (
                                      <>
                                        <svg
                                          className="w-4 h-4 mr-1"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                          />
                                        </svg>
                                        Verified
                                      </>
                                    ) : (
                                      <>
                                        <svg
                                          className="w-4 h-4 mr-1"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                          />
                                        </svg>
                                        Pending
                                      </>
                                    )}
                                  </div>
                                </td>
                                <td className="py-4 px-6">
                                  <div className="flex gap-2">
                                    <button
                                      className="btn btn-warning btn-sm"
                                      onClick={() => editHandler(user)}
                                    >
                                      Edit
                                    </button>
                                    <button
                                      className="btn btn-error btn-sm"
                                      onClick={() => deleteHandler(user._id)}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Empty State */}
                      {currentUsers.length === 0 && (
                        <div className="text-center py-16">
                          <div className="flex justify-center mb-4">
                            <LuSearch className="h-16 w-16 text-base-content/30" />
                          </div>
                          <h3 className="text-xl font-semibold mb-3">
                            {searchTerm ? "No Users Found" : "No Users Found"}
                          </h3>
                          <p className="max-w-md mx-auto opacity-70">
                            {searchTerm
                              ? `No users found matching "${searchTerm}". Try a different search term.`
                              : "No users have been registered yet. Start by creating a new user account."}
                          </p>
                          {searchTerm && (
                            <button
                              onClick={() => setSearchTerm("")}
                              className="btn btn-ghost mt-4"
                            >
                              Clear Search
                            </button>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 p-6 bg-base-100 rounded-xl border border-base-300">
                  <div className="text-sm">
                    Showing{" "}
                    <span className="font-semibold">
                      {indexOfFirstUser + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-semibold">
                      {Math.min(indexOfLastUser, filteredUsers.length)}
                    </span>{" "}
                    of <span className="font-semibold">{filteredUsers.length}</span>{" "}
                    users
                    {searchTerm && (
                      <span className="opacity-70 ml-1">
                        (filtered from {userList.length} total)
                      </span>
                    )}
                  </div>

                  <div className="join">
                    {/* Previous Page Button */}
                    <button
                      className="join-item btn"
                      onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      «
                    </button>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(
                        (page) =>
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                      )
                      .map((page, index, array) => {
                        const showEllipsis =
                          index > 0 && page - array[index - 1] > 1;
                        return (
                          <div key={page} className="flex">
                            {showEllipsis && (
                              <button className="join-item btn btn-disabled">
                                ...
                              </button>
                            )}
                            <button
                              className={`join-item btn ${
                                currentPage === page ? "btn-active" : ""
                              }`}
                              onClick={() => setCurrentPage(page)}
                            >
                              {page}
                            </button>
                          </div>
                        );
                      })}

                    {/* Next Page Button */}
                    <button
                      className="join-item btn"
                      onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      »
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;