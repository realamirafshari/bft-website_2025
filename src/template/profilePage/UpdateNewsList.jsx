"use client";
import toast from "react-hot-toast";
import { FaPen, FaTrash } from "react-icons/fa6";

const UpdateNewsList = ({ updateList, setUpdateList, setEditingItem }) => {
  const deleteHandler = async (id) => {
    try {
      const res = await fetch("/api/whats-new", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Delete Failed");
        return;
      }

      // setUpdateList((prev) => prev.filter((item) => item._id !== id));
      toast.success("Deleted Successfully");
    } catch (error) {
      toast.error("Delete Failed");
      console.error(error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">

      <h2 className="text-2xl font-bold mb-6">Update News List</h2>

      {updateList.length === 0 ? (
        <div className="text-center py-8">No update news found</div>
      ) : (
        <div className="space-y-4">
          {updateList.map((item) => (
            <div key={item._id} className="card bg-base-100 border border-base-300">
              <div className="card-body p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="badge badge-ghost">{item.version}</span>
                      <span className="text-sm badge badge-ghost">
                        {item.releaseDate
                          ? (() => {
                              const d = new Date(item.releaseDate);
                              if (isNaN(d)) return "N/A"; // اگر تاریخ نامعتبر بود
                              const year = d.getFullYear();
                              const month = String(d.getMonth() + 1).padStart(
                                2,
                                "0"
                              );
                              const day = String(d.getDate()).padStart(2, "0");
                              return `${year}-${month}-${day}`;
                            })()
                          : "N/A"}
                      </span>
                    </div>
                    <h3 className="card-title text-primary font-semibold mb-2">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-gray-600 mb-3">{item.description}</p>
                    )}

                    {item.features?.length > 0 && (
                      <div className="mb-3">
                        <h4 className="font-semibold text-sm mb-1">
                          Features:
                        </h4>
                        <ul className="list-disc list-inside text-sm">
                          {item.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {item.supportDevice?.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-sm mb-1">
                          Supported Devices:
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {item.supportDevice.map((device, index) => (
                            <span key={index} className="badge badge-ghost">
                              {device}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-1 ml-4">
                    <button
                      className="btn btn-ghost btn-square text-info hover:text-info"
                      title="Edit"
                      onClick={() => setEditingItem(item)}
                    >
                      <FaPen size={14} />
                    </button>
                    <button
                      className="btn btn-ghost text-error hover:text-error"
                      onClick={() => deleteHandler(item._id)}
                      title="Delete"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpdateNewsList;
