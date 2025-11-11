import {
  Button,
  CloseButton,
  Drawer,
  Field,
  HStack,
  Input,
  InputGroup,
  NativeSelect,
  Portal,
  VStack,
} from "@chakra-ui/react";
import { Plus } from "phosphor-react";
import React, { useContext, useState } from "react";
import { dataContext } from "../context/data.context.jsx";
import { appContext } from "../context/app.context.jsx";

export default function NewTransactionDrawer({ open, setOpen }) {
  const { data, setData } = useContext(dataContext);
  const { setCurrentDate } = useContext(appContext)

  const [title, setTitle] = useState("");
  const [value, setValue] = useState(0);
  const [type, setType] = useState("expense");
  const [date, setDate] = useState(Date.now());
  const [category, setCategory] = useState("");

  function handleCreate() {
    if (title && value && type && date && category) {
      setData((prevData) => ({
        ...prevData,
        transactions: [
          ...prevData.transactions,
          { title, value, type, date, category, id: Date.now() },
        ],
      }));
      setTitle("");
      setValue(0);
      setType("expense");
      setDate(Date.now());
      setCategory("");
      setOpen(false);
      setCurrentDate(`${date.split("-")[1]}/${date.split("-")[0]}`)
    }
  }

  return (
    <Drawer.Root
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      placement="bottom"
    >
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner p="8">
          <Drawer.Content>
            <Drawer.Header>
              <Plus />
              <Drawer.Title>Nova Transação</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body w="100%">
              <VStack gap="4" w="100%" py="4">
                <HStack gap="4" w="100%">
                  <Field.Root required>
                    <Field.Label>Descrição</Field.Label>
                    <Input
                      type="text"
                      placeholder="Mercado"
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                    />
                  </Field.Root>
                  <Field.Root required>
                    <Field.Label>Valor</Field.Label>
                    <InputGroup startElement="R$">
                      <Input
                        type="number"
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                      />
                    </InputGroup>
                  </Field.Root>
                </HStack>
                <HStack gap="4" w="100%">
                  <Field.Root required>
                    <Field.Label>Data</Field.Label>
                    <Input
                      type="date"
                      lang="pt-BR"
                      onChange={(e) => setDate(e.target.value)}
                      value={date}
                    />
                  </Field.Root>
                  <Field.Root required>
                    <Field.Label>Tipo</Field.Label>
                    <NativeSelect.Root
                      onChange={(e) => setType(e.target.value)}
                      value={type}
                    >
                      <NativeSelect.Field>
                        <option value="expense">Despesa</option>
                        <option value="income">Receita</option>
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field.Root>
                  <Field.Root required>
                    <Field.Label>Categoria</Field.Label>
                    <NativeSelect.Root
                      onChange={(e) => setCategory(e.target.value)}
                      value={category}
                    >
                      <NativeSelect.Field placeholder="Categoria">
                        {
                          data && data.categories.filter(el => el.type == type).map((itemCategory, index) => {
                            return <option key={index} value={itemCategory.id}>{itemCategory.name}</option>
                          })
                        }
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field.Root>
                </HStack>
              </VStack>
            </Drawer.Body>
            <Drawer.Footer>
              <Button variant="outline">Cancelar</Button>
              <Button onClick={handleCreate}>Salvar</Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}
