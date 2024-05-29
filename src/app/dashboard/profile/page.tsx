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
          <div className="flex flex-col md:flex-row">
            <div className="w-full m-1 lg:m-4 grid grid-cols-1 md:grid-cols-2 pl-8 items-center gap-6">
              <div className="flex flex-col space-y-1.5">
                <p>
                  <span className="capitalize font-semibold mx-2">Name:</span>{" "}
                  {profileData?.name}
                </p>
              </div>
              <div className="flex flex-col space-y-1.5">
                <p>
                  <span className="capitalize font-semibold mx-2">Email:</span>{" "}
                  {profileData?.emailAddress}
                </p>
              </div>
              <div className="flex flex-col space-y-1.5">
                <p>
                  <span className="capitalize font-semibold mx-2">
                    Phone Number:
                  </span>{" "}
                  {profileData?.digits}
                </p>
              </div>
              <div className="flex flex-col space-y-1.5">
                <p>
                  <span className="capitalize font-semibold mx-2">
                    Language:
                  </span>{" "}
                  English
                </p>
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
