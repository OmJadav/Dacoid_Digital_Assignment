import React from "react";

const Input = ({ type = "text", value, onChange, placeholder }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
    />
  );
};

export default Input;
