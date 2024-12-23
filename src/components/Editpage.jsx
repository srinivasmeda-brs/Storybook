import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

import { TextField, Button, Container, Grid, Typography, Paper } from "@mui/material";
import axios from "axios";

const EditStoryPage = () => {
  const { id } = useParams(); // Get the storyId from the URL
  const navigate = useNavigate(); // Hook to navigate back to the list page
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const [userId, setUserId] = useState("67600418aebc28bc45b73769"); // Static for now
  const res = localStorage.getItem('userData')
  const out = JSON.parse(res);
  const userId = out._id;
  useEffect(() => {
    
    const fetchStory = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/stories/${id}`);
        if (response.data) {
          setTitle(response.data.title);
          setContent(response.data.content);
        } else {
          alert("Story not found!");
        }
      } catch (error) {
        console.error("Error fetching story:", error);
        alert("Error fetching story!");
      }
    };
    fetchStory();
  }, [id]);

  const handleUpdateStory = async (e) => {
    e.preventDefault();
    

    const updatedStory = {
      title,
      content,
      userId,
    };

    try {
      const response = await axios.put(`http://localhost:3005/api/stories/${id}`, updatedStory);
      if (response.data) {
        alert("Story updated successfully!");
        navigate("/"); // Redirect to the homepage after updating
      }
    } catch (error) {
      console.error("Error updating story:", error);
      alert("Error updating story!");
    }
  };

  return (
    <>
       <Navbar />
    <div>
    <Container maxWidth="sm" sx={{ marginTop: 5 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Edit Story
        </Typography>

        <form onSubmit={handleUpdateStory}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Story Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Story Content"
                variant="outlined"
                multiline
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth variant="contained" color="primary" type="submit">
                Update Story
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
    </div>
    </>
  );
};

export default EditStoryPage;
