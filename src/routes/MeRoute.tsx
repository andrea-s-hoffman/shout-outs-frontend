import { useContext, useEffect, useState } from "react";
import SOList from "../components/SOList";
import "./MeRoute.css";
import Shoutout from "../models/Shoutout";
import { getAllShoutouts } from "../services/shoutoutApiService";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MeRoute = () => {
  const [shououts, setShoutouts] = useState<Shoutout[]>([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getAllShoutouts().then((res) => {
        const filteredRes = res.filter(
          (so) => so.to === user?.displayName || so.from === user?.displayName
        );

        setShoutouts(filteredRes);
      });
    } else {
      // send user back home if not logged in
      navigate("/");
    }
  }, [user]);

  return (
    <div className="MeRoute">
      <h2>All Shoutouts to or from myself:</h2>
      <SOList shoutouts={shououts} onDelete={() => {}} to="" />
    </div>
  );
};

export default MeRoute;
