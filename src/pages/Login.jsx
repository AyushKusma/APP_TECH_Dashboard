import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { LoadingScreen } from "../components/common/LoadingScreen";
import { FormProvider } from "../components/form/FormProvider";
import { FormTextField } from "../components/form/FormTextField";
import { loginAuth } from "../redux/slices/AuthSlice";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { auth, isLoading } = useSelector((state) => state.auth);

  const Schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Enter your email"),
    password: Yup.string().required("Enter password"),
  });

  const methods = useForm({
    resolver: yupResolver(Schema),
  });

  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    dispatch(
      loginAuth({
        body: { email: data.email, password: data.password },
        navigate: navigate,
      })
    );
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full h-screen flex justify-center items-center overflow-hidden">
        <div className="w-96 h-fit border-2 p-7 shadow rounded flex flex-col gap-y-3">
          <div className="flex flex-col gap-1">
            <span className="text-3xl font-bold text-left">Sign In</span>
            <span className="text-base font-medium text-left text-slate-500">
              Log in to your account to continue
            </span>
          </div>
          <div className="flex flex-col gap-4 mt-6">
            <FormTextField
              name="email"
              label="Email Address"
              type="email"
              disabled={false}
            />
            <FormTextField
              name="password"
              label="Password"
              type="password"
              disabled={false}
            />
          </div>
          <div className="flex justify-between">
            <div className="flex items-center">
              <input
                className="w-4 h-4 accent-yellow-500 mr-2 "
                type="checkbox"
                id="checkbox"
              />
              <span className="text-base text-slate-700">Remember me</span>
            </div>
            <button className="font-medium text-blue-500 no-underline hover:underline hover:text-blue-700">
              Forgot password?
            </button>
          </div>
          <button
            disabled={isLoading}
            className={`mt-2 h-10 ${
              isLoading ? "bg-gray-400 " : "bg-yellow-300"
            } content-center transition font-bold ${
              !isLoading && "hover:bg-yellow-400"
            } rounded-md`}
          >
            {isLoading ? "Singining in..." : "Sign In"}
          </button>
          <div className="flex justify-between items-center">
            <hr className="border w-full" />
            <span className="text-xs text-slate-400 font-semibold mx-2 w-full">
              OR CONTINUE WITH
            </span>
            <hr className="border w-full" />
          </div>
          <div className="flex mt-4 justify-between">
            <button className="font-semibold bg-gray-200 px-5 py-1 transition-all hover:bg-gray-300">
              Google
            </button>
            <button className="font-semibold bg-gray-200 px-5 py-1 transition-all hover:bg-gray-300">
              Facebook
            </button>
            <button className="font-semibold bg-gray-200 px-5 py-1 transition-all hover:bg-gray-300">
              Twitter
            </button>
          </div>
          <div className="flex gap-1.5 justify-center mt-2">
            <span className="text-slate-500">Don't have an account?</span>
            <button className="text-blue-500 no-underline hover:underline hover:text-blue-700">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};
