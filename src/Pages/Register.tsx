import axios from "axios"
import { useState } from "react"

const Register = () => {
    const initialState = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirm: ""
    }

    let [userInfo, setUserInfo] = useState(initialState)

    const handleChange = (e: any) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
    }

    const handleSumbit = async (e: any) => {
        e.preventDefault()
        try {
            if (userInfo.first_name === "" || userInfo.last_name === "" || userInfo.email === "" || userInfo.password === "" || userInfo.password_confirm === "" || userInfo.password != userInfo.password_confirm) {
                alert("Provide valid input and try again")
                return
            }
            let resp = await axios.post("register", userInfo)

            if (resp.status === 200) {
                alert("Registration successful.")
                window.location.href = "/login"
            }
        } catch (e) {
            alert("Registration failed")
        }

    }

    return (<>
        <main className="form-signin w-100 m-auto">
            <form onSubmit={handleSumbit}>
                <h1 className="h3 mb-3 fw-normal">Please Register</h1>
                <div className="form-floating">
                    <input type="text" onChange={handleChange} className="form-control" name="first_name" placeholder="First Name" />
                </div><div className="form-floating">
                    <input type="text" onChange={handleChange} className="form-control" name="last_name" placeholder="Last Name" />
                </div>
                <div className="form-floating">
                    <input type="email" onChange={handleChange} className="form-control" name="email" placeholder="Email Address" />
                </div>
                <div className="form-floating">
                    <input type="password" onChange={handleChange} className="form-control" name="password" placeholder="Password" />
                </div>
                <div className="form-floating">
                    <input type="password" onChange={handleChange} className="form-control" name="password_confirm" placeholder="Password" />
                </div>

                <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
            </form>
        </main>
    </>)
}

export default Register