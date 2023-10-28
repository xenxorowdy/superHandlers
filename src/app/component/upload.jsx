"use client";

import axios from "axios";
import React, { FormEvent, useRef, useState } from "react";
import Image from "next/image";
import Dropzone from "react-dropzone";
import imageCompression from 'browser-image-compression';
import {  FaFileImage } from "react-icons/fa";
import {AiFillCloseCircle} from "react-icons/ai";
import "./drag.css"
import uuid from "react-uuid";

const ImageUploader = () => {
  // 1. add reference to input element
  // const ref = useRef<HTMLInputElement>(null);
  // const [urls, setUrls] = useState<string[]>([]);

  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("")
  const [uploadedImage, setUploadedImage] = useState("");
  const [price,setPrice] = useState("")
  const [selected,onSelected]= useState("Pre Owned FolkLift")
  const handleDrop = async (acceptedFiles ) => {
    try {

      const options = {
        maxSizeMB: 1, // Maximum file size after compression
        maxWidthOrHeight: 800, // Maximum width or height after resizing
      };
      const compressedImage = await imageCompression(acceptedFiles[0], options);
      console.log("acceptedFiles",compressedImage);
      setUploadedImage(compressedImage);
      // console.log("after compress",compressedImage);
      // const formData = new FormData();

      // formData.append(, compressedImage);

    // // 4. use axios to send the FormData
    // await axios.post("/api/upload", formData);
    } catch (error) {
      console.error(error);
    }
  };
const handleReset = ()=>{
  setTitle("");
  setDescription("")
  setUploadedImage("")
  setPrice("")
}
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    const name = uuid();
    const image = uploadedImage
    image.name = name;
    const array = [title+"//sdeqwe",description+"//sdeqwe",price+'//sdeqwe',selected];
    formData.append(name, image);
    formData.append("array",array)
    // const arr = [formData,array]
    // console.log("formdata.......",formData);

    await axios.post("/api/upload", formData);
    handleReset()
    
 
  }
    // 2. get reference to the input element
    // const input = ref.current;

    // 3. build form data
    // const formData = new FormData();
    // const files = Array.from(input.files ?? []);
    // for (const file of files) {
    //   formData.append(file.name, file);
    // }

  //   // 4. use axios to send the FormData
  //   await axios.post("/api/upload", formData);
  //   setUrls(files.map((file) => `/api/uploads/${file.name}`));
  // };
  const handleChange=(e,val)=>{
    onSelected(e.target.value)
  }
  return (
    <>

      <div className="dragger cursor-pointer ">
          <AiFillCloseCircle className=" absolute top-[94px]  right-12" onClick={()=>setUploadedImage(null)}/>
      <Dropzone onDrop={handleDrop}  accept="image/*">
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {uploadedImage ? (
              <Image src={URL.createObjectURL(uploadedImage)} width={400} height={200} alt="Uploaded" />
            ) : (<div className="flex flex-col gap-3  items-center justify-center">
              <FaFileImage className="w-20 h-20"/>
              <p>Drag & drop or click to select Image</p>
              </div>
            )}
          </div>
        )}
      </Dropzone>
      </div>
      <input type="title" placeholder='title' className=" p-1 border-[2px]  rounded-md  focus-within:!border-0  focus-visible:!border-0  " name="title"  value={title} onChange={e=>setTitle(e.target.value)}  />
      <div className="flex  items-center w-[204px]">
      <input type="number"  placeholder='price' className=" p-1 border-[2px]  rounded-md  focus-within:!border-0  focus-visible:!border-0  " name="price" value={price} onChange={e=>setPrice(e.target.value)}   /> 
      {selected=="Rental FolkLift"&&<p2 className=" font-semibold text-lg">/Month</p2>}
      </div>
      <select name="cars" id="cars" defaultValue={selected} value={selected}  onChange={handleChange} className=" p-1 border-[2px] w-[210px]  rounded-md  focus-within:!border-1  focus-visible:!border-1  ">
  <option value="Pre Owned FolkLift">Pre Owned FolkLift</option>
  <option value="Rental FolkLift">Rental FolkLift</option>
  <option value="New FolkLift">New FolkLift</option>
  <option value="Other">Other</option>

</select>
      <textarea id="description" placeholder='Your description' rows={'5'} className=" p-1 w-[220px] border-[2px]  rounded-md   focus-visible:!border-0  " value={description} onChange={e=>setDescription(e.target.value)} />
          
<button className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2" onClick={handleSubmit} > submit</button>
        {/* <input type="file" name="files" ref={ref}  /> */}
        {/* <button
          type="submit"
          className="px-2 py-1 rounded-md bg-violet-50 text-violet-500"
        >
          Upload
        </button>
      </form> */}
      {/* display uploaded images */}
      <div className="relative aspect-video max-h-[400px]">
        {/* {urls.map((url) => {
          return (
            <Image
              key={url}
              src={url}
              alt={url}
              className="object-cover"
              fill
            /> */}
          {/* );
        })} */}
      </div>
    </>
  );
};

export default ImageUploader;