import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { Apis } from "../../services/apiPaths";
import { useNavigate } from "react-router-dom";
import AXIOS from "../../helpers/api";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  const pictureDetails = async (pic) => {
    setLoading(true);
    if (!pic) {
      toast({
        title: "Please select an Image",
        status: "warning",
        duration: "5000",
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      try {
        const formData = new FormData();
        formData.append("file", pic);
        formData.append("upload_preset", "mern-chat-app");
        formData.append("cloud_name", "disd6ndsv");
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/disd6ndsv/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const resData = await res.json();
        setLoading(false);
        return resData?.url?.toString();
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      toast({
        title: "Please select an Image",
        status: "warning",
        duration: "5000",
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!(userName && email && password && confirmPassword)) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: "5000",
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords donot match",
        status: "warning",
        duration: "5000",
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    const picUrl = await pictureDetails(selectedFile);

    const payload = { name: userName, email, password, pic: picUrl };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await AXIOS.post(
        `${Apis.users}/signup`,
        payload,
        config
      );
      setLoading(false);
      toast({
        title: "Registration Succesfull.",
        description: "Please login",
        status: "success",
        duration: "5000",
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error Occured",
        description: error?.response?.data?.message,
        status: "error",
        duration: "5000",
        isClosable: true,
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  return (
    <VStack spacing="5px" color="black">
      <FormControl id="userName" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Email Address"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="Enter Password"
            type={show ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.7rem"
              size="sm"
              onClick={() => setShow((prev) => !prev)}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirmPassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.7rem"
              size="sm"
              onClick={() => setShow((prev) => !prev)}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic" isRequired>
        <FormLabel>Upload an image</FormLabel>
        <Input type="file" p={1.5} accept="image/*" onChange={onSelectFile} />
      </FormControl>

      {selectedFile && (
        <img src={preview} alt="uploadedImage" width={200} height={200} />
      )}

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
