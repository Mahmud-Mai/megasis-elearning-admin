"use client"
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from "@/core/services/login-service";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


export default function LoginPage() {
    const router = useRouter()

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [loginErrorMessage, setLoginErrorMessage] = useState("");

    const user = "ADMIN";

    async function handleSubmit() {
        loginUser({ emailAddress, password, user })
            .then((data) => {
                localStorage.setItem("bearer-token", data.token);
                localStorage.setItem("userId", data.loginId);
                router.push('/dashboard');

            }).catch((err) => {
                setLoginErrorMessage("Invalid Email/Password")
            });
    }

    return (
        <section className="h-screen flex items-center justify-center">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>LOGIN</CardTitle>
                    <CardDescription>Please enter your email and password.</CardDescription>
                    <div className="text-destructive" style={{ fontStyle: "italic", fontSize: "12px" }}>{loginErrorMessage}</div>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} id="email" placeholder="Email Address" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input value={password} onChange={(e) => setPassword(e.target.value)} id="password" placeholder="Password" type="password" />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button onClick={handleSubmit}>Login</Button>
                </CardFooter>
            </Card>
        </section>
    )
}