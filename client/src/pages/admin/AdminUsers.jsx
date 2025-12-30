import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaUserShield, FaUser, FaBan, FaCheckCircle } from "react-icons/fa";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/users/all", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUsers(res.data.list);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        toast.error("Failed to load users");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleUserStatus = (email, currentStatus) => {
    const token = localStorage.getItem("token");
    const newStatus = !currentStatus;

    if (
      !window.confirm(
        `Are you sure you want to ${newStatus ? "block" : "unblock"} this user?`
      )
    )
      return;

    axios
      .put(
        import.meta.env.VITE_BACKEND_URL + "/users/toggle-block/" + email,
        { isBlocked: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        toast.success("User status updated");
        fetchUsers(); // Refresh the user list
      })
      .catch(() => toast.error("Update failed"));
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-dark-blue mb-6">
        User Management
      </h2>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="p-10 text-center text-gray-500 flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4"></div>
            <p>Loading users...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="p-10 text-center text-gray-500">No users found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-bold">
                <tr>
                  <th className="p-4 border-b">User Info</th>
                  <th className="p-4 border-b">Email</th>
                  <th className="p-4 border-b">Role</th>
                  <th className="p-4 border-b">Status</th>
                  <th className="p-4 border-b text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 border-b last:border-b-0 transition-colors"
                  >
                    {/* Name & Image */}
                    <td className="p-4 flex items-center gap-3">
                      <img
                        src={
                          user.profileImage ||
                          `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`
                        }
                        alt="User"
                        className="w-10 h-10 rounded-full object-cover border border-gray-200"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="font-bold text-gray-800 text-sm">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs text-gray-400">
                          ID: ...{user._id.slice(-4)}
                        </p>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="p-4 text-gray-600 text-sm">{user.email}</td>

                    {/* Role */}
                    <td className="p-4">
                      {user.role === "admin" ? (
                        <span className="flex items-center gap-1 w-fit bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold">
                          <FaUserShield /> Admin
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 w-fit bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                          <FaUser /> User
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      {user.isBlocked ? (
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">
                          Blocked
                        </span>
                      ) : (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                          Active
                        </span>
                      )}
                    </td>

                    {/* Actions (Block/Unblock Button) */}
                    <td className="p-4 text-right">
                      {user.role !== "admin" && (
                        <button
                          onClick={() =>
                            toggleUserStatus(user.email, user.isBlocked)
                          }
                          className={`p-2 rounded-lg transition-all ${
                            user.isBlocked
                              ? "bg-green-50 text-green-600 hover:bg-green-600 hover:text-white"
                              : "bg-red-50 text-red-500 hover:bg-red-500 hover:text-white"
                          }`}
                          title={user.isBlocked ? "Unblock User" : "Block User"}
                        >
                          {user.isBlocked ? <FaCheckCircle /> : <FaBan />}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
