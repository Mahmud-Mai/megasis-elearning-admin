"use client"
import { useRouter } from "next/navigation"
import { useState } from 'react';
import {updatePassword} from "@/core/services/login-service";

export default function ChangePassword() {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');



  const handleSubmit = () => {
    const loginId = localStorage.getItem("userId") || "";
    updatePassword({ loginId,  currentPassword,  newPassword })
      .then((response) => {
        localStorage.removeItem("bearer-token");
        localStorage.removeItem("userId");
        router.replace("/");
      }).catch((error) => {
        console.log("Operation failed")
      })
  }

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-3 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="shadow rounded m-2 text-dark" style={{ borderRadius: "1rem", backgroundColor: "white" }}>
              <div className="card-body p-4 text-center">
                <form className="mb-md-5 mt-md-4">
                  <h3 className=" mb-2 fw-bold text-uppercase">Change Password</h3>
                  <div className="form-group text-start my-3">
                    <label className="form-label" htmlFor="password">Current Password</label>
                    <input value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} name="password" type="password" id="password" className="form-control" />
                  </div>
                  <div className="form-group text-start my-3" >
                    <label className="form-label" htmlFor="new-password">New Password</label>
                    <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} name="new-password" type="new-password" id="new-password" className="form-control" />
                  </div>
                </form>
                <button onClick={handleSubmit} className="btn btn-outline-primary btn-lg px-5">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
