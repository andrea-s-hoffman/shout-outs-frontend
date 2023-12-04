import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import "./AddSOForm.css";
import Shoutout from "../models/Shoutout";
import AuthContext from "../context/AuthContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebaseApp";

interface Props {
  onAdd: (so: Shoutout) => void;
  name: string | undefined;
}

const AddSOForm = ({ onAdd, name }: Props) => {
  // console.log(name);
  const { user } = useContext(AuthContext);
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [text, setText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    // build new shoutout:
    const newShoutout: Shoutout = { to, from, text };
    if (user && user.photoURL) {
      newShoutout.photoURL = user.photoURL;
    }

    // file ref upload:
    const files = fileInputRef.current?.files;
    console.log(files);
    if (files && files[0]) {
      const newFile = files[0];
      const storageRef = ref(storage, "shoutout-files/" + newFile.name);
      try {
        // sending photo to our storage bucket (like a database)
        const snapshot = await uploadBytes(storageRef, newFile);
        // get that photo reference from the storage bucket
        const downloadURL = await getDownloadURL(snapshot.ref);
        // console.log(downloadURL);
        // add img from firebase to our own data
        newShoutout.shoutoutImg = downloadURL;
        save(newShoutout);
      } catch (error) {
        console.log("fail", error);
      }
    } else {
      save(newShoutout);
    }
  };

  function save(newShoutout: Shoutout): void {
    // callback prop:
    onAdd(newShoutout);

    // clear form:
    setTo(name || "");
    setFrom(user?.displayName || "");
    setText("");
    formRef.current?.reset();
  }

  useEffect(() => {
    if (name) {
      setTo(name);
    } else {
      setTo("");
    }
  }, [name]);

  useEffect(() => {
    if (user) {
      setFrom(user.displayName || "");
    } else {
      setFrom("");
    }
  }, [user]);

  return (
    <form className="AddSOForm" onSubmit={submitHandler} ref={formRef}>
      <label htmlFor="to">To:</label>
      <input
        type="text"
        name="to"
        id="to"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        disabled={name !== undefined}
      />
      <label htmlFor="from">From:</label>
      <input
        type="text"
        name="from"
        id="from"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        disabled={user !== null}
      />
      <label htmlFor="file">Upload image:</label>
      <input type="file" name="file" id="file" ref={fileInputRef} />
      <label htmlFor="message">Message:</label>
      <textarea
        name="message"
        id="message"
        cols={30}
        rows={20}
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button>Add Shoutout</button>
    </form>
  );
};

export default AddSOForm;
