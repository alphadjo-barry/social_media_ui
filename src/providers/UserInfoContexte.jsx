import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

const UserInfoContexte = createContext();

const UserInfoProvider = ({ children }) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            try {
                const decoded_token = jwtDecode(token);
                const info = {
                    fullName: decoded_token.fullName,
                    picturePath: decoded_token.picturePath,
                    userId: decoded_token.userId
                };
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setUser(info);
            } catch (error) {
                console.error("Erreur décodage token :", error);
            }
        }
    }, []);

    return (
        <UserInfoContexte.Provider value={{ user, setUser }}>
            {children}
        </UserInfoContexte.Provider>
    );
};

export { UserInfoProvider, UserInfoContexte };
