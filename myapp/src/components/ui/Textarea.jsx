import React from "react";

const Textarea = ({ value, onChange, placeholder }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="mt-4 w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
    />
  );
};

export default Textarea;
