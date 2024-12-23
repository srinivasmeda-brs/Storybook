import { Link, useNavigate } from "react-router-dom";
import { Paper, Typography, Box, Button } from "@mui/material"; // Material-UI components
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const Header = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData)); // Parse userData from localStorage
    }
  }, []);

  const logoutUser = () => {
    // Clear user data
    localStorage.removeItem("userData");
    Cookies.remove("sessionToken");
    Cookies.remove("isAuthor");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "20px",
        backgroundColor: "#f5f5f5",
        marginBottom: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Profile Section */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* Placeholder Profile Image */}
          {userData ? (
            <div
              className="profile-image"
              style={{
                marginRight: "15px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#1976d2",
                color: "white",
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              {userData.username[0].toUpperCase()}
            </div>
          ) : (
            <div
              className="profile-image"
              style={{
                marginRight: "15px",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                backgroundColor: "#ccc",
              }}
            />
          )}

          {/* Display User Data */}
          {userData ? (
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {userData.username}
              </Typography>
              <Typography variant="body2" sx={{ color: "gray" }}>
                {userData.email}
              </Typography>
            </Box>
          ) : (
            <Typography variant="body2" sx={{ color: "gray" }}>
              Loading...
            </Typography>
          )}
        </Box>

        {/* Navigation Section */}
        {userData && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link to="/trending-stories" style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  color: "primary.main",
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Trending Stories
              </Button>
            </Link>
            <Button
              onClick={logoutUser}
              variant="outlined"
              color="error"
              sx={{ marginLeft: 2 }}
            >
              Logout
            </Button>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default Header;
