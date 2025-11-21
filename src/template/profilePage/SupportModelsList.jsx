"use client";
import toast from "react-hot-toast";
import { FaPen, FaTrash } from "react-icons/fa6";
import { IoIosPhonePortrait } from "react-icons/io";

const SupportModelsList = ({ modelList, onEdit, onDelete }) => {
  const deleteHandler = async (id) => {
    try {
      const res = await fetch("/api/profile/support-models", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Delete Failed");
        return;
      }

      toast.success("Deleted Successfully");
      if (onDelete) onDelete();
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  return (
    <div>
      {modelList.map((model) => (
        <ul key={model._id} className="list gap-2 rounded-box shadow-sm mt-4">
          <li className="list-row flex items-center justify-between">
            <div className="flex items-center gap-2">
              {model.image ? (
                <img
                  className="w-10 h-10 rounded-box"
                  src={model.image}
                  alt={model.modelName}
                />
              ) : (
                <IoIosPhonePortrait size={24} />
              )}
              <div>
                <div className="text-primary uppercase font-semibold">
                  {model.modelName}
                </div>
                <div className="text-secondary">{model.brandName}</div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                className="btn btn-square btn-ghost"
                onClick={() => onEdit(model)}
              >
                <FaPen />
              </button>
              <button
                className="btn btn-square btn-ghost"
                onClick={() => deleteHandler(model._id)}
              >
                <FaTrash />
              </button>
            </div>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default SupportModelsList;
