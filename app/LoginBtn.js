'use client'

import {signIn, signOut} from "next-auth/react";

export function LoginBtn() {
    return (
        <button className="loginBt" onClick={() => {
            signIn()
        }}>Login</button>
    )
}

export function LogOutBtn() {
    return (
        <button className="loginBt" onClick={() => {
            signOut()
        }}>Logout</button>
    )
}