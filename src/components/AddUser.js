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
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { IoCaretBackOutline } from "react-icons/io5";
const AddUser = () => {
  const { register, handleSubmit } = useForm();
  const [userType, setUserType] = useState("");
  const onSubmit = (data) => console.log(data);
  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
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
      <Grid ml={30} mt={10} templateColumns={"repeat(3,1fr)"} gap={6}>
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
        <GridItem mr={5}>
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
        <GridItem w={"100%"}>
          <Text>Enter your Gender</Text>
          <select {...register("gender")}>
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="other">other</option>
          </select>
        </GridItem>
        <GridItem>
          <Text>Enter User Type</Text>
          <select {...register("user_type")} onChange={handleUserTypeChange}>
            <option value="">Select user type</option>
            <option value="Zone">Zone</option>
            <option value="CC">CC</option>
            <option value="HQ">HQ</option>
          </select>
        </GridItem>
        <GridItem>
          <Text>Enter Designation Id</Text>
          <select {...register("designation_id")}>
            <option value="Zone">Zone</option>
            <option value="CC">CC</option>
            <option value="HQ">HQ</option>
          </select>
        </GridItem>
        {userType === "Zone" && (
          <GridItem mr={5}>
            <Text>Enter Office Location</Text>

            <select {...register("office_location", { required: true })}>
              <option value="Zone">Zone</option>
              <option value="CC">CC</option>
              <option value="HQ">HQ</option>
            </select>
          </GridItem>
        )}
        {userType === "CC" && (
          <GridItem>
            <Text>Enter CC Location</Text>

            <select {...register("cc_location", { required: true })}>
              <option value="Zone">Zone</option>
              <option value="CC">CC</option>
              <option value="HQ">HQ</option>
            </select>
          </GridItem>
        )}
        {userType === "HQ" && (
          <GridItem>
            <Text>Enter FF Location</Text>

            <select {...register("ff_location", { required: true })}>
              <option value="Zone">Zone</option>
              <option value="CC">CC</option>
              <option value="HQ">HQ</option>
            </select>
          </GridItem>
        )}
      </Grid>
      <Grid ml={30} mt={10} templateColumns={"repeat(2,1fr)"} gap={6}>
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
{
  /* <input type="submit" /> */
}
