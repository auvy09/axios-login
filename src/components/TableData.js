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
  const [sortedData, setSortedData] = useState([]);
  const [order, setOrder] = useState("ASC");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;
  //fetch data
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

  useEffect(() => {
    // Set sortedData whenever data changes
    setSortedData([...data]);
  }, [data]);

  const handleEditUser = (user) => {
    localStorage.setItem("editedUser", JSON.stringify(user));
  };
  //search filter
  const filterData = () => {
    const lowerCaseSearch = search.toLowerCase();
    return sortedData.filter((item) => {
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

  // Calculate pagination
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentData = filteredData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  const changePage = (page) => {
    setCurrentPage(page);
  };
  //sorting
  const sorting = (col) => {
    const sortedArray = [...currentData].sort((a, b) => {
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

    // Replace only the sorted part of the currentData array
    const newData = [...filteredData];
    newData.splice(firstIndex, recordsPerPage, ...sortedArray);

    setSortedData(newData);
    setOrder(order === "ASC" ? "DSC" : "ASC");
  };
  // icon render
  const renderArrowIcon = () => {
    return order === "ASC" ? (
      <HiBarsArrowUp color="#3182CE" size={"20px"} />
    ) : (
      <HiBarsArrowDown color="#3182CE" size={"20px"} />
    );
  };

  return (
    <>
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

          <Link to={"/adduser"}>
            {" "}
            <Button
              mt={"20px"}
              size="sm"
              borderRadius={3.3}
              border="3px solid #949494"
              colorScheme="twitter"
              gap={"2px"}
            >
              <IoIosAdd fontWeight={"30px"} fontSize={"30px"} />
              Add user
            </Button>
          </Link>
        </Flex>
        <TableContainer mt="20px">
          <Table
            border={"1px"}
            borderColor="gray.400"
            size={{ base: "sm", md: "md" }}
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
              {currentData.map((item) => (
                <Tr key={item.id}>
                  <Td border={"1px"}>{item.name}</Td>
                  <Td border={"1px"}>{item.office_name || "N/A"}</Td>
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
                          <MenuItem
                            icon={<LiaUserEditSolid fontSize={"15px"} />}
                          >
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
        {/* paigination */}
        <nav>
          <ul
            style={{
              listStyleType: "none",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <li>
              <Button
                onClick={() => changePage(currentPage - 1)}
                isDisabled={currentPage === 1}
                colorScheme="twitter"
                size="sm"
                mx="1"
              >
                Prev
              </Button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index + 1}>
                <Button
                  onClick={() => changePage(index + 1)}
                  colorScheme={currentPage === index + 1 ? "twitter" : "gray"}
                  size="sm"
                  mx="1"
                >
                  {index + 1}
                </Button>
              </li>
            ))}
            <li>
              <Button
                onClick={() => changePage(currentPage + 1)}
                isDisabled={currentPage === totalPages}
                colorScheme="twitter"
                size="sm"
                mx="1"
              >
                Next
              </Button>
            </li>
          </ul>
        </nav>
      </VStack>
      <VStack direction={""}> </VStack>
    </>
  );
};

export default TableData;
