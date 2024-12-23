import { useState } from 'react';
import { TextField, Button, Container, Grid, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const CreateStoryPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // const [userId, setUserId] = useState('67600418aebc28bc45b73769');  // Set the user ID dynamically
  const navigate = useNavigate();
  const res = localStorage.getItem("userData");
  const out = JSON.parse(res);
  const userId = out._id;

  const handleCreateStory = async (e) => {
    e.preventDefault();
    const newStory = {
      title,
      content,
      userId,
    };

    try {
      const response = await fetch('http://localhost:3005/api/stories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStory),
      });

      if (response.ok) {
        navigate('/');  // Redirect to homepage after successful creation
      } else {
        alert('Error creating story!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating story!');
    }
  };

  return (
    <>
    <Navbar />
    <Container maxWidth="sm" sx={{ marginTop: 5, paddingLeft: 2, paddingRight: 2 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" align="center" gutterBottom color="primary">
          Create a New Story
        </Typography>
        
        <form onSubmit={handleCreateStory}>
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
                Create Story
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
    </>
  );
};

export default CreateStoryPage;
