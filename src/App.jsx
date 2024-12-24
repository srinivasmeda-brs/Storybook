import { Routes, Route } from "react-router-dom";
import CreateStoryPage from "./components/Createpage";
import StoryList from "./components/StoriesList";
import Publish from "./components/Publish";
import Login from "./components/login";
import EditStoryPage from "./components/Editpage";
import ProtectedRoute from "./components/ProtectdRoute";
import Register from './components/Register';
import User from "./components/User";
import TrendingStories from "./components/TrendingStories";
import EmailVerifyPage from "./components/verfiyMail";
const App = () => {
  
  return (
    <div>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verifyEmail/:verifytoken" element={<EmailVerifyPage />} />

        {/* Author-only routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute onlyForAuthors={true}>
              <StoryList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/publish"
          element={
            <ProtectedRoute onlyForAuthors={true}>
              <Publish />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute onlyForAuthors={true}>
              <EditStoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute onlyForAuthors={true}>
              <CreateStoryPage />
            </ProtectedRoute>
          }
        />

        {/* User-only route */}
        <Route
          path="/user"
          element={
            <ProtectedRoute onlyForUsers={true}>
              <User />
            </ProtectedRoute>
          }
        />
        <Route 
        path="/trending-stories"
        element={
            <ProtectedRoute onlyForUsers={true}>
              <TrendingStories />
            </ProtectedRoute>
          }
          />

      </Routes>
    </div>
  );

};

export default App;
