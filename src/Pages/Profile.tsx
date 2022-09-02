import axios from "axios"
import { Dispatch, useEffect, useState } from "react"
import { connect } from "react-redux"
import Layout from "../Components/Layout"
import { User } from "../Models/user"
import { SET_USER } from "../Redux/Actions/UserActions"

const Profile = (props: any) => {

    const [userInfo, setUserInfo] = useState({
        first_name: "",
        last_name: "",
        email: ""
    })

    const [passwords, setPasswords] = useState({
        password: "",
        confirm_password: ""
    })

    useEffect(() => {
        setUserInfo(props.user)
    }, [props.user])

    const handleInfoChange = (e: any) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
    }

    const handleInfoUpdate = async (e: any) => {
        e.preventDefault()
        if (userInfo.first_name == "" || userInfo.last_name == "" || userInfo.email == "") {
            alert("Enter all user informations")
            return
        }
        try {
            const { data } = await axios.put("users/update", userInfo)
            props.setUser(data)
            alert("User information updated")
        } catch (e) {
            alert("Error updating user info")
        }
    }

    const handlePasswordChange = (e: any) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value })
    }

    const handlePasswordUpdate = async (e: any) => {
        e.preventDefault()
        if (passwords.password == "" || passwords.confirm_password == "" || passwords.password !== passwords.confirm_password) {
            alert("Enter valid password")
            return
        }
        try {
            await axios.put("users/update-password", {
                password: passwords.password
            })
            alert("Password updated")
        } catch (e) {
            alert("Error updating password")
        }
    }

    return (
        <Layout>
            <h3>Account Information</h3>
            <form onSubmit={handleInfoUpdate}>
                <div className="mb-3">
                    <input type="text" className="form-control" name="first_name" value={userInfo.first_name} placeholder="First Name" onChange={handleInfoChange} />
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" name="last_name" value={userInfo.last_name} placeholder="Last Name" onChange={handleInfoChange} />
                </div>
                <div className="mb-3">
                    <input type="email" className="form-control" name="email" value={userInfo.email} placeholder="Email" onChange={handleInfoChange} />
                </div>
                <button type="submit" className="btn btn-outline-secondary">Update</button>
            </form>

            <h3>Password Update</h3>
            <form onSubmit={handlePasswordUpdate}>
                <div className="mb-3">
                    <input name="password" className="form-control" value={passwords.password} placeholder="Password" type="password" onChange={handlePasswordChange} />
                </div>
                <div className="mb-3">
                    <input name="confirm_password" className="form-control" value={passwords.confirm_password} placeholder="Confirm Password" type="password" onChange={handlePasswordChange} />
                </div>

                <button type="submit" className="btn btn-outline-secondary">Update</button>
            </form>
        </Layout>
    )
}

const mapStateToProps = (state: { user: User }) => ({ user: state.user })
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setUser: (user: User) => dispatch(SET_USER(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)