import Shoutout from "../models/Shoutout";
import "./SOList.css";
import ShoutoutCard from "./ShoutoutCard";

interface Props {
  shoutouts: Shoutout[];
  to: string | undefined;
  onDelete: (id: string) => void;
}

const SOList = ({ shoutouts, onDelete }: Props) => {
  return (
    <ul className="SOList">
      {shoutouts.map((so) => (
        <ShoutoutCard key={so._id} shoutout={so} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default SOList;
