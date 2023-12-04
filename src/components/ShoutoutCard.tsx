import { Link } from "react-router-dom";
import Shoutout from "../models/Shoutout";
import "./ShoutoutCard.css";

interface Props {
  shoutout: Shoutout;
  onDelete: (id: string) => void;
}

const ShoutoutCard = ({ shoutout, onDelete }: Props) => {
  return (
    <li className="ShoutoutCard">
      {shoutout.shoutoutImg && (
        <img src={shoutout.shoutoutImg} alt="shoutout" />
      )}
      <p>
        To: <Link to={`/user/${shoutout.to}`}>{shoutout.to}</Link>
      </p>
      <p>
        From:{" "}
        {shoutout.photoURL && (
          <img src={shoutout.photoURL} alt={shoutout.from} />
        )}
        <Link to={`/user/${shoutout.from}`}>{shoutout.from}</Link>
      </p>
      <p>Message: {shoutout.text}</p>
      <button onClick={() => onDelete(shoutout._id!)}>Delete</button>
    </li>
  );
};

export default ShoutoutCard;
