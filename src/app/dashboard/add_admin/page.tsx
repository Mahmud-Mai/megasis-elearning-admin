"use client";
import { useEffect, useState } from "react";
import { UserType } from "@/core/enums/UserType.enum";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import CreateUserRequest from "@/core/dto/login/requests/CreateUserRequest";
import AuthData from "@/core/dto/login/AuthData";
import { apiRoot } from "@/constants";
import axios, { AxiosError } from "axios";
import PrimaryBtn from "@/components/reusables/PrimaryBtn";
const registerUrl: string = `${apiRoot}/createUser`;

interface CountryCode {
  id: string;
  name: string;
  code: string;
}

const AddAmin = () => {
  const [name, setName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [digits, setDigits] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [password, setPassword] = useState("");
  const [countryCodeOptions, setCountryCodeOptions] = useState<CountryCode[]>(
    []
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [registrationErrorMessage, setRegistrationErrorMessage] = useState("");
  const [registrationWarning, setRegistrationWarning] = useState("");
  const [createdUser, setCreatedUser] = useState<AuthData | null>(null);

  async function createUser(req: CreateUserRequest): Promise<void> {
    try {
      const response = await axios.post(registerUrl, req, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("bearer-token")}`
        }
      });

      if (!response.statusText || response.status >= 400) {
        console.error("Error creating user:", response.data);
        setErrorMessage("Error creating user. Try again.");
        const warningHeader = response.data.response?.headers?.get("warning");
        if (warningHeader) {
          setRegistrationWarning(warningHeader);
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = response.data;
      setCreatedUser(data as AuthData);
      return data;
    } catch (error: any) {
      console.error("Error creating user:", error);
      setRegistrationErrorMessage(
        "Error encountered: " + error.response.headers.warning
      );
      setIsProcessing(false);
    }
  }

  // load countryCodes
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all", {})
      .then((res) => res.json())
      .then((res) => {
        const countries: CountryCode[] = res.map((c: any) => {
          const suffixes: string[] = c.idd.suffixes;
          if (suffixes) {
            const sufs = suffixes.join("");
            return {
              name: c.name.common,
              id: c.cca3,
              code: c.idd.root + sufs
            };
          } else {
            return { name: c.name.common, id: c.cca3, code: c.idd.root };
          }
        });
        setCountryCodeOptions(
          countries.sort((a, b) => a.name.localeCompare(b.name))
        );
      })
      .catch((err) => {
        console.log("failed to load country code options");
        console.log(err);
      });
  }, []);

  async function handleSubmit() {
    setIsProcessing(true);
    setRegistrationErrorMessage("");

    try {
      const user = UserType.ADMIN;
      if (!countryCodeOptions || !countryCodeOptions.length) {
        setRegistrationErrorMessage("Country codes not loaded yet");

        throw new Error("Country codes not loaded yet");
      }
      const countCode = countryCodeOptions.filter((a) => a.id == countryCode)[0]
        .code;
      const response = await createUser({
        emailAddress,
        name,
        digits,
        countryCode: countCode,
        password,
        user
      });

      if (response) {
        console.log("User created successfully:", response);
        return response;
      }
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
    }
  }

  return (
    <section>
      <div className="flex container p-16 items-center justify-center align-middle">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-left my-4 text-2xl uppercase font-bold">
              Create an Admin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    placeholder="Your Full Name"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Input
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    id="email"
                    placeholder="Your Email Address"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Input
                    value={digits}
                    onChange={(e) => setDigits(e.target.value)}
                    id="phone"
                    placeholder="Your Phone Number"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Select value={countryCode} onValueChange={setCountryCode}>
                    <SelectTrigger id="framework">
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {countryCodeOptions.map((country) => (
                        <SelectItem key={country.id} value={country.id}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    placeholder="Password"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="text-center">
            <div className="w-[100%] text-center">
              {createdUser && (
                <div className="flex justify-center mb-4">
                  <p className="text-green-500 font-bold">
                    User Created Successfully!
                  </p>
                </div>
              )}
              {errorMessage && (
                <div className="text-red-500 py-4 text-center">
                  {errorMessage}
                </div>
              )}
              {registrationWarning && (
                <div className="text-yellow-500 py-2 text-center">
                  {registrationWarning}
                </div>
              )}
              {registrationErrorMessage && (
                <div className="text-red-500 py-4 text-center">
                  {registrationErrorMessage}
                </div>
              )}
              <div className="flex justify-center">
                <PrimaryBtn isProcessing={isProcessing} onClick={handleSubmit}>
                  {!isProcessing ? "Create Account" : "Processing..."}
                </PrimaryBtn>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default AddAmin;
