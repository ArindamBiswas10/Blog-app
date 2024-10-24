import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config"; // Ensure you have the configuration file properly set up

const UpdateBlog = () => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });
  const navigate = useNavigate();
  const { id } = useParams(); // Get the blog ID from the URL parameters

  // Fetch the blog details when the component mounts
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${config.BASE_URL}/api/blogs/${id}`);
        const data = res.data.blog;
        setInputs({
          title: data.title,
          description: data.desc,
          imageURL: data.img,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    try {
      await axios.put(`${config.BASE_URL}/api/blogs/update/${id}`, {
        title: inputs.title,
        desc: inputs.description,
        img: inputs.imageURL,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => navigate("/blogs")); // Redirect to blogs page after update
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={inputs.title}
            onChange={handleChange}
            placeholder="Blog Title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="5"
            value={inputs.description}
            onChange={handleChange}
            placeholder="Blog Description"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="imageURL">Image URL</label>
          <input
            type="text"
            className="form-control"
            id="imageURL"
            name="imageURL"
            value={inputs.imageURL}
            onChange={handleChange}
            placeholder="Image URL"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default UpdateBlog;

