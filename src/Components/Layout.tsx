import axios from "axios"
import { Dispatch, useEffect, useState } from "react"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"
import { User } from "../Models/user"
import { SET_USER } from "../Redux/Actions/UserActions"
import Header from "./Header"
import Nav from "./Nav"

const Layout = (props: any) => {

    useEffect(() => {
        (async () => {
            try {
                let { data } = await axios.get("users")
                props.setUser(data)
            } catch (e) {
                console.log("Error ", e)
            }
        })()
    }, [])


    return <>
        <Nav />

        <main>
            <Header />
            <div className="album py-5 bg-light">
                <div className="container">
                    {props.children}
                </div>
            </div>
        </main>
    </>
}

const mapStateToProps = (state: { user: User }) => ({
    user: state.user
})


const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setUser: (user: User) => dispatch(SET_USER(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout)