"use client"
import ImageAvater from '@/components/imageAvater/imageAvater'
import Link from 'next/link';
import React from 'react'
import { useState, useEffect } from 'react';
import ProfileDTO from "@/core/dto/login/ProfileDTO";
import {getProfile} from "@/core/services/login-service";

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState<ProfileDTO>();


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
          console.log("Operation failed")
        });
    });

  const handleFormSubmit = () => {
    // TODO implement profile update
  }

  return (
    <div className="py-3 px-5">
      <div className="rounded p-5 shadow">
        <div className="text-end">
          <Link href="/dashboard/profile/changepassword" className="btn btn-secondary">change password</Link>
        </div>
        <ImageAvater size={60} alt="" src="" />
        <form method='post' onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="title">Full Name</label>
            <input readOnly={!editMode} value={profileData?.name} type="text" className="form-control" id="title" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input readOnly={!editMode} value={profileData?.emailAddress} type="email" className="form-control" id="email" />
          </div>
          <div className="form-group">
            <label htmlFor="digits">Digits</label>
            <input readOnly={!editMode} value={profileData?.digits} type="tel" className="form-control" id="digits" />
          </div>
          <div className="form-group">
            <label htmlFor="country-code">Country code</label>
            <select disabled={!editMode} className="form-control" id="country-code">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <div className="text-center">
            {editMode && <button className="btn btn-success px-5 m-2">Save</button>}
            {editMode && <button onClick={() => setEditMode(false)} className="btn btn-danger px-5 m-1">Cancel</button>}
            {!editMode && <button onClick={() => setEditMode(true)} className="btn btn-secondary px-5 m-1">Edit</button>}
          </div>
          <div className="d-flex align-items-center justify-content-evenly">
          </div>
        </form>
      </div>
    </div>
  )
}
