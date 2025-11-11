import React, { createContext, useState, useEffect } from "react";

export const dataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [page, setPage] = useState("dashboard");
  const [data, setData] = useState({
    transactions: [],
    categories: [
      {
        id: Date.now(),
        name: "Mercado",
        type: "expense",
        color: "#2563eb"
      },
      {
        id: Date.now() + 1,
        name: "Salario",
        type: "income",
        color: "#dc2626"
      }
    ]
  });

  useEffect(() => {
    const savedData = localStorage.getItem("appData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setData(parsedData);
      } catch (error) {
        console.error("Erro ao carregar dados do localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("appData", JSON.stringify(data));
  }, [data]);

  const setDataWithPersist = (newData) => {
    setData(newData);
  };

  return (
    <dataContext.Provider
      value={{
        data,
        setData: setDataWithPersist,
        page,
        setPage,
      }}
    >
      {children}
    </dataContext.Provider>
  );
};
