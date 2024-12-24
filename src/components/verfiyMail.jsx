import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Typography, Box, Button, Divider } from "@mui/material";

const EmailVerifyPage = () => {
  const { verifytoken } = useParams(); // Retrieve token from route parameters
  const [verify, setVerify] = useState(""); // State to display the verification message

  // API endpoint with the dynamic token
  const url = `https://storybook-backend-gd6a.onrender.com/api/users/verifyEmail/${verifytoken}`;

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Fetch API to verify email
        const response = await fetch(url);

        if (response.status === 200 || response.status === 201) {
          // Success: Token valid or already verified
          setVerify("Email Verified! Please login.");
        } else {
          // Error responses
          setVerify("Verification failed. Please try again.");
        }
      } catch (error) {
        // Catch network or other errors
        setVerify("An error occurred while verifying your email.");
        console.error("Verification Error:", error);
      }
    };

    verifyEmail(); // Call the function on component load
  }, [url]); // Dependency to re-run if URL changes (rare case)

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "background.default",
          padding: 4,
        }}
      >
        <Box
          sx={{
            maxWidth: "500px",
            width: "100%",
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 3,
            padding: 4,
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Link to="/home">
              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <img
                  src="/images/logo.svg"
                  alt="Storytime"
                  style={{ height: "40px", width: "auto" }}
                />
              </Box>
            </Link>

            <Typography variant="h4" sx={{ fontWeight: 600, color: "primary.main", mb: 2 }}>
              StoryBook
            </Typography>

            <Divider sx={{ mb: 2 }} />

            {/* Display verification status */}
            <Typography variant="h6" sx={{ mb: 3 }}>
              {verify}
            </Typography>

            {/* Login Link */}
            {verify && (
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    fontWeight: 600,
                    borderRadius: 2,
                    padding: "12px",
                  }}
                >
                  Login to Continue
                </Button>
              </Link>
            )}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default EmailVerifyPage;
