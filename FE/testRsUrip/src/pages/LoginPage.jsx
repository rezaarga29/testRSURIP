import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      let { data } = await axios({
        method: "post",
        url: "http://localhost:3000/login",
        data: {
          email: email,
          password: password,
        },
      });
      console.log(data);
      localStorage.access_token = data.access_token;
      navigate("/homepage");
    } catch (error) {
      // console.log(error.response.data.error);
      let errMsg = error.response.data.error;
      Swal.fire({
        title: "Error",
        text: errMsg,
        icon: "error",
      });
    }
  };

  return (
    <>
      <h3 className="text-light display-10 text-center mt-5">
        Sign in to your account
      </h3>
      <div
        className="bg-white bg-opacity-50"
        style={{
          marginTop: 10,
          marginLeft: 400,
          marginRight: 400,
          padding: 30,
          borderRadius: 10,
        }}
      >
        <form onSubmit={submitLogin}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="row mt-5 mb-3">
            <div className="col-6 d-flex justify-content-center">
              <button
                className="btn btn-lg btn-primary rounded-pill w-50"
                type="submit"
                href=""
              >
                Submit
              </button>
            </div>
            <div className="col-6 d-flex justify-content-center">
              <Link
                to="/"
                className="btn btn-lg btn-light rounded-pill w-50"
                href=""
              >
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
