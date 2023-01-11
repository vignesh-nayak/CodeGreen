import { Route, Routes } from 'react-router-dom';
import Main from "./components/main";
import Login from "./components/login";
import Register from "./components/register";
import Game from "./components/game";
import ForgotPassword from "./components/forgotPassword";
import HowToPlay from "./components/howToPlay";
import NotFound from "./components/notFound";


function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Main />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/register" exact element={<Register />} />
      <Route path="/game" exact element={<Game />} />
      <Route path="/forgotPassword" exact element={<ForgotPassword />} />
      <Route path="/howToPlay" exact element={<HowToPlay />} />
      {/* <Route path="/user/profile" exact element={<UserProfile />} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
