"use client"
import ImageAvater from '@/components/imageAvater/imageAvater'
import Link from 'next/link';
import React from 'react'
import { useState, useEffect } from 'react';
import ProfileDTO from "@/core/dto/login/ProfileDTO";
import { getProfile } from "@/core/services/login-service";

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



export default function ProfilePage() {
  const [refresher, setRefresher] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState<ProfileDTO>();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [digits, setDigits] = useState("");
  const [country, setCountry] = useState("");


  //TODO : FIX This all to coincide with server API

  // const updateProfile = () => {
  //   fetch(updateProfileUrl, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${token}`,
  //     },
  //     body: JSON.stringify(profileData),
  //     method: "post",
  //     mode: "no-cors",
  //   })
  //     .then((res) => res.json())
  //     .then((responses) => {
  //       const { profileData } = responses
  //       setProfileData(profileData)
  //     }).catch((error) => {
  //       console.log("Operation failed")
  //     });
  // }

  // load profile data
  useEffect(
    () => {
      getProfile()
        .then((profileData) => {
          setProfileData(profileData)
        }).catch((error) => {
          alert("Failed to load Profile")
        });
    }, [refresher]);

  const handleFormSubmit = () => {
    // TODO implement profile update
  }

  return (
    <div className="py-3 px-5 flex items-center justify-center align-middle">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center uppercase font-bold">My Profile</CardTitle>
          <CardDescription className="text-center">
            <Button variant="ghost">
              <Link href="/dashboard/profile/changepassword">change password</Link>
            </Button>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input readOnly={!editMode} value={name} onChange={(e) => setName(e.target.value)} id="name" placeholder="Your Full Name" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email Address</Label>
                <Input readOnly={!editMode} value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder="Your Email Address" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Phone Number</Label>
                <Input readOnly={!editMode} value={digits} onChange={(e) => setDigits(e.target.value)} id="phone" placeholder="Your Phone Number" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Country</Label>
                <Select onValueChange={(val) => setCountry(val)} disabled={!editMode}>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">Next.js</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-evenly">
          {editMode && <Button>Save</Button>}
          {editMode && <Button variant="destructive" onClick={() => setEditMode(false)} >Cancel</Button>}
          {!editMode && <Button variant="secondary" onClick={() => setEditMode(true)} >Edit</Button>}
        </CardFooter>
      </Card>
    </div>
  )
}
