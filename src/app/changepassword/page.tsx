
export default function page() {
  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-3 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="shadow rounded m-2 text-dark" style={{ borderRadius: "1rem", backgroundColor: "white" }}>
              <div className="card-body p-4 text-center">
                <form className="mb-md-5 mt-md-4">
                  <h3 className=" mb-2 fw-bold text-uppercase">Change Password</h3>
                  <div className="form-group text-start my-3" >
                    <label className="form-label" htmlFor="password">Password</label>
                    <input name="password" type="password" id="password" className="form-control" />
                  </div>
                  <div className="form-group text-start my-3" >
                    <label className="form-label" htmlFor="new-password">New Password</label>
                    <input name="new-password" type="new-password" id="new-password" className="form-control" />
                  </div>
                  <button className="btn btn-outline-primary btn-lg px-5" type="submit">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
