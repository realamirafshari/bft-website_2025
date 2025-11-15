// UpdateNews.jsx
import { connectDB } from "@/utils/connectDB";
import Changelog from "@/models/Changelog";
import UpdateNewsWrapper from "./UpdateNewsWrapper"; // Client wrapper

const UpdateNews = async () => {
  await connectDB();

  try {
    const updateList = await Changelog.find({})
      .sort({ releaseDate: -1, version: -1 })
      .lean();

    const plainUpdateList = JSON.parse(JSON.stringify(updateList));

    return <UpdateNewsWrapper initialData={plainUpdateList} />;
  } catch (error) {
    console.error("Error fetching update news:", error);
    return (
      <div className="p-6">
        <div className="alert alert-error">
          Error loading update news. Please try again later.
        </div>
      </div>
    );
  }
};

export default UpdateNews;
