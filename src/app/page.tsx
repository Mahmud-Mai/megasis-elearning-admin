"use client"
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import {loginUrl} from "@/components/constants";


export default function LoginPage() {
    const router = useRouter()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginErrorMessage, setLoginErrorMessage] = useState("");

    const user = "ADMIN";

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        try {
            const response = await fetch(loginUrl, {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password , user }),
                method: "post",
                mode: "no-cors",
            })

            console.log(response.status)

            const { token } = await response.json();
            localStorage.setItem("bearer-token", token);
            router.push('/dashboard')

        } catch (error) {
            console.log(error)
            setLoginErrorMessage("Invalid email or Password")
        }
    }

    return (
        <section className="vh-100 gradient-custom">
            <div className="container py-3 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="shadow rounded m-2 text-dark" style={{ borderRadius: "1rem", backgroundColor: "white" }}>
                            <div className="card-body p-4 text-center">
                                <form onSubmit={handleSubmit} className="mb-md-5 mt-md-4">
                                    <h3 className=" mb-2 fw-bold text-uppercase">Login</h3>
                                    <p style={{ fontStyle: "italic" }} >Please enter your login and password!</p>
                                    <div className="form-outline  form-white mb-4">
                                        <label className="form-label" htmlFor="email">Email</label>
                                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="form-control form-control-lg" />
                                    </div>
                                    <div className="form-outline form-white mb-4">
                                        <label className="form-label" htmlFor="password">Password</label>
                                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" className="form-control form-control-lg" />
                                    </div>
                                    <div className="text-danger" style={{ fontStyle: "italic", fontSize: "12px" }}>{loginErrorMessage}</div>
                                    <p className="small mb-2 pb-lg-2"><a href="#!">Forgot password?</a></p>
                                    <button className="btn btn-outline-primary btn-lg px-5" type="submit">Login</button>
                                </form>

                                {/* <div>
                                    <p className="mb-0">Don&apos;t have an account? <Link href="/register" className="fw-bold">Sign Up</Link>
                                    </p>
                                </div> */}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}