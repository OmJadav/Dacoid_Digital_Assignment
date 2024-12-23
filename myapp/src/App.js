import React from "react";
import { Navbar } from "./components/ui/Navbar";
import CalendarApp from "./Pages/CalendarApp";

function App() {
  return (
    <>
      <Navbar />
      <hr className="border-2 border-black dark:border-white" />
      <main className="h-screen p-4 bg-background text-text dark:bg-background-dark dark:text-text-dark ">
        <CalendarApp />
      </main>
    </>
  );
}

export default App;
