import { createContext, useState } from "react";

export const TodoContext = createContext();

export const TodoContextProvider = ({ children }) => {
  const [startDateTime, setStartDateTime] = useState();
  const [endDateTime, setEndDateTime] = useState();

  const contextValue = {
    startDateTime,
    setStartDateTime,
    endDateTime,
    setEndDateTime
  };

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};
