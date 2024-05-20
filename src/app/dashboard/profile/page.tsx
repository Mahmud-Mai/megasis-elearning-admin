"use client";
import ImageAvater from "@/components/imageAvater/imageAvater";
import ProfileDTO from "@/core/dto/login/ProfileDTO";
import { getProfile } from "@/core/services/login-service";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import PrimaryBtn from "@/components/reusables/PrimaryBtn";
import { profile } from "console";
import Image from "next/image";

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState<ProfileDTO | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [digits, setDigits] = useState("");
  const [country, setCountry] = useState("");

  const countries = [
    { value: "NG", label: "Nigeria" },
    { value: "US", label: "United States" },
    { value: "GB", label: "United Kingdom" }
  ];

  // Fetch profile data only once on initial render
  useEffect(() => {
    console.log("fetch /profile");
    const fetchData = async () => {
      try {
        const response = await getProfile(localStorage.getItem("userId")!);
        console.log("🚀 ~ fetchData ~ profile:", response);
        setProfileData(response);
      } catch (err) {
        console.log("error loading profile", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFormSubmit = async () => {
    console.log("🚀 ~ handleFormSubmit ~ profile update btn cliced:");
  };

  return (
    <div className="flex container p-16 items-center justify-center align-middle">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-left my-4 text-2xl uppercase font-bold">
            Profile & settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col md:flex-row">
            <div className="w-full m-1 lg:m-4 grid grid-cols-1 md:grid-cols-2 pl-8 items-center gap-6">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  placeholder={profileData?.name || "Your Full Name"}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label className="text-[#2d2f31]" htmlFor="name">
                  Email Address
                </Label>
                <Input
                  readOnly
                  disabled
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  placeholder={
                    profileData?.emailAddress || "Your Email Address"
                  }
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Phone Number</Label>
                <Input
                  value={digits}
                  onChange={(e) => setDigits(e.target.value)}
                  id="phone"
                  placeholder={profileData?.digits || "Your Phone Number"}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Language</Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="English UK">
                      Select language
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {["English UK", "English US"].map((item, i) => (
                      <SelectItem key={i} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Country</Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select Country">
                      {country}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {countries.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex p-2 justify-center items-center">
              <Image
                alt="profile pic"
                src={"/assets/images/user_circle.png"}
                width={300}
                height={300}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-evenly mt-8 mb-6">
          <PrimaryBtn
            isProcessing={isLoading}
            variant="secondary"
            onClick={handleFormSubmit}
          >
            Save Changes
          </PrimaryBtn>
        </CardFooter>
      </Card>
    </div>
  );
}
