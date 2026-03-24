"use client";

import axios from "axios";
import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Dropzone from "react-dropzone";
import imageCompression from "browser-image-compression";
import { FaCloudUploadAlt, FaCheckCircle, FaSpinner, FaTimes, FaImage } from "react-icons/fa";

const CATEGORIES = [
  { value: "Pre Owned ForkLift", label: "Pre Owned ForkLift" },
  { value: "Rental ForkLift", label: "Rental ForkLift" },
  { value: "New ForkLift", label: "New ForkLift" },
  { value: "Other", label: "Other" },
];

const ImageUploader = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Pre Owned ForkLift");

  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleDrop = useCallback(async (acceptedFiles) => {
    if (!acceptedFiles.length) return;
    try {
      const compressed = await imageCompression(acceptedFiles[0], {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
      });
      setImageFile(compressed);
      setImagePreview(URL.createObjectURL(compressed));
    } catch {
      setErrorMsg("Failed to process image. Try a different file.");
    }
  }, []);

  const clearImage = (e) => {
    e.stopPropagation();
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(null);
    setImagePreview(null);
  };

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setPrice("");
    setCategory("Pre Owned ForkLift");
    clearImage({ stopPropagation: () => {} });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!imageFile) {
      setErrorMsg("Please upload an image.");
      return;
    }
    if (!title.trim()) {
      setErrorMsg("Title is required.");
      return;
    }

    setStatus("loading");

    try {
      const formData = new FormData();
      formData.append("image", imageFile, imageFile.name || "upload.jpg");
      formData.append("title", title.trim());
      formData.append("description", description.trim());
      formData.append("price", price);
      formData.append("category", category);

      await axios.post("/api/upload", formData);

      setStatus("success");
      handleReset();
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      setStatus("idle");
      setErrorMsg(err.response?.data?.error || "Upload failed. Please try again.");
    }
  };

  const isRental = category === "Rental ForkLift";

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-6">
      {/* Success banner */}
      {status === "success" && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold text-sm animate-[fadeIn_0.3s_ease]">
          <FaCheckCircle className="text-lg shrink-0" />
          Listing uploaded successfully!
        </div>
      )}

      {/* Error banner */}
      {errorMsg && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 font-semibold text-sm">
          <span className="shrink-0">!</span>
          {errorMsg}
          <button type="button" onClick={() => setErrorMsg("")} className="ml-auto text-red-400 hover:text-red-600">
            <FaTimes size={12} />
          </button>
        </div>
      )}

      {/* Dropzone */}
      <Dropzone
        onDrop={handleDrop}
        accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp"] }}
        maxFiles={1}
        multiple={false}
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div
            {...getRootProps()}
            className={`relative w-full min-h-[240px] rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300 flex items-center justify-center overflow-hidden ${
              isDragActive
                ? "border-[#5ba3b5] bg-[#5ba3b5]/5"
                : imagePreview
                ? "border-slate-200 bg-slate-50"
                : "border-slate-300 bg-slate-50 hover:border-[#5ba3b5] hover:bg-[#5ba3b5]/5"
            }`}
          >
            <input {...getInputProps()} />
            {imagePreview ? (
              <>
                <Image
                  src={imagePreview}
                  width={500}
                  height={300}
                  alt="Preview"
                  className="object-contain max-h-[220px] rounded-lg"
                />
                <button
                  type="button"
                  onClick={clearImage}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-red-500 hover:border-red-200 transition-colors shadow-sm"
                >
                  <FaTimes size={12} />
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center gap-3 py-10 text-slate-400">
                <FaImage className="text-4xl" />
                <p className="font-semibold text-sm">
                  {isDragActive ? "Drop image here..." : "Drag & drop or click to select"}
                </p>
                <p className="text-xs text-slate-400">PNG, JPG, WEBP — max 1MB after compression</p>
              </div>
            )}
          </div>
        )}
      </Dropzone>

      {/* Title */}
      <div className="space-y-1.5">
        <label htmlFor="title" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Title <span className="text-red-400">*</span>
        </label>
        <input
          id="title"
          type="text"
          placeholder="e.g. Toyota 8FGU25 Forklift"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Price + Category Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="price" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Price ($){isRental && " / month"}
          </label>
          <input
            id="price"
            type="number"
            placeholder="0.00"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="category" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-white/50 border border-slate-200 focus:border-[#5ba3b5] outline-none rounded-xl px-4 py-3 transition-all duration-300 text-slate-900 font-medium"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <label htmlFor="desc" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Description
        </label>
        <textarea
          id="desc"
          rows={4}
          placeholder="Describe condition, hours, features..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-[#5ba3b5] hover:bg-[#7ab8c7] transition-all duration-300 shadow-lg shadow-[#5ba3b5]/20 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none"
      >
        {status === "loading" ? (
          <>
            <FaSpinner className="animate-spin" /> Uploading...
          </>
        ) : (
          <>
            <FaCloudUploadAlt /> Upload Listing
          </>
        )}
      </button>
    </form>
  );
};

export default ImageUploader;
