import { useEffect, useState } from "react";
import { Container, Grid, Typography, Card, CardContent, Button } from "@mui/material";
import Header from "./Header";

const TrendingStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the stories from the backend
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch("http://localhost:3005/api/stories");
        const result = await response.json();
        
        // Sort stories by likes in descending order
        const sortedStories = result.sort((a, b) => b.likes - a.likes);

        // Set the top trending stories (optional: filter for unpublished stories)
        setStories(sortedStories.slice(0, 5)); // Get top 5 trending stories
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stories:", error);
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Typography variant="h4" gutterBottom>
          Trending Stories
        </Typography>
        
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <Grid container spacing={2}>
            {stories.map((story) => (
              <Grid item xs={12} sm={6} md={4} key={story._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{story.title}</Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                      {story.content.length > 100 ? `${story.content.substring(0, 100)}...` : story.content}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Likes: {story.likes}
                    </Typography>
                  </CardContent>
                  <Button
                    variant="contained"
                    color="primary"
                    href={`/story/${story._id}`}
                  >
                    Read More
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default TrendingStories;
