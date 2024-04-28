import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { app } from "../firebase/firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";

function CreatePost() {

  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublidhError] = useState(null);
  const [imageUploadingProgress, setImageUploadingProgress] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleImageUpload = async () => {
    try {
      if (!file) {
        return;
      }
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      // setImageUploadingError(null);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadingProgress(progress.toFixed(0));
        },
        (error) => {
          console.log(error);
          setImageUploadingProgress(null);
          // setImageFile(null);
          // setImageFileUrl(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // setImageFileUrl(downloadURL);
            setImageUploadingProgress(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        return setPublidhError(data.message);
      } else {
        setPublidhError(null);
        navigate(`/posts/${data.slug}`);
      }
    } catch (error) {
      setPublidhError("something went wrong");
    }
  };
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={handleInputChange}
          />
          <Select onChange={handleInputChange} id="category">
            <option value="uncategorized">Select a category</option>
            <option value="javaScript">JavaScript</option>
            <option value="reactjs">Reactjs</option>
            <option value="nextjs">next.js</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-5000 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleImageUpload}
            disabled={imageUploadingProgress}
          >
            {imageUploadingProgress ? (
              <div className="w-7 h-7">
                <CircularProgressbar
                  value={imageUploadingProgress}
                  text={`${imageUploadingProgress}` || "0"}
                />
              </div>
            ) : (
              "Upload"
            )}
          </Button>
        </div>
        {formData.image && (
          <img
            src={formData.image}
            alt="image"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="write something..."
          className="h-72 mb-12"
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>
        {publishError && <Alert color="failure" className="my-2">{publishError}</Alert>}
      </form>
    </div>
  );
}

export default CreatePost;
