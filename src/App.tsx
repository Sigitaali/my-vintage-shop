import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Clothes from './pages/Clothes';
import Shoes from './pages/Shoes';
import Accessories from './pages/Accessories';
import Perfume from './pages/Perfume';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Users from './pages/Users';
import UserDetail from './pages/UserDetail';
import NewUser from './pages/NewUser';
import EditUser from './pages/EditUser';
import DeleteUser from './pages/DeleteUser';
import Forum from './pages/Forum';
import ForumPostDetail from './pages/ForumPostDetail';
import NewForumPost from './pages/NewForumPost';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clothes" element={<Clothes />} />
        <Route path="/shoes" element={<Shoes />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/perfume" element={<Perfume />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/new" element={<NewUser />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="/users/:id/edit" element={<EditUser />} />
        <Route path="/users/:id/delete" element={<DeleteUser />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/forum/new" element={<NewForumPost />} />
        <Route path="/forum/:id" element={<ForumPostDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
