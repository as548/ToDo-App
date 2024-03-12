import React, { useState, useEffect } from "react";

const AlertMessage = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (message) {
      const timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [message, type]);

  return (
    <>
      {isVisible && message && (
        <div className={`alert alert-${type} shadow-lg mb-5 w-full show`}>
          <div>
            <span>{message}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default AlertMessage;
