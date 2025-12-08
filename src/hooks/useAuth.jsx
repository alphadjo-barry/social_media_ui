import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      try {
        const decoded_token = jwtDecode(token);
        const now = Date.now() / 1000;

        if (decoded_token.exp && decoded_token.exp > now) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
          setIsAuthenticated(true);
        }
          // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setIsAuthenticated(false);
        Cookies.remove("token");
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return {
    isAuthenticated
  };
}
