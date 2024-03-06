import "./AccessDenied.css";
import { useEffect, useState } from "react";

function AccessDenied() {
  const [loading, setLoading] = useState(true); // State variable to track loading status

  useEffect(() => {
    const checkIfUserIsLoggedIn = async () => {
      try {
        const response = await fetch("http://localhost:3000/auth/whoami", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${document.cookie.split("=")[1]}`,
          },
        });

        if (response.ok) {
          setLoading(false); // Set loading status to false when data fetch is complete
          return true; // User is logged in
        } else {
          // User is not logged in
          setLoading(false); // Set loading status to false when data fetch is complete
        }
      } catch (error) {
        console.error("Error checking user login status:", error);
        setLoading(false); // Set loading status to false when data fetch is complete
      }
    };

    async function checkUserPermission() {
      const isLoggedIn = await checkIfUserIsLoggedIn();
      if (!isLoggedIn) {
        setLoading(false);

        window.location.href = "/login"; // Redirect to login page if user is not logged in
      }
    }
    

    checkUserPermission().then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <div className="access-denied">
      {loading ? ( // Render loader if loading is true
        <div className="loader">Loading...</div>
      ) : (
        // Render content if loading is false
        <>
          <h1 className="access-denied__title">Access Denied</h1>
          <p className="access-denied__message">Sorry, you do not have permission to access this page.</p>
          <p className="access-denied__message">Please contact your administrator for further assistance.</p>
          <p className="access-denied__message">
            If you believe this is a mistake, you can <a href="/login" className="access-denied__link">login</a> to gain access.
          </p>
        </>
      )}
    </div>
  );
}

export default AccessDenied;
