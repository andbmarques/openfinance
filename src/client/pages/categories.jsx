import { Box, Button, ColorPicker, HStack, IconButton, Input, NativeSelect, parseColor, Portal, Table, VStack } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { dataContext } from "../context/data.context.jsx";
import { Check, Circle, Pencil, Trash } from "phosphor-react";
import { toaster } from "../../components/ui/toaster.jsx"

export default function Categories() {

    const swatches = ["#000000", "#4A5568", "#F56565", "#ED64A6", "#9F7AEA", "#6B46C1", "#4299E1", "#0BC5EA", "#00B5D8", "#38B2AC", "#48BB78", "#68D391", "#ECC94B", "#DD6B20"]

    const { data, setData } = useContext(dataContext)

    const [name, setName] = useState("")
    const [type, setType] = useState("expense")
    const [color, setColor] = useState()

    function handleColorChange(e) {
        setColor(e.target.value)
    }

    function handleDelete(id) {
        const transactionsWithCategory = data.transactions.filter(el => el.category == id)
        if (transactionsWithCategory.length == 0) {
            const newCategories = data.categories.filter(el => el.id != id)
            setData((prevData) => ({
                ...prevData,
                categories: newCategories
            }))
        } else {
            toaster.create({
                description: "Exitem transações com esta categoria!",
                type: "error",
                closable: true
            })
        }
    }

    function handleCreate() {
        if (name && type) {
            setData((prevData) => ({
                ...prevData,
                categories: [
                    ...prevData.categories,
                    {
                        id: Date.now(),
                        name: name,
                        type: type,
                        color: color ? color : "#2563eb"
                    }
                ]
            }))
        }
    }

    return (
        <VStack w="100%">
            <HStack w="100%" justify="start" px="2">
                <Input type="text" placeholder="Nome da categoria..." value={name} onChange={e => setName(e.target.value)} size="xs" />
                <NativeSelect.Root value={type} onChange={e => setType(e.target.value)} size="xs">
                    <NativeSelect.Field>
                        <option value="expense">Despesa</option>
                        <option value="income">Receita</option>
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                </NativeSelect.Root>
                <ColorPicker.Root onChange={handleColorChange} defaultValue={parseColor("#2563eb")} size="xs">
                    <ColorPicker.HiddenInput />
                    <ColorPicker.Control>
                        <ColorPicker.Trigger px="2">
                            <ColorPicker.ValueSwatch boxSize="6" />
                        </ColorPicker.Trigger>
                    </ColorPicker.Control>
                    <Portal>
                        <ColorPicker.Positioner>
                            <ColorPicker.Content>
                                <ColorPicker.Area />
                                <HStack>
                                    <ColorPicker.EyeDropper size="sm" variant="outline" />
                                    <ColorPicker.Sliders />
                                    <ColorPicker.ValueSwatch />
                                </HStack>
                                <ColorPicker.SwatchGroup>
                                    {swatches.map((item) => (
                                        <ColorPicker.SwatchTrigger key={item} value={item}>
                                            <ColorPicker.Swatch boxSize="4.5" value={item}>
                                                <ColorPicker.SwatchIndicator>
                                                    <Check />
                                                </ColorPicker.SwatchIndicator>
                                            </ColorPicker.Swatch>
                                        </ColorPicker.SwatchTrigger>
                                    ))}
                                </ColorPicker.SwatchGroup>
                            </ColorPicker.Content>
                        </ColorPicker.Positioner>
                    </Portal>
                </ColorPicker.Root>
                <Button variant="outline" size="xs" onClick={handleCreate}>Adicionar</Button>
            </HStack>
            <VStack w="100%" px="2">
                <Table.Root w="100%">
                    <Table.Caption />
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader>Cor</Table.ColumnHeader>
                            <Table.ColumnHeader w="50%">Nome</Table.ColumnHeader>
                            <Table.ColumnHeader>Tipo</Table.ColumnHeader>
                            <Table.ColumnHeader>Ações</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            data && data.categories.map((item, index) => {
                                return <Table.Row key={index} >
                                    <Table.Cell>
                                        <Circle weight="fill" color={item.color} />
                                    </Table.Cell>
                                    <Table.Cell>
                                        {item.name}
                                    </Table.Cell>
                                    <Table.Cell
                                        color={
                                            item.type === "expense" ? "red.500" : "green.500"
                                        }
                                    >
                                        {item.type === "expense" ? "Despesa" : "Receita"}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <IconButton
                                            variant="ghost"
                                            size="xs"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            <Trash />
                                        </IconButton>
                                    </Table.Cell>
                                </Table.Row>
                            })
                        }
                    </Table.Body>
                </Table.Root>
            </VStack>
        </VStack>
    )
}