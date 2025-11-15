"use client";

import { useState } from "react";
import UpdateNewsForm from "./UpdateNewsForm";
import UpdateNewsList from "./UpdateNewsList";

const UpdateNewsWrapper = ({ initialData }) => {
  const [updateList, setUpdateList] = useState(initialData);
  const [editingItem, setEditingItem] = useState(null); // state برای ویرایش

  return (
    <div className="space-y-8">
      <UpdateNewsForm
        editingItem={editingItem} // آیتمی که در حال ویرایش است
        setUpdateList={setUpdateList} // برای بروزرسانی لیست بعد از POST/PUT
        setEditingItem={setEditingItem} // برای تغییر آیتم انتخاب شده
      />
      <UpdateNewsList
        updateList={updateList}
        setEditingItem={setEditingItem} // وقتی روی ویرایش کلیک شد، فرم پر شود
      />
    </div>
  );
};

export default UpdateNewsWrapper;
