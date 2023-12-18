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
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { IoCaretBackOutline } from "react-icons/io5";
import baseURL from "../axiosConfig";

const EditUser = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [userType, setUserType] = useState("");
  const [data, setData] = useState([]);

  const onSubmit = (data) => console.log(data);

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("editedUser")) || {};

    Object.keys(storedData).forEach((key) => {
      setValue(key, storedData[key]);
    });
    setData(storedData);

    setUserType(storedData.user_type || "");
  }, [setValue]);
  console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Link to={"/tabledata"}>
        <Button color="blue.400" ml={7} mt={7}>
          <IconButton _hover={"none"} ml={-2} bg={"none"}>
            <IoCaretBackOutline />
          </IconButton>
          back
        </Button>
      </Link>
      <Grid
        w={"full"}
        px={20}
        mt={10}
        templateColumns={"repeat(3,1fr)"}
        gap={6}
      >
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
            {...register("name", { required: true })}
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
              {...register("phone_number", { required: true })}
            />
          </InputGroup>
        </GridItem>
        <GridItem>
          <Text>Enter your Employee Email</Text>
          <Input
            type="email"
            focusBorderColor="blue.300"
            placeholder="Employee Email"
            size={"sm"}
            {...register("email", { required: true })}
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

        <GridItem w={"100%"}>
          <Text>Enter your Gender</Text>
          <Select {...register("gender")}>
            <option value="">Select Gender</option>
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="other">other</option>
          </Select>
        </GridItem>
        <GridItem>
          <Text>Enter User Type</Text>
          <Select {...register("user_type")} onChange={handleUserTypeChange}>
            <option value="">Select User Type</option>
            <option value="CC">Complain Center</option>
            <option value="FF">Field Force</option>
          </Select>
        </GridItem>
        <GridItem>
          <Text>Enter Designation</Text>
          <Select
            placeholder="Select Designation"
            {...register("designation_id")}
          >
            <option value="Zone">Zonal Admin</option>
            <option value="CC">CC Admin</option>
            <option value="FF">Field Force</option>
          </Select>
        </GridItem>
        <GridItem>
          <Text>Enter Office Location</Text>

          <Select
            placeholder="Select Office Location"
            {...register("office_location_name")}
          >
            <option value="Zone">Zone</option>
            <option value="CC">CC</option>
            <option value="HQ">HQ</option>
          </Select>
        </GridItem>
        {(userType === "FF" || userType === "CC") && (
          <GridItem>
            <Text>Enter Palli Bidyut Samity</Text>

            <select
              {...register("palli_bidyut_samity_name", { required: true })}
            >
              <option value="">Select Palli Bidyut Samity</option>
              <option value="Zone">Zone</option>
              <option value="CC">CC</option>
              <option value="HQ">HQ</option>
            </select>
          </GridItem>
        )}
        {(userType === "FF" || userType === "CC") && (
          <GridItem>
            <Text>Zone/Sub-zone/HQ</Text>

            <Select {...register("office_name", { required: true })}>
              <option value="Zone">Zone</option>
              <option value="CC">CC</option>
              <option value="HQ">HQ</option>
            </Select>
          </GridItem>
        )}
        {(userType === "FF" || userType === "CC") && (
          <GridItem>
            <Text>Enter Complain Center</Text>

            <Select {...register("complaint_center_name", { required: true })}>
              <option value="">Select Complain Center</option>
              <option value="Zone">Zone</option>
              <option value="CC">CC</option>
              <option value="HQ">HQ</option>
            </Select>
          </GridItem>
        )}
      </Grid>
      <Grid
        w={"full"}
        px={20}
        mt={10}
        templateColumns={"repeat(2,1fr)"}
        gap={6}
      >
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
            <Button w={"100%"} colorScheme="pink">
              Back
            </Button>
          </Link>
        </GridItem>
        <GridItem mr={5}>
          <Button w={"100%"} colorScheme="twitter" type="submit">
            Submit
          </Button>
        </GridItem>
      </Grid>
    </form>
  );
};

export default EditUser;
