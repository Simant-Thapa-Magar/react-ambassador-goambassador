import axios from "axios"
import { SyntheticEvent, useState } from "react"
import "../Login.css"
const Login = () => {
    let [loginInfo, setLoginInfo] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e: any) => {
        setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            if (loginInfo.email === "" || loginInfo.password === "") {
                alert("Please fill email and password field")
                return
            }

            let resp = await axios.post("login", loginInfo, { withCredentials: true })

            if (resp.status === 200) {
                alert("Login successful")
                window.location.href = "/"
            }
        } catch (e) {
            alert("Login failed")
        }
    }

    return (
        <main className="form-signin w-100 m-auto">
            <form onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                <div className="form-floating">
                    <input type="email" className="form-control" name="email" placeholder="Email Address" onChange={handleChange} />
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" name="password" placeholder="Password" onChange={handleChange} />
                </div>

                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            </form>
        </main>
    )
}

export default Login