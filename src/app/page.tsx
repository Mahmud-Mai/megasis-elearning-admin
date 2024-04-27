"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/core/services/login-service";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthData from "@/core/dto/login/AuthData";
import PrimaryBtn from "@/components/reusables/PrimaryBtn";

export default function LoginPage() {
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState<boolean>();

  const user = "ADMIN";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    setIsProcessing(true);
    setLoginErrorMessage("");
    try {
      const data: AuthData = await loginUser({ emailAddress, password, user });

      if (!data || !data.token || !data.loginId) {
        setIsProcessing(false);
        setLoginErrorMessage("Invalid Username or Password");
        return;
      }

      localStorage.setItem("bearer-token", data.token);
      localStorage.setItem("userId", data.loginId);
      setIsProcessing(false);

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
      setLoginErrorMessage("Invalid Username or Password.");
    }
  }

  return (
    <section className="h-screen flex flex-col items-center pt-56 bg-[#fcfafa]">
      <div className="mb-10">
        <h1 className="capitalize px-1 md:px-2 text-xl lg:text-4xl">
          Welcome to Megasis E-Learning Admin platform.
        </h1>
      </div>
      <Card className="w-[400px] py-8 px-16 lg:w-[600px] lg:py-12 lg:px-24">
        <CardHeader>
          <CardTitle className="mb-4 text-md md:text-xl tracking-wider ">
            LOGIN
          </CardTitle>
          <CardDescription className="my-2">
            Please enter your email and password.
          </CardDescription>
          <div className="text-red-700">{loginErrorMessage}</div>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  id="email"
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex align-middle items-center justify-center mt-4">
          <div className="text-center">
            <div className="flex justify-center">
              <PrimaryBtn isProcessing={isProcessing} onClick={handleSubmit}>
                {!isProcessing ? "Login" : "Processing..."}
              </PrimaryBtn>
            </div>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
}
