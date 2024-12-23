import { useEffect, useState } from "react";
import axios from "axios";
import StoryItem from "./StoryItem";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const StoryList = () => {
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();
 
  useEffect(() => {
    const res = localStorage.getItem('userData');
    if (res) {
      const out = JSON.parse(res);
      const userId = out._id;
  
      fetchStories(userId);
    }
  }, []); // Empty dependency array to ensure this runs only once when the component mounts
  
  const fetchStories = async (userId) => {
    try {
      const response = await axios.get(`https://storybook-backend-gd6a.onrender.com/api/stories/author/${userId}`);
  
      const publishedStories = response.data.filter((story) => story.isPublished);
      setStories(publishedStories); // Update the state with published stories
    } catch (error) {
      console.error("Error fetching stories:", error);
    }
  };
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://storybook-backend-gd6a.onrender.com/api/stories/${id}`);
      setStories(stories.filter((story) => story._id !== id));
    } catch (error) {
      console.error("Error deleting story:", error);
    }
  };

  const handleEdit = async (id) => {
    navigate(`/edit/${id}`); // Redirect to the edit page with the story ID
    console.log(`Edit story with ID: ${id}`);
    // Add your navigation logic or API call for editing here
  };

  return (
    <>
      <Navbar />
    <div>
      <h2>Published Stories</h2>
      {stories.length > 0 ? (
        stories.map((story) => (
          <StoryItem
            key={story._id}
            story={story}
            onDelete={() => handleDelete(story._id)}
            onEdit={() => handleEdit(story._id)}
          />
        ))
      ) : (
        <p>No published stories available.</p>
      )}
    </div>
    </>

  );
};

export default StoryList;
