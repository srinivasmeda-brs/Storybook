import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children, onlyForAuthors = false, onlyForUsers = false }) => {
  const sessionToken = Cookies.get("sessionToken");
  const isAuthor = Cookies.get("isAuthor") === "true"; // Convert string to boolean

  // Redirect to login if not authenticated
  if (!sessionToken) {
    return <Navigate to="/login" replace />;
  }

  // Restrict author-only routes
  if (onlyForAuthors && !isAuthor) {
    return <Navigate to="/user" replace />;
  }

  // Restrict user-only routes
  if (onlyForUsers && isAuthor) {
    return <Navigate to="/storybook" replace />;
  }

  return children; // Render the protected component
};

export default ProtectedRoute;
