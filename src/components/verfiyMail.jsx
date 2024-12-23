import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const EmailVerifyPage = () => {
  const { verifytoken } = useParams(); // Retrieve token from route parameters
  const [verify, setVerify] = useState(""); // State to display the verification message

  // API endpoint with the dynamic token
  const url = `https://stroytime-backend.onrender.com/api/users/verifyEmail/${verifytoken}`;

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
      <section className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-md text-center mt-7">
            <div>
              <figure>
                <Link to="/home">
                  <section className="hero container max-w-screen-lg mx-auto flex justify-center">
                    <img
                      className="hidden lg:block h-8 w-auto mr-2"
                      src="/images/logo.svg"
                      alt="Workflow"
                    />
                  </section>
                </Link>
                <figcaption className="mb-4">Storytime</figcaption>
              </figure>
            </div>

            {/* Display verification status */}
            <p className="text-2xl font-semibold md:text-3xl mb-3">{verify}</p>

            {/* Login Link */}
            {verify && (
              <Link
                className="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900"
                to="/login"
              >
                Login to continue
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmailVerifyPage;