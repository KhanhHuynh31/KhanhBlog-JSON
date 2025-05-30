import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./app.css";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import Home from "./pages/Home/Home";
import Category from "./pages/Home/Category/Category";
import Detail from "./pages/Home/Detail/Detail";
import Search from "./pages/Home/Search/Search";
import Account from "./pages/Home/User/Account";
import { Toaster } from "react-hot-toast";
import ListPost from "./pages/Admin/ListPost/ListPost";
import ManagePost from "./pages/Admin/ManagePost/ManagePost";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import Note from "./pages/Admin/Note/Note";
import FetchData from "./components/FetchData/FetchData";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <FetchData />
      <Routes>
        <Route path="/login" element={<Account status={"login"} />} />
        <Route path="/register" element={<Account status={"register"} />} />
        <Route element={<HomeTemplate />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/category/type/:id" element={<Category />} />
          <Route path="/category/tag/:tag" element={<Category />} />
          <Route path="/category/type/:id/tag/:tag" element={<Category />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/search/:searchText" element={<Search />} />
        </Route>
        <Route path="admin" element={<AdminTemplate />}>
          <Route
            path="list"
            element={
              <ProtectedRoute allowedRoles={["1"]}>
                <ListPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="posts"
            element={
              <ProtectedRoute allowedRoles={["1"]}>
                <ManagePost />
              </ProtectedRoute>
            }
          />
          <Route
            path="posts/:id"
            element={
              <ProtectedRoute allowedRoles={["1"]}>
                <ManagePost />
              </ProtectedRoute>
            }
          />
          <Route
            path="edit-posts/:id"
            element={
              <ProtectedRoute allowedRoles={["1"]}>
                <ManagePost />
              </ProtectedRoute>
            }
          />
          <Route path="note" element={<Note />} />
          <Route path="note/:id" element={<Note />} />
          <Route path="note/type/:type" element={<Note />} />
          <Route path="note/pinted/:pinted" element={<Note />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
