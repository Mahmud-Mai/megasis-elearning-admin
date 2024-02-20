import React from 'react'

export default function RegisterPage() {
    return (
        <section className="vh-100 gradient-custom">
            <div className="container py-3 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="shadow rounded m-2 text-dark" style={{ borderRadius: "1rem", backgroundColor: "white" }}>
                            <div className="card-body p-4 text-center">
                                <form className="mb-md-5 mt-md-4">
                                    <h3 className=" mb-2 fw-bold text-uppercase">Register</h3>
                                    <p style={{ fontStyle: "italic" }} > Provide these information to create your Account.</p>
                                    <div className="form-group text-start my-3" >
                                        <label className="form-label" htmlFor="name">Full Name</label>
                                        <input name="name" type="text" id="name" className="form-control" />
                                    </div>
                                    <div className="form-group text-start my-3">
                                        <label className="form-label" htmlFor="email">Email</label>
                                        <input name="email" type="email" id="email" className="form-control" />
                                    </div>
                                    <div className="form-group text-start my-3" >
                                        <label className="form-label" htmlFor="password">Password</label>
                                        <input name="password" type="password" id="password" className="form-control" />
                                    </div>
                                    <div className="form-group text-start my-3" >
                                        <label className="form-label" htmlFor="phone-number">Phone Number</label>
                                        <input name="phone-number" type="tel" id="phone-number" className="form-control" />
                                    </div>
                                    <div className="form-group text-start my-3">
                                        <label className="form-label  my-1" htmlFor="country-code">Country Code</label>
                                        <select className="custom-select form-control my-1 mr-sm-2" id="country-code">
                                            <option selected>Choose...</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                    <div className="form-group text-start my-3" >
                                        <label className="form-label" htmlFor="password">Password</label>
                                        <input name="password" type="password" id="password" className="form-control" />
                                    </div>
                                    <p className="small mb-2 pb-lg-2"><a href="#!">Forgot password?</a></p>
                                    <button className="btn btn-outline-primary btn-lg px-5" type="submit">Submit</button>
                                </form>
                                <div>
                                    <p className="mb-0">Already have an account? <a href="/" className="fw-bold">Login</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
