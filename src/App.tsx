import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Category from "./pages/Category";
import ProductDetail from "./pages/ProductDetail";
import "./styles.css";
export default function App(){return <div className="app-shell"><Header/><Routes><Route path="/" element={<Home/>}/><Route path="/login" element={<Login/>}/><Route path="/signup" element={<Signup/>}/><Route path="/profile" element={<Profile/>}/><Route path="/category/:category" element={<Category/>}/><Route path="/product/:name" element={<ProductDetail/>}/><Route path="*" element={<Home/>}/></Routes><Footer/></div>}
