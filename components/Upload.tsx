import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  uploadString,
} from "firebase/storage";
import app from "../utils/firebase";
import { async } from "@firebase/util";
import axios from "axios";
import { useRouter } from "next/router";

interface Uploads {
  setShow: Dispatch<SetStateAction<boolean>>;
  show: boolean;
}

const Upload = ({ setShow, show }: Uploads) => {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const router = useRouter();

  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const [imgPerc, setimgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  // const [title, setTitle] = useState("");
  // const [desc, setDesc] = useState("");
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);

  const handleTags = (e: any) => {
    setTags(e.target.value.split(","));
  };

  const HandleChange = (e: any) => {
    setInputs((prev: any) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const SubmitVideo = async (e: any) => {
    e.preventDefault();

    const res = await axios.post("/video/add", { ...inputs, tags });

    setTimeout(() => {
      res.status === 200 && router.push(`/`);
    }, 2000);
  };

  const uploadFile = (file: any, urlType: any) => {
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    //
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl"
          ? setimgPerc(Math.round(progress))
          : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev: any) => {
            console.log(prev, "prev", urlType);
            return {
              ...prev,
              [urlType]: downloadURL,
            };
          });
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  return (
    <>
      <Modal show={show} onHide={handleClose} className="special_modal">
        <Modal.Header closeButton>
          <Modal.Title>Upload Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3 d-flex flex-column">
            <Form.Label>Video file</Form.Label>
            {videoPerc > 0 ? (
              "Uploading:" + videoPerc + "%"
            ) : (
              <Form.Control
                type="file"
                accept="video/*"
                onChange={(e: any) => setVideo(e.target.files[0])}
              />
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name="title" onChange={HandleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              as={"textarea"}
              rows={3}
              name="desc"
              onChange={HandleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>tags</Form.Label>
            <Form.Control type="text" onChange={handleTags} />
          </Form.Group>
          <Form.Group className="mb-3 d-flex flex-column">
            <Form.Label> Image Thumbnail</Form.Label>
            {imgPerc > 0 ? (
              "Uploading:" + imgPerc + "%"
            ) : (
              <Form.Control
                type="file"
                onChange={(e: any) => setImg(e.target.files[0])}
              />
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={SubmitVideo}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Upload;
