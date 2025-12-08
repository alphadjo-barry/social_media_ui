import { useContext } from "react";
import {ThemeContext} from "../../hooks/useTheme.jsx";

const ThemeToggle = () => {
    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <a
            href="#"
            className="me-4 text-reset"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
            <i className={theme === "light" ? "fas fa-moon" : "fas fa-sun"}></i>
        </a>
    );
};

export default ThemeToggle;
