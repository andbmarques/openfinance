import React, { createContext, useState, useEffect } from "react";

export const appContext = createContext();

const date = new Date();

export const AppContextProvider = ({ children }) => {
  const [page, setPage] = useState("dashboard");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const savedDate = localStorage.getItem("currentDate");
    if (savedDate) {
      try {
        const parsedDate = JSON.parse(savedDate);
        setCurrentDate(parsedDate);
      } catch (error) {
        console.error("Erro ao carregar currentDate:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("currentDate", JSON.stringify(currentDate));
  }, [currentDate]);

  return (
    <appContext.Provider value={{ page, setPage, currentDate, setCurrentDate }}>
      {children}
    </appContext.Provider>
  );
};
