import { useContext, useEffect, useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import AuthContext from "../context/AuthContext";

const Header = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  // console.log(name);
  const history = useNavigate();

  const urlPath = window.location.href;
  // console.log(urlPath);

  const paths = urlPath.split("/");
  // console.log(paths);

  useEffect(() => {
    if (paths.includes("user")) {
      setName(paths[paths.length - 1]);
    } else {
      setName("");
    }
  }, [history]);

  return (
    <div className="Header">
      <h1>{name ? `Shoutouts for ${name}` : "All Shoutouts"}</h1>
      {name && <Link to="/">Back to all Shoutouts</Link>}
      {!user ? (
        <button onClick={signInWithGoogle}>Sign in</button>
      ) : (
        <>
          <p>Welcome, {user.displayName}</p>
          <Link to="/me">my stuff</Link>
          <img
            src={user.photoURL || "placeholder image goes here"}
            alt={user.displayName || ""}
          />
          <button onClick={signOut}>Sign out</button>
        </>
      )}
    </div>
  );
};

export default Header;
