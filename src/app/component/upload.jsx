"use client";

import axios from "axios";
import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Dropzone from "react-dropzone";
import imageCompression from "browser-image-compression";
import { FaCloudUploadAlt, FaCheckCircle, FaSpinner, FaTimes, FaImage, FaStar } from "react-icons/fa";

const MAX_IMAGES = 5;

const CATEGORIES = [
  { value: "Pre Owned ForkLift", label: "Pre Owned ForkLift" },
  { value: "Rental ForkLift",    label: "Rental ForkLift" },
  { value: "New ForkLift",       label: "New ForkLift" },
  { value: "Other",              label: "Other" },
];

const ImageUploader = () => {
  const [title, setTitle]           = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice]           = useState("");
  const [category, setCategory]     = useState("Pre Owned ForkLift");

  // images: array of { file: File, preview: string }
  const [images, setImages]         = useState([]);
  const [status, setStatus]         = useState("idle"); // idle | loading | success
  const [errorMsg, setErrorMsg]     = useState("");

  // Revoke preview URLs on unmount
  useEffect(() => {
    return () => images.forEach((img) => URL.revokeObjectURL(img.preview));
  }, [images]);

  const compressAndAdd = useCallback(async (acceptedFiles) => {
    const remaining = MAX_IMAGES - images.length;
    if (remaining <= 0) return;

    const toProcess = acceptedFiles.slice(0, remaining);
    const compressed = await Promise.all(
      toProcess.map(async (file) => {
        try {
          const c = await imageCompression(file, { maxSizeMB: 1, maxWidthOrHeight: 1200 });
          return { file: c, preview: URL.createObjectURL(c) };
        } catch {
          return null;
        }
      })
    );

    setImages((prev) => [...prev, ...compressed.filter(Boolean)]);
  }, [images]);

  const removeImage = (idx) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[idx].preview);
      return prev.filter((_, i) => i !== idx);
    });
  };

  // Move an image to position 0 (set as cover)
  const setCover = (idx) => {
    if (idx === 0) return;
    setImages((prev) => {
      const next = [...prev];
      const [moved] = next.splice(idx, 1);
      next.unshift(moved);
      return next;
    });
  };

  const handleReset = () => {
    images.forEach((img) => URL.revokeObjectURL(img.preview));
    setImages([]);
    setTitle("");
    setDescription("");
    setPrice("");
    setCategory("Pre Owned ForkLift");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (images.length === 0) { setErrorMsg("Please upload at least one image."); return; }
    if (!title.trim())        { setErrorMsg("Title is required."); return; }

    setStatus("loading");

    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("description", description.trim());
      formData.append("price", price);
      formData.append("category", category);

      images.forEach((img, i) => {
        formData.append(`images[${i}]`, img.file, img.file.name || `image-${i}.jpg`);
      });

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
  const canAddMore = images.length < MAX_IMAGES;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-6">

      {/* Success */}
      {status === "success" && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold text-sm">
          <FaCheckCircle className="text-lg shrink-0" />
          Listing uploaded successfully!
        </div>
      )}

      {/* Error */}
      {errorMsg && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 font-semibold text-sm">
          <span className="shrink-0 font-black">!</span>
          {errorMsg}
          <button type="button" onClick={() => setErrorMsg("")} className="ml-auto text-red-400 hover:text-red-600">
            <FaTimes size={12} />
          </button>
        </div>
      )}

      {/* ---- Image section ---- */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Images <span className="text-red-400">*</span>
          </label>
          <span className="text-xs text-slate-400 font-medium">
            {images.length} / {MAX_IMAGES} — first image is the cover
          </span>
        </div>

        {/* Thumbnail grid */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {images.map((img, idx) => (
              <div key={img.preview} className="relative group rounded-xl overflow-hidden border-2 bg-slate-100 aspect-[4/3]"
                   style={{ borderColor: idx === 0 ? '#5ba3b5' : '#e2e8f0' }}>
                <Image
                  src={img.preview}
                  fill
                  className="object-cover"
                  alt={`Preview ${idx + 1}`}
                  unoptimized
                />
                {/* Cover badge */}
                {idx === 0 && (
                  <span className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#5ba3b5] text-white text-[10px] font-black uppercase tracking-wide shadow-sm">
                    <FaStar size={8} /> Cover
                  </span>
                )}
                {/* Hover controls */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  {idx !== 0 && (
                    <button
                      type="button"
                      onClick={() => setCover(idx)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/90 text-[10px] font-black text-slate-700 hover:bg-white transition-colors"
                      title="Set as cover"
                    >
                      <FaStar size={9} /> Cover
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="w-7 h-7 rounded-lg bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                    title="Remove"
                  >
                    <FaTimes size={11} />
                  </button>
                </div>
              </div>
            ))}

            {/* Add more slot */}
            {canAddMore && (
              <Dropzone
                onDrop={compressAndAdd}
                accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp"] }}
                maxFiles={MAX_IMAGES - images.length}
                multiple
              >
                {({ getRootProps, getInputProps, isDragActive }) => (
                  <div
                    {...getRootProps()}
                    className={`aspect-[4/3] rounded-xl border-2 border-dashed cursor-pointer flex flex-col items-center justify-center gap-1 transition-all ${
                      isDragActive ? "border-[#5ba3b5] bg-[#5ba3b5]/5" : "border-slate-300 bg-slate-50 hover:border-[#5ba3b5] hover:bg-[#5ba3b5]/5"
                    }`}
                  >
                    <input {...getInputProps()} />
                    <FaImage className="text-slate-300 text-xl" />
                    <span className="text-[10px] text-slate-400 font-semibold">Add Photo</span>
                  </div>
                )}
              </Dropzone>
            )}
          </div>
        )}

        {/* Initial empty dropzone (shown only when no images) */}
        {images.length === 0 && (
          <Dropzone
            onDrop={compressAndAdd}
            accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp"] }}
            maxFiles={MAX_IMAGES}
            multiple
          >
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div
                {...getRootProps()}
                className={`w-full min-h-[200px] rounded-2xl border-2 border-dashed cursor-pointer transition-all flex flex-col items-center justify-center gap-3 py-10 ${
                  isDragActive ? "border-[#5ba3b5] bg-[#5ba3b5]/5" : "border-slate-300 bg-slate-50 hover:border-[#5ba3b5] hover:bg-[#5ba3b5]/5"
                }`}
              >
                <input {...getInputProps()} />
                <FaCloudUploadAlt className="text-4xl text-slate-300" />
                <div className="text-center">
                  <p className="font-semibold text-sm text-slate-500">
                    {isDragActive ? "Drop images here…" : "Drag & drop or click to select"}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">Up to {MAX_IMAGES} images · PNG, JPG, WEBP</p>
                </div>
              </div>
            )}
          </Dropzone>
        )}
      </div>

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

      {/* Price + Category */}
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
              <option key={c.value} value={c.value}>{c.label}</option>
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
          <><FaSpinner className="animate-spin" /> Uploading {images.length} image{images.length !== 1 ? "s" : ""}…</>
        ) : (
          <><FaCloudUploadAlt /> Upload Listing</>
        )}
      </button>
    </form>
  );
};

export default ImageUploader;
