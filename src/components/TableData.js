import React, { useEffect, useState } from "react";
import { HiBarsArrowDown, HiBarsArrowUp } from "react-icons/hi2";

import { LiaUserEditSolid } from "react-icons/lia";
import { MdDeleteForever } from "react-icons/md";

import baseURL from "../axiosConfig";
import {
  Button,
  Flex,
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
import { IoIosAdd, IoIosSearch, IoMdMore } from "react-icons/io";
import { Link } from "react-router-dom";

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
      <HiBarsArrowUp color="#3182CE" size={"20px"} />
    ) : (
      <HiBarsArrowDown color="#3182CE" size={"20px"} />
    );
  };
  const handleEditUser = (user) => {
    // Save the user data to local storage
    localStorage.setItem("editedUser", JSON.stringify(user));
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
      <Flex justify={"space-between"} w="83%" dir="row">
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
            _placeholder={"Search"}
          />
          <InputRightAddon p={0} border="none"></InputRightAddon>
        </InputGroup>

        <Button
          mt={"20px"}
          size="sm"
          borderRadius={3.3}
          border="3px solid #949494"
          colorScheme="twitter"
          gap={"2px"}
        >
          <IoIosAdd fontWeight={"30px"} fontSize={"30px"} />
          <Link to={"/adduser"}>Add user</Link>
        </Button>
      </Flex>
      <TableContainer mt="20px">
        <Table
          border={"1px"}
          borderColor="gray.400"
          size={{ base: "sm", md: "md" }}
          variant="simple"
        >
          <TableCaption>Data of users</TableCaption>
          <Thead>
            <Tr backgroundColor={"gray.200"}>
              <Th border={"1px"}>
                <IconButton
                  mr={{ base: "2px", md: "7px" }}
                  onClick={() => sorting("name")}
                  icon={renderArrowIcon()}
                  bg={"gray.200"}
                  _hover={{ background: "gray.300" }}
                />{" "}
                Name
              </Th>

              <Th border={"1px"}>
                <IconButton
                  mr={"7px"}
                  onClick={() => sorting("office_name")}
                  icon={renderArrowIcon()}
                  bg={"gray.200"}
                  _hover={{ background: "gray.300" }}
                />
                Office Name
              </Th>

              <Th border={"1px"}>
                <IconButton
                  mr={"7px"}
                  icon={renderArrowIcon()}
                  onClick={() => sorting("phone_number")}
                  bg={"gray.200"}
                  _hover={{ background: "gray.300" }}
                />
                Phone Number
              </Th>
              <Th border={"1px"}>Action</Th>
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
                      <Link to={"/adduser"}>
                        <MenuItem icon={<IoIosAdd fontSize={"15px"} />}>
                          Add user
                        </MenuItem>
                      </Link>
                      <Link
                        to={"/edituser"}
                        state={{ user: item }}
                        onClick={() => handleEditUser(item)}
                      >
                        {" "}
                        <MenuItem icon={<LiaUserEditSolid fontSize={"15px"} />}>
                          Edit User
                        </MenuItem>
                      </Link>
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
