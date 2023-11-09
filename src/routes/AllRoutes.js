import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom';
import ForgotPassword from '../components/auth/ForgotPassword';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import VerificationCode from '../components/auth/VerificationCode';
import ResetPassword from '../components/auth/ResetPassword';
import SideBar from '../components/SideBar/SideBar';
import VerifyReset from '../components/auth/VerifyReset';
import RequireAuth from '../components/auth/RequireAuth'
import Dashboard from '../components/Dashboard/Dashboard';
import { useUser } from '../components/auth/AuthSlice';

function AllRoutes() {
    const { user } = useUser()
    const token = user.token
    return (
        <Routes className="main min-h-screen h-ful w-full">
            <Route path='/' >
                {/* <Route index element={<Login />} /> */}
                {/* <Route path='auth'> */}
                {/* {token ?   */}
                {/* <Route index element={<SideBar />} />  */}
                {/* : */}
                <Route index element={<Login />} />
                {/* } */}
                {/* <Route index element={<Login />} />  path='login' */}
                <Route path='register' element={<Register />} />
                <Route path='forgotpassword' element={<ForgotPassword />} />
                <Route path='verificationcode' element={<VerificationCode />} />
                <Route path='verifyreset' element={<VerifyReset />} />
                <Route path='resetpassword' element={<ResetPassword />} />
                {/* </Route> */}
                {/* <Route element={<RequireAuth />}> */}

                <Route path="/*" element={token && token !== "" ? <SideBar /> : <Login />} />
                {/* </Route> */}
                <Route path="*"
                    element={<h1 style={{ color: "red", margin: "50px" }}>
                        404 | PAGE NOT FOUND
                    </h1>
                    }
                />
            </Route>
        </Routes>
    )
}

export default AllRoutes