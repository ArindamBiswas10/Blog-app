import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config"; // Ensure this file contains the correct BASE_URL
import Blogs from "./Blogs"; // Ensure you're importing your Blogs component
import { Grid, Typography } from "@mui/material";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogs = async () => {
    console.log("Fetching blogs..."); // Log fetching
    try {
      const response = await axios.get(`${config.BASE_URL}/api/blogs`);
      console.log("Fetched Blogs:", response.data); // Log the fetched data
      setBlogs(response.data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("Could not fetch blogs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Grid container spacing={2}>
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <Blogs
            key={blog._id}
            title={blog.title}
            desc={blog.desc}
            img={blog.img}
            user={blog.user}
            id={blog._id}
            isUser={false} // Adjust as needed
          />
        ))
      ) : (
        <Typography variant="h6" color="text.secondary">
          No blogs found.
        </Typography>
      )}
    </Grid>
  );
};

export default AllBlogs;



