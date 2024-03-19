"use client"
import { useRouter } from "next/navigation"
import { useState } from 'react';
import { updatePassword } from "@/core/services/login-service";
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
import { Alert } from "react-bootstrap";

export default function ChangePassword() {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');


  const handleSubmit = () => {
    const loginId = localStorage.getItem("userId") || "";
    if (currentPassword == "" || newPassword == "") {
      alert("Both fields are required");
    }
    updatePassword({ loginId, currentPassword, newPassword })
      .then((response) => {
        localStorage.removeItem("bearer-token");
        localStorage.removeItem("userId");
        router.replace("/");
      }).catch((error) => {
        alert("Failed to update password!")
        console.log("Operation failed")
      })
  }

  return (
    <section className="flex  align-middle justify-center">
      <Card className="w-[350px] m-5">
        <CardHeader>
          <CardTitle className="text-center uppercase font-bold">Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Current Password</Label>
                <Input value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} id="currentPassword" placeholder="Your Current Password" type="password" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">New Password</Label>
                <Input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} id="newPassword" placeholder="New Current Password" type="password" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-evenly">
          <Button onClick={handleSubmit} >Submit</Button>
        </CardFooter>
      </Card>
    </section>
  )
}
