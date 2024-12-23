import React from "react";
import { Button } from "./Button";

const Dialog = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96 dark:bg-gray-800 dark:text-white">
        <Button
          onClick={onClose}
          className=" bg-red-500 text-white dark:bg-red-500 mb-3 hover:bg-red-600 dark:hover:bg-red-600"
        >
          Close ✕
        </Button>
        {children}
      </div>
    </div>
  );
};

export default Dialog;
