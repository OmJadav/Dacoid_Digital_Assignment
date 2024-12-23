import React, { useState } from "react";
import { Button } from "./Button";
import { MdOutlineWbSunny, MdOutlineDarkMode } from "react-icons/md";
import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

export function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="flex flex-col sm:flex-row items-center justify-between p-4 shadow-md bg-background text-text dark:bg-background-dark dark:text-text-dark">
      <div className="text-xl font-bold mb-2 sm:mb-0">
        Dynamic Event Calendar
      </div>
      <div className="flex items-center gap-4">
        <a
          href="https://github.com/omjadav"
          target="_blank"
          rel="noreferrer noopener"
          className="flex items-center space-x-2 text-xl  transition duration-300"
        >
          <FaGithubSquare className="dark:text-white text-2xl" />
          <span className="sm:block hidden">Github</span>
        </a>
        <a
          href="https://www.linkedin.com/in/om-jadav-9456b4226/"
          target="_blank"
          rel="noreferrer noopener"
          className="flex items-center space-x-2 text-xl  transition duration-300"
        >
          <FaLinkedin className="dark:text-white text-2xl" />
          <span className="sm:block hidden">LinkedIn</span>
        </a>
        <Button onClick={toggleDarkMode}>
          {!isDarkMode ? "Dark" : "Light"}
          {!isDarkMode ? (
            <MdOutlineDarkMode className="ml-2" />
          ) : (
            <MdOutlineWbSunny className="ml-2" />
          )}
        </Button>
      </div>
    </nav>
  );
}
