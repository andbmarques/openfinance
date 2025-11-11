import React, { useContext } from "react";
import { HStack, Heading, Icon, IconButton, Text } from "@chakra-ui/react";
import { Bug, Cardholder, Gear, Moon, Sun } from "phosphor-react";
import { useColorMode } from "../../components/ui/color-mode.jsx";
import { dataContext } from "../context/data.context.jsx";

export default function Topbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { data } = useContext(dataContext)

  function printData(e) {
    e.preventDefault()
    console.log(data)
  }

  return (
    <>
      <HStack w="100%" px="4" justify="space-between" alignItems="center">
        <HStack>
          <Icon size="lg">
            <Cardholder weight="fill" />
          </Icon>
          <Heading fontWeight="thin">OpenFinance</Heading>
        </HStack>
        <HStack alignItems="center">
          <IconButton onClick={toggleColorMode} variant="ghost" size="2xs">
            {colorMode === "dark" ? (
              <Sun weight="fill" />
            ) : (
              <Moon weight="fill" />
            )}
          </IconButton>
          <IconButton onClick={printData} variant="ghost" size="2xs">
            <Gear weight="fill" />
          </IconButton>
          <IconButton onClick={printData} variant="ghost" size="2xs">
            <Bug weight="fill" />
          </IconButton>
          <Text color="gray.500" fontSize="xs">v0.1A</Text>
        </HStack>
      </HStack>
    </>
  );
}
