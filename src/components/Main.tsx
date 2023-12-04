import { useContext, useEffect, useState } from "react";
import "./Main.css";
import Shoutout from "../models/Shoutout";
import {
  addAShoutout,
  deleteAShoutout,
  getAllShoutouts,
} from "../services/shoutoutApiService";
import SOList from "./SOList";
import AddSOForm from "./AddSOForm";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Main = () => {
  const [shoutouts, setShoutouts] = useState<Shoutout[]>([]);
  const name: string | undefined = useParams().to;
  const { user } = useContext(AuthContext);
  // console.log(name);

  const updateSOs = () => {
    getAllShoutouts().then((res) => setShoutouts(res));
  };

  useEffect(() => {
    // if (!name) {
    getAllShoutouts(name).then((res) => setShoutouts(res));
    // } else {
    //   console.log("we need to filter s/o's");
    //   getAllShoutouts().then((res) => {
    //     const filteredSos: Shoutout[] = res.filter((so) => {
    //       return so.to === name;
    //     });
    //     setShoutouts(filteredSos);
    //   });
    // }
  }, [name]);

  const addSOHandler = (newSO: Shoutout) => {
    addAShoutout(newSO).then((res) => {
      console.log(res);
      updateSOs();
    });
  };

  const deleteSOHandler = (id: string) => {
    deleteAShoutout(id).then(() => {
      updateSOs();
    });
  };

  return (
    <main className="Main">
      {user ? (
        <AddSOForm onAdd={addSOHandler} name={name} />
      ) : (
        <p>Please sign in to leave a shoutout!</p>
      )}
      <SOList shoutouts={shoutouts} to={name} onDelete={deleteSOHandler} />
    </main>
  );
};

export default Main;
