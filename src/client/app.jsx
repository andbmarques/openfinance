import React from "react";
import { useContext } from "react";
import Topbar from "./components/topbar.jsx";
import { VStack } from "@chakra-ui/react";
import NavDash from "./components/navdash.jsx";
import { appContext } from "./context/app.context.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Transactions from "./pages/transactions.jsx";
import Categories from "./pages/categories.jsx";
import "./index.css";
import { Toaster } from "../components/ui/toaster.jsx";

export default function App() {
  const { page, setPage } = useContext(appContext);

  return (
    <VStack w="100%" p="8" gap="8">
      <Topbar />
      <NavDash />
      {page === "dashboard" ? <Dashboard /> : <></>}
      {page === "transactions" ? <Transactions /> : <></>}
      {page === "categories" ? <Categories /> : <></>}
      <Toaster />
    </VStack>
  );
}
