import {
  Button,
  HStack,
  Heading,
  Icon,
  NativeSelect,
  VStack,
} from "@chakra-ui/react";
import {
  ArrowFatDown,
  ArrowFatUp,
  Scales,
} from "phosphor-react";
import React, { useContext, useEffect, useState } from "react";
import { appContext } from "../context/app.context.jsx";
import { dataContext } from "../context/data.context.jsx";

const date = new Date()

export default function NavDash() {
  const { page, setPage, currentDate, setCurrentDate } = useContext(appContext);
  const { data, setData } = useContext(dataContext);

  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  function handleIncome() {
    const totalIncome = data.transactions.reduce((acc, item) => {
      const [year, month] = item.date.split("-");
      const transactionMonth = `${month}/${year}`;
      if (item.type === "income" && transactionMonth === currentDate) {
        return acc + Number(item.value);
      }
      return acc;
    }, 0);

    setIncome(totalIncome);
  }

  function handleExpense() {
    const totalExpense = data.transactions.reduce((acc, item) => {
      const [year, month] = item.date.split("-");
      const transactionMonth = `${month}/${year}`;
      if (item.type === "expense" && transactionMonth === currentDate) {
        return acc + Number(item.value);
      }
      return acc;
    }, 0);

    setExpense(totalExpense);
  }

  function handleBalance() {
    setBalance(income - expense);
  }

  function handleCalendarChange(e) {
    setCurrentDate(e.target.value)
  }

  useEffect(() => {
    handleIncome();
    handleExpense();
    handleBalance();
    if (currentDate === null) setCurrentDate("")
  }, [data, income, expense, currentDate]);

  return (
    <VStack w="100%" gap="4">
      <HStack w="100%">
        <VStack
          bg="blue.600"
          p="8"
          rounded="sm"
          w="100%"
          justify="center"
          align="start"
          gap="0"
          h="32"
        >
          <HStack>
            <Icon color="blue.200">
              <Scales weight="fill" />
            </Icon>
            <Heading size="2xl" fontWeight="medium" color="white">
              Balanço
            </Heading>
          </HStack>
          <Heading size="4xl" fontWeight="black" color="white">
            R${balance.toFixed(2)}
          </Heading>
        </VStack>
        <VStack
          bg="green.600"
          p="8"
          rounded="sm"
          w="100%"
          justify="center"
          align="start"
          gap="0"
          h="32"
        >
          <HStack>
            <Icon color="green.200">
              <ArrowFatUp weight="fill" />
            </Icon>
            <Heading size="2xl" fontWeight="medium" color="white">
              Receitas
            </Heading>
          </HStack>
          <Heading size="4xl" fontWeight="black" color="white">
            R${income.toFixed(2)}
          </Heading>
        </VStack>
        <VStack
          bg="red.600"
          p="8"
          rounded="sm"
          w="100%"
          justify="center"
          align="start"
          gap="0"
          h="32"
        >
          <HStack>
            <Icon color="red.200">
              <ArrowFatDown weight="fill" />
            </Icon>
            <Heading size="2xl" fontWeight="medium" color="white">
              Despesas
            </Heading>
          </HStack>
          <Heading size="4xl" fontWeight="black" color="white">
            R${expense.toFixed(2)}
          </Heading>
        </VStack>
      </HStack>
      <HStack w="100%" align="start">
        <NativeSelect.Root size="xs" width="240px">
          <NativeSelect.Field
            value={currentDate}
            onChange={handleCalendarChange}
          >
            {data &&
              [
                ...new Set(
                  data.transactions.map((item) => {
                    const [year, month] = item.date.split("-");
                    return `${month}/${year}`;
                  }),
                ),
              ]
                .sort((a, b) => {
                  const [mesA, anoA] = a.split("/").map(Number);
                  const [mesB, anoB] = b.split("/").map(Number);

                  return anoA - anoB || mesA - mesB;
                })
                .map((mesAno, index) => (
                  <option value={mesAno} key={index}>
                    {mesAno}
                  </option>
                ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
        <Button
          onClick={() => setPage("dashboard")}
          size="xs"
          variant="ghost"
          color={page === "dashboard" ? "blue.500" : ""}
        >
          Dashboard
        </Button>
        <Button
          onClick={() => setPage("transactions")}
          size="xs"
          variant="ghost"
          color={page === "transactions" ? "blue.500" : ""}
        >
          Transações
        </Button>
        <Button
          onClick={() => setPage("invoice")}
          size="xs"
          variant="ghost"
          color={page === "invoice" ? "blue.500" : ""}
        >
          Fatura
        </Button>
        <Button
          onClick={() => setPage("categories")}
          size="xs"
          variant="ghost"
          color={page === "categories" ? "blue.500" : ""}
        >
          Categorias
        </Button>
      </HStack>
    </VStack>
  );
}
