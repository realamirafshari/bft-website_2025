const SupportModelsPage = async () => {
  await connectDB();

  const brand = await PhoneBrand.find({}).lean();

  if (!brand || brand.length === 0) {
    throw new Error("هیچ برندی پیدا نشد!");
  }

  const Models = await SupportModels.find({});
  const plainBrand = JSON.parse(JSON.stringify(brand));

  return (
    <div>
      <SupportModelsForm brand={plainBrand} />
      {Models.map((model) => (
        <ul key={model._id} className="list gap-2 rounded-box shadow-sm mt-4">
          <li className="list-row">
            <div>
              <img
                className="size-10 rounded-box"
                src={model.image}
                alt={model.modelName}
              />
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
            <button className="btn btn-square btn-ghost">
              <FaTrash />
            </button>
          </li>
        </ul>
      ))}
    </div>
  );
};
