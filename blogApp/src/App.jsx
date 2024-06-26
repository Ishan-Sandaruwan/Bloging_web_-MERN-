import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import CreatePost from "./pages/CreatePost";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import UpdatePost from "./pages/UpdatePost";
import Postpage from "./pages/Postpage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Header />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Signin />} path="/sign-in" />
        <Route element={<Signup />} path="/sign-up" />
        <Route element={<PrivateRoute />}>
          <Route element={<Dashboard />} path="/dashboard" />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route element={<CreatePost />} path="/create-post" />
          <Route element={<UpdatePost />} path="/update-post/:postId" />
        </Route>
        <Route element={<About />} path="/about" />
        <Route element={<Projects />} path="/projects" />
        <Route element={<Postpage />} path="/post/:postSlug" />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
