import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userLoginAction } from "../../Redux/Actions/User";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const submitHandler = (input) => {
    input.preventDefault();
    dispatch(userLoginAction(email, password));
  };

  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <div className="bg-white h-screen flex ">
          <div className="w-[30rem] h-auto m-auto">
            <form
              action=""
              className="flex flex-col space-y-6"
              onSubmit={submitHandler}
            >
              <div className="flex flex-col">
                <label htmlFor="email" className="font-medium">
                  Your email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="border-1 border-gray-400 rounded-md px-2 py-1 outline-0 bg-gray-200"
                  placeholder="abc@gmail.com"
                  onChange={(input) => {
                    setEmail(input.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password" className="font-medium">
                  Your password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="border-1 border-gray-400 rounded-md px-2 py-1 outline-0 bg-gray-200"
                  placeholder="password"
                  onChange={(input) => {
                    setPassword(input.target.value);
                  }}
                />
              </div>
              <div className="">
                <button
                  type="submit"
                  className="border-1 px-4 py-1 rounded-lg bg-blue-600 text-white"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
