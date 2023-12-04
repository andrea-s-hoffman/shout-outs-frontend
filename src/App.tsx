import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
// import { getTopFive } from "./services/shoutoutApiService";
import MeRoute from "./routes/MeRoute";

function App() {
  // getTopFive().then((res) => console.log(res));

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/user/:to" element={<Main />} />
        <Route path="/me" element={<MeRoute />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
