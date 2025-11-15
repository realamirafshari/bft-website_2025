"use client";
import { useState } from "react";
import SupportModelsForm from "@/template/profilePage/SupportModelsForm";
import SupportModelsList from "./SupportModelsList";

const SupportModelWrapper = ({ initialBrands, initialModels }) => {
  const [brandList] = useState(initialBrands || []);
  const [modelList, setModelList] = useState(initialModels || []);
  const [editModel, setEditModel] = useState(null);

  const refreshList = async () => {
    try {
      const res = await fetch("/api/profile/support-models");
      const data = await res.json();
      setModelList(data);
    } catch (err) {
      console.error("Failed to refresh models", err);
    }
  };

  return (
    <div className="">
      <SupportModelsForm
        brand={brandList}
        editModel={editModel}
        onUpdate={() => {
          refreshList();
          setEditModel(null);
        }}
      />
      <SupportModelsList
        modelList={modelList}
        onEdit={(model) => setEditModel(model)}
        onDelete={refreshList}
      />
    </div>
  );
};

export default SupportModelWrapper;
