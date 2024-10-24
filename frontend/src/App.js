import './App.css';
import { Route, Routes } from "react-router-dom";
import Header from '../src/components/Header';
import React from 'react';
import Login from '../src/components/Login';
import Blogs from '../src/components/Blogs';
import UserBlogs from '../src/components/UserBlogs'
import AddBlogs from '../src/components/AddBlogs'
import BlogDetail from '../src/components/BlogDetail'



function App() {
  return <React.Fragment>
    <header>
      <Header/>
    </header>
    <main>
    <Routes>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/blogs" element={<Blogs/>}></Route>
      <Route path="/myBlogs" element={<UserBlogs/>}></Route>
      <Route path="/myBlogs/:id" element={<BlogDetail/>}></Route>
      <Route path="/blogs/add" element={<AddBlogs />} />
    </Routes>
    </main>

  </React.Fragment>;
}

export default App;