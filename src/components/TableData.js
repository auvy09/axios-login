import React, { useEffect, useState } from "react";
import { HiBarsArrowDown, HiBarsArrowUp } from "react-icons/hi2";

import { LiaUserEditSolid } from "react-icons/lia";
import { MdDeleteForever } from "react-icons/md";

import baseURL from "../axiosConfig";
import {
  Button,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import {
  IoIosAdd,
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosSearch,
  IoMdMore,
} from "react-icons/io";
import { Link, Navigate } from "react-router-dom";

const TableData = () => {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState("ASC");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const jwtToken = localStorage.getItem("token");
      if (jwtToken) {
        try {
          baseURL.interceptors.request.use((config) => {
            config.headers.Authorization = `Bearer ${jwtToken}`;
            return config;
          });

          const res = await baseURL.get("/user");
          setData(res.data.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        console.error("Token not found in local storage");
      }
    };
    fetchData();
  }, []);

  const sorting = (col) => {
    const sortedData = [...data].sort((a, b) => {
      const valA = a[col] != null ? a[col].toLowerCase() : null;
      const valB = b[col] != null ? b[col].toLowerCase() : null;

      if (valA === null || valB === null) {
        return order === "ASC" ? -1 : 1;
      }

      if (valA < valB) {
        return order === "ASC" ? -1 : 1;
      }
      if (valA > valB) {
        return order === "ASC" ? 1 : -1;
      }
      return 0;
    });

    setData(sortedData);
    setOrder(order === "ASC" ? "DSC" : "ASC");
  };

  const renderArrowIcon = () => {
    return order === "ASC" ? (
      <HiBarsArrowUp color="gray" size={"20px"} />
    ) : (
      <HiBarsArrowDown color="gray" size={"20px"} />
    );
  };

  const filterData = () => {
    const lowerCaseSearch = search.toLowerCase();
    return data.filter((item) => {
      return (
        lowerCaseSearch === "" ||
        (item.name && item.name.toLowerCase().includes(lowerCaseSearch)) ||
        (item.office_name &&
          item.office_name.toLowerCase().includes(lowerCaseSearch)) ||
        (item.phone_number &&
          item.phone_number.toLowerCase().includes(lowerCaseSearch))
      );
    });
  };

  const filteredData = filterData();

  return (
    <VStack
      mx={{ base: "0", md: "150px" }}
      justifyContent="center"
      alignItems="center"
    >
      <InputGroup mt={"20px"} borderRadius={7} size="sm">
        <InputLeftElement
          pointerEvents="none"
          children={<IoIosSearch color="gray.600" />}
        />
        <Input
          type="text"
          placeholder="Search..."
          onChange={(event) => setSearch(event.target.value)}
          border="1px solid #949494"
        />
        <InputRightAddon p={0} border="none">
          <Button
            size="sm"
            borderLeftRadius={0}
            borderRightRadius={3.3}
            border="1px solid #949494"
            colorScheme="whatsapp"
          >
            Search
          </Button>
        </InputRightAddon>
      </InputGroup>

      <Button
        size="sm"
        borderRadius={3.3}
        border="3px solid #949494"
        colorScheme="twitter"
        gap={"2px"}
      >
        <IoIosAdd fontWeight={"30px"} fontSize={"15px"} />
        <Link to={"/adduser"}>Add user</Link>
      </Button>

      <TableContainer mt="20px">
        <Table
          border={"1px"}
          borderColor="gray.400"
          size={{ base: "sm", md: "md" }}
          variant="simple"
        >
          <TableCaption>Data of users</TableCaption>
          <Thead>
            <Tr>
              <Th border={"1px"}>
                <IconButton
                  mr={{ base: "2px", md: "7px" }}
                  onClick={() => sorting("name")}
                  icon={renderArrowIcon()}
                  bg={"white"}
                  _hover={{ background: "white" }}
                />{" "}
                Name
              </Th>

              <Th border={"1px"}>
                <IconButton
                  mr={"7px"}
                  onClick={() => sorting("office_name")}
                  icon={renderArrowIcon()}
                  bg={"white"}
                  _hover={{ background: "white" }}
                />
                Office Name
              </Th>

              <Th border={"1px"}>
                <IconButton
                  mr={"7px"}
                  icon={renderArrowIcon()}
                  onClick={() => sorting("phone_number")}
                  bg={"white"}
                  _hover={{ background: "white" }}
                />
                Phone Number
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredData.map((item) => (
              <Tr key={item.id}>
                <Td border={"1px"}>{item.name}</Td>
                <Td border={"1px"}>{item.office_name}</Td>
                <Td border={"1px"}>{item.phone_number}</Td>
                <Td border={"1px"}>
                  {" "}
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label="Options"
                      icon={<IoMdMore />}
                      variant="outline"
                    />
                    <MenuList>
                      <MenuItem icon={<IoIosAdd fontSize={"15px"} />}>
                        Add User
                      </MenuItem>
                      <MenuItem icon={<LiaUserEditSolid fontSize={"15px"} />}>
                        Edit User
                      </MenuItem>
                      <MenuItem icon={<MdDeleteForever fontSize={"15px"} />}>
                        Delete User
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
};

export default TableData;
