import { useState, useEffect } from "react";
import { ThumbUp, Comment } from "@mui/icons-material";
import Header from "./Header";
import { IconButton, Typography, Card, CardContent, CardActions, Box, Divider, TextField, Button } from "@mui/material";

const User = () => {
  const [data, setData] = useState([]); // Stores the fetched stories
  const [likesAndComments, setLikesAndComments] = useState({}); // Tracks likes and comments for each story
  const [newComment, setNewComment] = useState(""); // Tracks the comment input value
  const [showCommentInput, setShowCommentInput] = useState({}); // Tracks visibility of comment input for each story

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3005/api/stories");
        const stories = await response.json();
        const publishedStories = stories.filter((story) => story.isPublished === true); 
        setData(publishedStories);

        // Initialize likesAndComments state for each story
        const initialLikesAndComments = {};
        publishedStories.forEach((story) => {
          initialLikesAndComments[story._id] = {
            likes: story.likes,
            liked: false, // Assume user hasn't liked it yet
            comments: story.comments || [],
          };
        });
        setLikesAndComments(initialLikesAndComments);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };

    fetchData();
  }, []);
 

  const toggleLike = async (id) => {
    
    const currentLikeStatus = likesAndComments[id]?.liked;
    try {
      const response = await fetch(`http://localhost:3005/api/stories/${id}/like`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isLiked: !currentLikeStatus }),
      });
      const updatedStory = await response.json();

      // Update likes and liked status in the state
      setLikesAndComments((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          likes: updatedStory.likes,
          liked: !currentLikeStatus,
        },
      }));
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  const handleCommentSubmit = async (id) => {
    if (newComment.trim()) {
      try {
        const response = await fetch(`http://localhost:3005/api/stories/${id}/comment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment: newComment }),
        });
        const updatedStory = await response.json();

        // Update comments in the state
        setLikesAndComments((prev) => ({
          ...prev,
          [id]: {
            ...prev[id],
            comments: updatedStory.comments,
          },
        }));
        setNewComment(""); // Clear the comment input
        setShowCommentInput((prev) => ({ ...prev, [id]: false })); // Hide the comment input
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const toggleCommentInput = (id) => {
    setShowCommentInput((prev) => ({ ...prev, [id]: !prev[id] })); // Toggle comment input visibility
  };

  return (
    <>
      <Header/>
  
    <div style={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>
      <Typography variant="h4" gutterBottom align="center" color="textPrimary">
        User Profile
      </Typography>
      {data.map((story) => (
        <Card
          key={story._id}
          sx={{
            mb: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <CardContent sx={{ p: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, color: "primary.main", mb: 1 }}>
              {story.title}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, color: "text.primary" }}>
              {story.content}
            </Typography>
          </CardContent>

          <Divider sx={{ my: 2 }} />

          <CardActions sx={{ display: "flex", justifyContent: "flex-start", p: 1 }}>
            <IconButton
              onClick={() => toggleLike(story._id)}
              color={likesAndComments[story._id]?.liked ? "primary" : "default"}
              sx={{ mr: 2 }}
            >
              <ThumbUp />
            </IconButton>
            <Typography variant="body2" sx={{ ml: 1, color: "text.secondary" }}>
              Likes: {likesAndComments[story._id]?.likes || 0}
            </Typography>

            <IconButton
              onClick={() => toggleCommentInput(story._id)}
              sx={{ mr: 2 }}
            >
              <Comment />
            </IconButton>
            <Typography variant="body2" sx={{ ml: 1, color: "text.secondary" }}>
              Comments: {likesAndComments[story._id]?.comments.length || 0}
            </Typography>
          </CardActions>

          {/* Show comment input if toggled */}
          {showCommentInput[story._id] && (
            <Box sx={{ p: 2 }}>
              <TextField
                label="Add a Comment"
                variant="outlined"
                fullWidth
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                sx={{ mb: 1 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleCommentSubmit(story._id)}
              >
                Submit Comment
              </Button>
            </Box>
          )}

          {/* Display comments */}
          <Box sx={{ p: 2 }}>
            {likesAndComments[story._id]?.comments.map((commentObj, idx) => (
              <Typography key={idx} variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
                {commentObj.comment} {/* Access the "comment" field from the object */}
              </Typography>
            ))}
          </Box>
        </Card>
      ))}
    </div>
    </>
  );
};

export default User;
