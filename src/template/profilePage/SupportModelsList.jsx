"use client";
import toast, { Toaster } from "react-hot-toast";
import { FaPen, FaTrash } from "react-icons/fa6";
import { IoIosPhonePortrait } from "react-icons/io";
const SupportModelsList = ({ modelList }) => {
  const deleteHandler = async (id) => {
  try {
    const res = await fetch("/api/profile/support-models", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "Delete Failed");
      return;
    }

    toast.success("Deleted Successfully");
    window.location.reload();
  } catch (error) {
    toast.error("Delete Failed");
  }
};
  return (
    <div>
      <Toaster />
      {modelList.map((model) => (
        <ul key={model._id} className="list gap-2 rounded-box shadow-sm mt-4">
          <li className="list-row">
            <div>
              {model.image ? (
                <img
                  className="size-10 rounded-box"
                  src={model.image}
                  alt={model.modelName}
                />
              ) : (
                <IoIosPhonePortrait />
              )}
            </div>
            <div>
              <div className="text-primary uppercase font-semibold ">
                {model.modelName}
              </div>
              <div>
                <h1 className="text-secondary">{model.brandName}</h1>
              </div>
            </div>
            <button className="btn btn-square btn-ghost">
              <FaPen />
            </button>
            <button
              className="btn btn-square btn-ghost"
              onClick={() => deleteHandler(model._id)}
            >
              <FaTrash />
            </button>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default SupportModelsList;
