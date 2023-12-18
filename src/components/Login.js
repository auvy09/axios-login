import React, { useState } from "react";
import brebLogo from "../breb_logo.png";
import loginPage from "../BREB login page.png";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Text,
  Image,
  Input,
  Button,
  useMediaQuery,
  VStack,
  Link,
  Checkbox,
  Heading,
  HStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import baseURL from "../axiosConfig";
import { Navigate } from "react-router-dom";
const Login = () => {
  const [displayImage] = useMediaQuery("(min-width: 50em)");
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await baseURL.post("/login", data);
      setUserData(res.data);

      console.log(res.data.data.token);
      setToken(res.data.data.token);
    } catch (err) {
      console.log(err);
    }

    reset();
  };
  console.log(token);
  localStorage.setItem("token", token);
  const userToken = localStorage.getItem("token");

  return (
    <Box>
      <Grid
        templateColumns="repeat(2,1fr)"
        templateRows="100vh"
        gap={{ base: 0, md: 2 }}
      >
        <GridItem>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex
              direction="column"
              height={"100vh"}
              align="center"
              justify={displayImage ? "center" : "flex-start"}
            >
              <Box>
                <Flex direction={"column"} align={"center"} justify={"center"}>
                  <Image mt={"80px"} mb={"9px"} w={"69px"} src={brebLogo} />
                  <Text
                    fontWeight={["500"]}
                    color={"#32398F"}
                    fontSize={"24px"}
                  >
                    Bangladesh Rural Electrification Board
                  </Text>
                  <Box>
                    <Text color={"#666666"} fontSize={"20px"}>
                      Providing power to rural Bangladesh
                    </Text>
                  </Box>
                </Flex>

                <Heading
                  fontSize={"26px"}
                  fontWeight={["500"]}
                  color={"#32398F"}
                  mt={"37px"}
                  m
                >
                  Welcome Back! CDMS
                </Heading>

                <Text
                  mt={"-3px"}
                  mb={"20px"}
                  color={"#666666"}
                  fontWeight={[400]}
                >
                  Log in to your account.
                </Text>

                <Box mb={10}>
                  <Text color="#000000" mb={2} size="17px" fontWeight={["400"]}>
                    Employee ID
                  </Text>{" "}
                  <Input
                    {...register("employee_id", {
                      required: "Id is required",
                    })}
                    bg="white"
                    borderColor="#d8dee4"
                    borderRadius="6px"
                    width="400px"
                    height="40px"
                    type="text"
                    placeholder="Type Employee ID"
                    fontSize={"16px"}
                    px={"7px"}
                  />
                </Box>
                <Box mb={7}>
                  <Text mb={2} color="#000000" size="17px" fontWeight={["400"]}>
                    Password
                  </Text>
                  <Input
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be 8 characters",
                      },
                    })}
                    bg="white"
                    borderColor="#d8dee4"
                    borderRadius="6px"
                    width="400px"
                    height={"40px"}
                    type="password"
                    placeholder="Type password"
                    mb={1}
                    fontSize={"16px"}
                    px={"7px"}
                  />{" "}
                  {errors.password && (
                    <Text color={"red.300"} fontSize={"sm"}>
                      {errors.password?.message}
                    </Text>
                  )}
                </Box>

                <HStack mt={"-20px"}>
                  <Box pb={"30px"}>
                    <Checkbox>Remember me</Checkbox>
                  </Box>

                  <Link
                    textDecoration={"none"}
                    color="#474D9A"
                    fontSize="16px"
                    href="#"
                    ml={"140px"}
                    mb={"20px"}
                  >
                    Forgot Password?
                  </Link>
                </HStack>
                <Button
                  my={1}
                  style={{ background: "#32398FF2", color: "white" }}
                  size="lg"
                  type="submit"
                  h={"40px"}
                  width={"400px"}
                  borderRadius="6px"
                  mt={"16px"}
                >
                  Log in
                </Button>
                <Text>{userToken}</Text>
                {userToken && <Navigate to={"/tabledata"} replace={true} />}

                <Box as="footer" py={4} color="white" textAlign="center">
                  <VStack>
                    <Text
                      fontSize="14px"
                      fontWeight="semi-bold"
                      color="#606060"
                    >
                      © 2023 All rights reserved. Developed By{" "}
                      <Link
                        fontSize="14px"
                        color="#00ADF4"
                        href="https://digicontechnologies.com/"
                        target="_blank"
                      >
                        Digicon Technologies Limited
                      </Link>
                    </Text>
                  </VStack>
                </Box>
              </Box>
            </Flex>
          </form>
        </GridItem>

        {displayImage && (
          <GridItem colSpan={{ base: "auto", md: 1 }}>
            <Box width="full" height="100%" align="Center" justify="center">
              <Image src={loginPage} height="100%" objectFit="cover" />
            </Box>
          </GridItem>
        )}
      </Grid>
    </Box>
  );
};

export default Login;
