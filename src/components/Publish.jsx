import axios from "axios";
import { useEffect, useState } from "react";
import { Paper, Typography, List, ListItem, Button, Divider } from "@mui/material";
import Navbar from "./Navbar";


const Publish = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const res = localStorage.getItem('userData');
    if (res) {
      const out = JSON.parse(res);
      const userId = out._id;
  
      fetchStories(userId);
    }
  }, []); // Dependency array ensures this runs only once on component mount
  
  const fetchStories = async (userId) => {
    try {
      // Use backticks for template literals
      const response = await axios.get(`http://localhost:3005/api/stories/author/${userId}`);
      
      // Filter unpublished stories (where isPublished is false)
      const unpublishedStories = response.data.filter((story) => !story.isPublished);
      setStories(unpublishedStories); // Update the state with unpublished stories
    } catch (error) {
      console.error("Error fetching stories:", error);
    }
  };
  

  const handlePublish = async (id) => {
    try {
      await axios.patch(`http://localhost:3005/api/stories/${id}/publish`);
      setStories(stories.filter((story) => story._id !== id));
    } catch (error) {
      console.error("Error publishing story:", error);
    }
  };

  return (
    <>
       <Navbar />
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Stories Pending Publish
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <List>
        {stories.length > 0 ? (
          stories.map((story) => (
            <ListItem key={story._id} sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>{story.title}</Typography>
              <Button
                variant="contained"
                color="success"
                onClick={() => handlePublish(story._id)}
              >
                Publish
              </Button>
            </ListItem>
          ))
        ) : (
          <Typography align="center">No stories pending for publish.</Typography>
        )}
      </List>
    </Paper>
    </>

  );
};

export default Publish;
