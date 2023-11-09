import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../../assets/images/login-images.png";
import logo from "../../assets/images/logo.png";
import topCircle from "../../assets/images/top-circle.png";
import bottomCircle from "../../assets/images/bottom-circle.png";
import { useDispatch, useSelector } from "react-redux";
import { handleSubmit } from "./services/loginServices";
// import { setLoading, setUserData } from './services/events';
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { logInUser, useUser } from "./AuthSlice";
import axios from "axios";
import { toast } from "sonner";
// import { toast } from "react-toastify";

const Login = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  // const loading = useSelector(state => state.authState.loading)
  // const userData = useSelector(state => state.authState.userData)
  // console.log(userData);
  // const setFormField = (field, value) => {
  //     setUserData({ ...userData, [field]: value })
  // }

  const initialValues = {
    email_mobile: "",
    password: "",
  };

  const schemaValidation = Yup.object().shape({
    email_mobile: Yup.string().required("email or phone is require"),
    password: Yup.string().required("password require"),
  });

  const onSubmit = async (values) => {
    const payload = Object.assign({}, values);
    try {
      setLoading(true);
      const response = await dispatch(logInUser(payload));
      if (response?.payload?.data?.IsSuccess) {
        toast.success(response?.payload?.data?.Message);
        navigate("/dashboard");
      }
    } catch (error) {}
    //const directResponse = await axios.post("https://cmsapi.scalelot.com/admin/login",payload);
    setLoading(false);
  };
  const verify = () => {
    const itemStr = localStorage.getItem("user");

    // if the item doesn't exist, return null
    if (!itemStr) {
      return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    // compare the expiry time of the item with the current time
    if (now.getDate() > item.expiry) {
      // If the item is expired, delete the item from storage
      // and return null
      localStorage.removeItem("user");
      // localStorage.removeItem("isLoggedIn")
      return null;
    }
    navigate("/dashboard");
    // return item.value
  };

  // useEffect(() => {
  //     setLoading(false)
  //     verify();
  //     // const isLoggedIn = localStorage.getItem("isLoggedIn");
  //     // if (isLoggedIn && isLoggedIn !== "") {
  //     //     navigate("/dashboard");
  //     // }
  // }, []);

  useEffect(() => {
    if (user.token) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="flex h-screen">
      <div className="flex w-full flex-wrap bg-white">
        <div className="w-full relative lg:w-1/2 flex p-5 sm:p-7 md:p-[60px]">
          <div className="">
            <div className="absolute top-0 sm:right-20 md:right-32 sm:block hidden">
              <img src={topCircle} alt="Top Circle Shape" />
            </div>
            <div className="absolute bottom-0 sm:left-20 md:left-32 sm:block hidden">
              <img src={bottomCircle} alt="Bottom Circle Shape" />
            </div>
          </div>
          <Link to="" className="absolute">
            <img src={logo} alt="Alt Text" />
          </Link>
          <div className="max-w-md w-full m-auto">
            <h1>Welcome back</h1>

            <p className="text-base sm:text-lg text-[#64748B] font-normal pt-3.5 xl:pr-8">
              Welcome back! Please enter your details
            </p>
            {/* <small className='text-[#FB7181] text-xs font-semibold leading-4'>Invalid Mobile or Password Please Try Again!</small> */}
            <div className="w-full pt-7 sm:pt-9">
              <Formik
                initialValues={initialValues}
                validationSchema={schemaValidation}
                onSubmit={onSubmit}
              >
                {({ formik }) => {
                  return (
                    <>
                      <Form className="space-y-5">
                        <div>
                          <label htmlFor="" className="input-titel">
                            Email or Phone
                          </label>
                          <Field
                            type="text"
                            name="email_mobile"
                            className="input_box placeholder:text-[#94A3B8] placeholder:text-base"
                            placeholder="Enter your email or mobile"
                            required
                          />
                          <div className="text-sm text-red-500">
                            <ErrorMessage name="email_mobile" />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="" className="input-titel">
                            Password
                          </label>
                          <Field
                            type="Password"
                            name="password"
                            placeholder="Enter your password"
                            className="input_box placeholder:text-[#94A3B8] placeholder:text-base"
                            required
                          />
                          <div className="text-sm text-red-500">
                            <ErrorMessage name="password" />
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* <div className="flex items-center">
                                        <label className="checkbox w-5 mr-2"><input type="checkbox" className="bg-white" /><i className="icon-right"></i></label>
                                        <span className="text-sm leading-5 text-yankeesBlue font-bold">Remember for 30 Days</span>
                                    </div> */}
                          {/* <Link
                            to="../resetpassword"
                            className="text-yankeesBlue font-bold text-xs md:text-sm block text-right"
                          >
                            Reset password ?
                          </Link> */}
                        </div>
                        {loading ? (
                          <button
                            type="button"
                            className="flex items-center justify-center btn-primary w-full py-[15px] capitalize text-base leading-7 font-extrabold group cursor-not-allowed"
                            disabled=""
                          >
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-black group-hover:text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Processing...
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="btn-primary w-full py-[15px] uppercase text-base leading-7 font-extrabold"
                            onClick={handleSubmit}
                          >
                            Sign in
                          </button>
                        )}
                        {/* <span className="block text-sm text-[#94A3B8] font-bold text-center">
                          Don’t have an account?
                          <Link
                            to="../register"
                            className="text-yankeesBlue font-bold ml-1"
                          >
                            Sign up for free
                          </Link>
                        </span> */}
                      </Form>
                    </>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
        <div className="w-full h-full lg:w-1/2 hidden lg:block">
          <img
            src={bgImage}
            alt="login-bg"
            className="w-full h-full object-cover object-bottom"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
