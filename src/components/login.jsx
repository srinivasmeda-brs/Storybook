import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
} from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // For error handling
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error messages

    try {
      const response = await fetch("https://storybook-backend-gd6a.onrender.com/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        const { token, user } = result;

        // Save session token and isAuthor flag in cookies
        Cookies.set("sessionToken", token, { expires: 30 });
        Cookies.set("isAuthor", user.isAuthor, { expires: 30 });

        // Store user data in localStorage
        localStorage.setItem("userData", JSON.stringify(user));

        // Navigate based on user role
        if (user.isAuthor) {
          navigate("/"); // Author routes
        } else {
          navigate("/user"); // Non-author routes
        }
      } else {
        // Display backend error message
        setErrorMessage(result.message || "Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred while logging in. Please try again.");
    }
  };

  useEffect(() => {
    // Check if user is already logged in and navigate to appropriate route
    const sessionToken = Cookies.get("sessionToken");
    const isAuthor = Cookies.get("isAuthor") === "true"; // Convert string to boolean
    const userData = localStorage.getItem("userData");

    if (sessionToken && userData) {
      if (isAuthor) {
        navigate("/storybook"); // Navigate to author route
      } else {
        navigate("/user"); // Navigate to non-author route
      }
    }
    // Add empty dependency array to run only on component mount
  }, [navigate]);

  return (
    <Container maxWidth="xs" sx={{ marginTop: 5 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>

        {errorMessage && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {errorMessage}
          </Alert>
        )}

        <form onSubmit={handleLogin}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                component={Link}
                to="/register"
                variant="outlined"
              >
                Create an account
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
