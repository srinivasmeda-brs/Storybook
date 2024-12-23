import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AppBar, Toolbar, IconButton, Button, Typography, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CreateIcon from "@mui/icons-material/Create";
import PublishIcon from "@mui/icons-material/Publish";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person"; // Icon for the Author

const Navbar = () => {
  const navigate = useNavigate();

  // Retrieve author data from localStorage
  const res = JSON.parse(localStorage.getItem("userData"));
  const authorName = res?.username || "Author"; // Default to "Author" if username is unavailable

  const logOut = () => {
    localStorage.removeItem("userData");
    Cookies.remove("sessionToken"); // Remove the token from cookies
    navigate("/login"); // Navigate to login page
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#1A237E",
        color: "#FFFFFF",
        marginTop: 0,
        marginLeft: 0,
        marginRight: 0,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left Side - Navbar Logo and Author Info */}
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <PersonIcon sx={{ color: "#FFC107" }} /> {/* Author Icon */}
          StoryBook | {authorName} {/* Display Author Name */}
        </Typography>

        {/* Right Side - Navbar Items */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <IconButton color="inherit" component={Link} to="/" aria-label="Home">
            <HomeIcon />
          </IconButton>
          <IconButton color="inherit" component={Link} to="/create" aria-label="Create Story">
            <CreateIcon />
          </IconButton>
          <IconButton color="inherit" component={Link} to="/publish" aria-label="Publish Story">
            <PublishIcon />
          </IconButton>

          <Button
            variant="contained"
            color="error"
            onClick={logOut}
            startIcon={<ExitToAppIcon />}
            sx={{
              backgroundColor: "#E57373",
              "&:hover": { backgroundColor: "#EF5350" },
              borderRadius: "5px",
              padding: "6px 16px",
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
