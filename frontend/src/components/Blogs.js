import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import React from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStyles } from "./utils";
import config from "../config";

const Blogs = ({ title, desc, img, user, isUser, id }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };

  const deleteRequest = async () => {
    const res = await axios.delete(`${config.BASE_URL}/api/blogs/${id}`).catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleDelete = () => {
    deleteRequest()
      .then(() => navigate("/"))
      .then(() => navigate("/blogs"));
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          boxShadow: 3,
          transition: "transform 0.2s",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: 6,
          },
        }}
      >
        {isUser && (
          <Box display="flex" justifyContent="flex-end" padding={1}>
            <IconButton onClick={handleEdit}>
              <ModeEditOutlineIcon color="primary" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteForeverIcon color="error" />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "primary.main" }}>
              {user ? user.charAt(0).toUpperCase() : ""}
            </Avatar>
          }
          title={
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {title}
            </Typography>
          }
          subheader={<Typography variant="body2">{user}</Typography>}
        />
        <CardMedia component="img" height="200" image={img} alt={title} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {desc}
          </Typography>
          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={() => navigate(`/blogs/${id}`)}>
              Read More
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Blogs;
