import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/Login/Login";
import { useSelector } from "react-redux";

function App() {
  const admin = true;
  // useSelector((state) => state.user.currentUser.isAdmin);
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        {admin && (
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Route path="/home" element={<Home />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/user/:userId" element={<User />} />
              <Route path="/newUser" element={<NewUser />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:productId" element={<Product />} />
              <Route path="/newproduct" element={<NewProduct />} />
            </div>
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;