import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { IoCaretBackOutline } from "react-icons/io5";
import axios from "axios";
import baseURL from "../axiosConfig";
import {
  Box,
  Button,
  Grid,
  GridItem,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  Select,
} from "@chakra-ui/react";

const AddUser = () => {
  const { register, handleSubmit } = useForm();
  const [userType, setUserType] = useState("");
  const [pbsType, setPbsType] = useState("");
  const [officeType, setOfficeType] = useState("");
  const [userTypeOptions, setUserTypeOptions] = useState([]);
  const [pbsTypeOptions, setPbsTypeOptions] = useState([]);
  const [officeTypeOptions, setOfficeTypeOptions] = useState([]);
  const [ccTypeOptions, setCcTypeOptions] = useState([]);

  const [pbsId, setPbsId] = useState("");
  const [officeId, setOfficeId] = useState("");

  // Setup interceptor outside the fetchUserTypes function
  axios.interceptors.request.use((config) => {
    const jwtToken = localStorage.getItem("token");
    console.log(jwtToken);
    if (jwtToken) {
      config.headers.Authorization = `Bearer ${jwtToken}`;
    }
    return config;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await baseURL.get("/user-type");
        const resPbs = await baseURL.get("/palli-bidyut-samity");
        setUserTypeOptions(response.data.data);
        setPbsTypeOptions(resPbs.data.data);
        console.log("User", response.data.data);
        console.log("PBS", resPbs.data.data);
      } catch (error) {
        console.error("Error fetching user types:", error);
        // Handle your error here
      }

      // Fetching data
    };
    const fetchPbsOfficeCCData = async () => {
      try {
        if (pbsId) {
          console.log("PBS ID", pbsId);
          const resOffice = await baseURL.get(
            `/office?palli_bidyut_samity_id=${pbsId}`
          );
          setOfficeTypeOptions(resOffice.data.data);
        }

        if (officeId) {
          const resCc = await baseURL.get(
            `/complaint-center?office_id=${officeId}&palli_bidyut_samity_id=${pbsId}`
          );
          setCcTypeOptions(resCc.data.data);
          console.log("CC Data:", resCc.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    fetchPbsOfficeCCData();
  }, [pbsId, officeId]);

  const userTyperId = ["1", "2", "4", "5", "6", "7", "8", "9"];
  const onSubmit = (data) => console.log(data);

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };
  const handlePbsTypeChange = async (event) => {
    setPbsId(event.target.value);
  };
  const handleOfficeTypeChange = async (event) => {
    setOfficeId(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Link to={"/tabledata"}>
        {" "}
        <Button color="blue.400" ml={7} mt={7}>
          <IconButton _hover={"none"} ml={-2} bg={"none"}>
            <IoCaretBackOutline />
          </IconButton>
          back
        </Button>
      </Link>
      <Grid px={20} mt={10} templateColumns={"repeat(3,1fr)"} gap={6}>
        <GridItem>
          <Text>Enter your ID</Text>
          <Input
            focusBorderColor="blue.300"
            placeholder="Enter ID"
            size={"sm"}
            {...register("employee_id", { required: true, maxLength: 20 })}
          />
        </GridItem>
        <GridItem>
          <Text>Enter your Name</Text>
          <Input
            focusBorderColor="blue.300"
            placeholder="Enter Name"
            size={"sm"}
            {...register("first_Name", { required: true })}
          />
        </GridItem>
        <GridItem>
          <Text>Enter your Mobile Number</Text>
          <InputGroup size={"sm"}>
            <InputLeftAddon children="+880" />
            <Input
              type="tel"
              focusBorderColor="blue.300"
              placeholder="Mobile Number"
              {...register("mobile", { required: true })}
            />
          </InputGroup>
        </GridItem>
        <GridItem>
          <Text>Enter your Employee Email</Text>
          <Input
            focusBorderColor="blue.300"
            placeholder="Employee Email"
            size={"sm"}
            {...register("employee_email", { required: true })}
          />
        </GridItem>
        <GridItem>
          <Text>Enter your National ID</Text>
          <Input
            focusBorderColor="blue.300"
            placeholder="National ID"
            size={"sm"}
            {...register("national_id", { required: true })}
          />
        </GridItem>
        <GridItem>
          <Text>Enter your Date of Birth</Text>
          <Input
            type="date"
            focusBorderColor="blue.300"
            placeholder="date_of_birth"
            size={"sm"}
            {...register("date_of_birth")}
          />
        </GridItem>
        <GridItem w={"100%"}>
          <Text>Enter your Gender</Text>
          <Select {...register("gender")}>
            <option value="">Select one</option>
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="other">other</option>
          </Select>
        </GridItem>
        <GridItem>
          <Text>Enter User Type</Text>
          <Select {...register("user_type")} onChange={handleUserTypeChange}>
            <option value={""}>Select one user type</option>
            {userTypeOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </Select>
        </GridItem>
        <GridItem>
          <Text>Enter Designation</Text>
          <Select {...register("designation_id")}>
            <option value="Zone">Zonal Admin</option>
            <option value="CC">CC Admin</option>
            <option value="FF">Field Force</option>
          </Select>
        </GridItem>
        {userTyperId.includes(userType) && (
          <GridItem mr={5}>
            <Text>Enter Palli Bidyut Samity</Text>

            <Select
              {...register("palli_bidyut_samity_name", { required: true })}
              onChange={handlePbsTypeChange}
            >
              <option value="">Select Palli Bidyut Samity</option>
              {pbsTypeOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </Select>
          </GridItem>
        )}
        {userTyperId.includes(userType) && (
          <GridItem>
            <Text>Zone/Sub-zone/HQ</Text>

            <Select
              {...register("office_name", { required: true })}
              onChange={handleOfficeTypeChange}
            >
              <option value="">Select Zone/Sub-zone/HQ</option>
              {officeTypeOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </Select>
          </GridItem>
        )}
        {userTyperId.includes(userType) && (
          <GridItem>
            <Text>Enter Complain Center</Text>

            <Select {...register("complaint_center_name", { required: true })}>
              <option value="">Select Complain Center</option>
              {ccTypeOptions &&
                ccTypeOptions.map((option, index) => (
                  <option key={index} value={option.id}>
                    {option.name}
                  </option>
                ))}
            </Select>
          </GridItem>
        )}

        <GridItem>
          <Text>Enter Office Location</Text>

          <Select {...register("office_location_name")}>
            <option value="Zone">select office location</option>
            <option value="CC">BREB Head office</option>
          </Select>
        </GridItem>

        <GridItem>
          <Text>Enter password</Text>

          <Input
            focusBorderColor="blue.300"
            placeholder="Enter password"
            size={"sm"}
            {...register("password", { required: true })}
          />
        </GridItem>

        <GridItem>
          <Text>Confirm password</Text>

          <Input
            focusBorderColor="blue.300"
            placeholder="Confirm your password"
            size={"sm"}
            {...register("confirm_password", { required: true })}
          />
        </GridItem>
      </Grid>
      <Grid px={20} mt={10} templateColumns={"repeat(2,1fr)"} gap={7}>
        <GridItem>
          <Text>Enter your Present Address</Text>
          <Input
            focusBorderColor="blue.300"
            placeholder="Present Address"
            size={"lg"}
            {...register("present_address")}
          />
        </GridItem>
        <GridItem mr={5}>
          <Text>Enter your Permanent Address</Text>
          <Input
            focusBorderColor="blue.300"
            placeholder="Permanent Address"
            size={"lg"}
            {...register("permanent_address")}
          />
        </GridItem>
        <GridItem>
          <Link to={"/tabledata"}>
            {" "}
            <Button w={"100%"} colorScheme="pink">
              Back
            </Button>
          </Link>
        </GridItem>
        <GridItem mr={5}>
          <Button w={"100%"} colorScheme="twitter">
            <Input border={0} type="Submit" />
          </Button>
        </GridItem>
      </Grid>
    </form>
  );
};

export default AddUser;
