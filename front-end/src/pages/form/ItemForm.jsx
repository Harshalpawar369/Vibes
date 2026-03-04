import React from "react";
import axiositemsapi from "../../api/axiositemsapi";
import { useState, useEffect } from "react";

function ItemForm() {
  const [formData, setFormData] = useState({
    brandName: "",
    price: "",
    itemCategory: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      console.log("Please select an image before submitting.");
      return;
    }

    try {
      const payload = new FormData();
      payload.append("brandName", formData.brandName);
      payload.append("price", formData.price);
      payload.append("itemCategory", formData.itemCategory);
      payload.append("image", formData.image);

      const response = await axiositemsapi.post("/", payload, {
        withCredentials: true,
      });
      if (response.status === 201) {
        console.log("item added successeful", response.data);
        alert("item added successfully");
        setFormData({
          brandName: "",
          price: "",
          itemCategory: "",
          image: null,
        });

        e.target.reset();
      }
    } catch (err) {
      console.log("Item create failed:", err.response?.data || err.message);
    }
  };

  return (
    <>
      <div className="w-full flex flex-wrap items-center justify-center overflow-hidden bg-white relative text-color-black font-[poppins]">
        <div className="w-full flex flex-wrap items-center justify-center">
          <div className="border-4 border-zinc-900 w-110 py-5 mt-3 rounded-2xl">
            <h1 className="text-3xl font-bold text-center mb-4 text-zinc-900">
              Add New Item
            </h1>
            <form
              action=""
              className="flex flex-col items-center justify-center space-y-4 px-4"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                placeholder="enter item name"
                name="brandName"
                onChange={handleChange}
                className="text-zinc-500 outline-none border-2 border-gray-300 rounded-md px-7 py-1 hover:border-blue-500  "
              />
              <input
                type="number"
                placeholder="enter item price"
                name="price"
                onChange={handleChange}
                className="text-zinc-500 outline-none border-2 border-gray-300 rounded-md px-7 py-1 hover:border-blue-500  "
              />
              <input
                type="text"
                placeholder="enter item category"
                name="itemCategory"
                onChange={handleChange}
                className="text-zinc-500 outline-none border-2 border-gray-300 rounded-md px-7 py-1 hover:border-blue-500  "
              />
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className=" text-zinc-500 outline-none border-2 border-gray-300 rounded-md  py-1 ml-[] w-[64%]"
                accept="image/*"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemForm;
