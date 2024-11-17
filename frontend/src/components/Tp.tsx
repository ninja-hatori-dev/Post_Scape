import  { useState } from "react";

export const Tp = () => {
  const [buttons, setButtons] = useState<number[]>([]); // Array to store button indices

  const handleAddButton = () => {
    setButtons([...buttons, buttons.length + 1]); // Add a new button index
  };

  return (
    <div>
      <button 
        onClick={handleAddButton} 
        className="p-2 bg-blue-500 text-white rounded"
      >
        Add Button
      </button>

      <div className="flex flex-wrap gap-2 mt-4">
        {buttons.map((button, index) => (
          <button 
            key={index} 
            className="p-2 bg-gray-300 rounded"
          >
            Button {button}
          </button>
        ))}
      </div>
    </div>
  );
};


