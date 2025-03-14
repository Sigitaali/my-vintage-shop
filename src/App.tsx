import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Clothes from './pages/Clothes';
import Shoes from './pages/Shoes';
import Accessories from './pages/Accessories';
import Perfume from './pages/Perfume';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import UsersList from './pages/UsersList';
import UserProfile from './pages/UserProfile';
import Register from './pages/Register';
import Login from './pages/Login';
import UserOrders from './pages/UserOrders';
import Forum from './pages/Forum';
import ForumPostDetail from './pages/ForumPostDetail';
import NewForumPost from './pages/NewForumPost';
import GlobalSearch from './pages/GlobalSearch';
import ProductReviews from "./pages/ProductReviews";
import SearchPosts from './pages/SearchPosts';


const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clothes" element={<Clothes />} />
        <Route path="/shoes" element={<Shoes />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/perfume" element={<Perfume />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users/:id/orders" element={<UserOrders />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/forum/new" element={<NewForumPost />} />
        <Route path="/forum/:id" element={<ForumPostDetail />} />
        <Route path="/global-search" element={<GlobalSearch />} />
        <Route path="/products/:id/reviews" element={<ProductReviews />} />
        <Route path="/search-posts" element={<SearchPosts />} />
      </Routes>
    </Router>
  );
};

export default App;
