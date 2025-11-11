import React, { useContext, useEffect, useState } from "react";

import {
  Button,
  Checkbox,
  HStack,
  IconButton,
  Table,
  VStack,
} from "@chakra-ui/react";
import { Circle, Pencil, Plus, Trash } from "phosphor-react";
import { dataContext } from "../context/data.context.jsx";
import NewTransactionDrawer from "../overlays/newtransaction.jsx";
import { appContext } from "../context/app.context.jsx";
import EditTransactionDrawer from "../overlays/editTransaction.jsx";

export default function Transactions() {
  const { data, setData } = useContext(dataContext);
  const { currentDate, setCurrentDate } = useContext(appContext);

  const [newTransactionOpen, setNewTransactionOpen] = useState(false);
  const [editTransactionOpen, setEditTransactionOpen] = useState(false)
  const [currentTransaction, setCurrentTransaction] = useState()

  function handleOpenNewTransaction(e) {
    e.preventDefault();
    setNewTransactionOpen(true);
  }

  function handleOpenEditTransaction(e, id) {
    e.preventDefault()
    setCurrentTransaction(id)
    setEditTransactionOpen(true)
  }

  function handleDelete(id) {
  const newTransactions = data.transactions.filter(transaction => transaction.id !== id);

  const currentDateObj = new Date(currentDate);
  const currentMonth = currentDateObj.getMonth();
  const currentYear = currentDateObj.getFullYear();

  const hasTransactionsInCurrentMonth = newTransactions.some(t => {
    const transactionDate = new Date(t.date);
    return transactionDate.getMonth() === currentMonth &&
      transactionDate.getFullYear() === currentYear;
  });

  let newCurrentDate = currentDate;

  if (!hasTransactionsInCurrentMonth) {
    if (newTransactions.length > 0) {
      const mostRecentDate = newTransactions.reduce((mostRecent, transaction) => {
        const currentDate = new Date(transaction.date);
        const mostRecentDateObj = new Date(mostRecent);
        return currentDate > mostRecentDateObj ? transaction.date : mostRecent;
      }, newTransactions[0].date);

      newCurrentDate = mostRecentDate;
    } else {
      newCurrentDate = null;
    }
  }

  setData({
    ...data,
    transactions: newTransactions,
  });

  if (newCurrentDate) {
    const dateObj = new Date(newCurrentDate);
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    const formattedDate = `${month}/${year}`;
    setCurrentDate(formattedDate);
  } else {
    setCurrentDate(null);
  }
}

  useEffect(() => {}, [data]);

  return (
    <VStack w="100%" gap="4">
      <HStack w="100%" justify="start" px="2">
        <Button variant="outline" size="xs" onClick={handleOpenNewTransaction}>
          <Plus /> Nova
        </Button>
        <Button variant="outline" size="xs">
          <Trash /> Deletar
        </Button>
      </HStack>
      <VStack w="100%" px="2">
        <Table.Root striped>
          <Table.Caption />
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>
                <Checkbox.Root size="md">
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                </Checkbox.Root>
              </Table.ColumnHeader>
              <Table.ColumnHeader>Data</Table.ColumnHeader>
              <Table.ColumnHeader w="35%">Desc</Table.ColumnHeader>
              <Table.ColumnHeader>Tipo</Table.ColumnHeader>
              <Table.ColumnHeader>Valor</Table.ColumnHeader>
              <Table.ColumnHeader></Table.ColumnHeader>
              <Table.ColumnHeader>Categoria</Table.ColumnHeader>
              <Table.ColumnHeader>Ações</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data &&
              data.transactions
                .filter((item) => {
                  //if (!currentDate) return true;
                  const [year, month] = item.date.split("-");
                  return `${month}/${year}` === currentDate;
                })
                .sort((a, b) => {
                  // Converte as datas para o formato Date para comparação
                  const [yearA, monthA, dayA] = a.date.split("-").map(Number);
                  const [yearB, monthB, dayB] = b.date.split("-").map(Number);

                  // Cria objetos Date para comparação
                  const dateA = new Date(yearA, monthA - 1, dayA); // mês -1 porque Date usa 0-11
                  const dateB = new Date(yearB, monthB - 1, dayB);

                  // Ordem crescente (mais antiga para mais recente)
                  return dateA - dateB;
                })
                .map((item, index) => {
                  return (
                    <Table.Row key={index}>
                      <Table.Cell>
                        <Checkbox.Root size="md">
                          <Checkbox.HiddenInput />
                          <Checkbox.Control />
                        </Checkbox.Root>
                      </Table.Cell>
                      <Table.Cell>
                        {item.date.split("-").reverse().join("/")}
                      </Table.Cell>
                      <Table.Cell>{item.title}</Table.Cell>
                      <Table.Cell
                        color={
                          item.type === "expense" ? "red.500" : "green.500"
                        }
                      >
                        {item.type === "expense" ? "Despesa" : "Receita"}
                      </Table.Cell>
                      <Table.Cell>
                        {item.type === "expense" ? "-" : ""}
                        R${item.value}
                      </Table.Cell>
                      <Table.Cell><Circle weight="fill" color={data.categories.find(el => el.id == item.category).color} /> </Table.Cell>
                      <Table.Cell dir="row">{data.categories.find(el => el.id == item.category).name}</Table.Cell>
                      <Table.Cell>
                        <IconButton variant="ghost" size="xs" onClick={(e) => handleOpenEditTransaction(e, item.id)}>
                          <Pencil />
                        </IconButton>
                        <IconButton
                          variant="ghost"
                          size="xs"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash />
                        </IconButton>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
          </Table.Body>
        </Table.Root>
      </VStack>
      <NewTransactionDrawer
        open={newTransactionOpen}
        setOpen={setNewTransactionOpen}
      />
      <EditTransactionDrawer 
        open={editTransactionOpen}
        setOpen={setEditTransactionOpen}
        id={currentTransaction}
      />
    </VStack>
  );
}
