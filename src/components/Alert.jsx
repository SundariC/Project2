import { useEffect, useState } from "react";

export default function Alert({ message, type = "info" }) {
  const [visible, setVisible] = useState(false);

  const bg =
    type === "success"
      ? "bg-green-50 border-green-400 text-green-700"
      : type === "error"
      ? "bg-red-50 border-red-400 text-red-700"
      : "bg-blue-50 border-blue-400 text-blue-700";

  useEffect(() => {
    // show animation
    setVisible(true);

    // auto hide animation
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000); // same as your timeout in App.jsx

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`
        fixed left-1/2 top-6 -translate-x-1/2 z-50 
        max-w-xs w-full px-4 py-3 rounded shadow-lg border
        transition-all duration-500 

        ${bg}
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}
      `}
    >
      <div className="text-sm font-medium text-center">{message}</div>
    </div>
  );
}
