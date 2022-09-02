import axios from "axios"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import { Link } from "react-router-dom"

const Nav = (props: any) => {
    let menu

    if (props.user?.id) {
        menu = (
            <div className="text-end">
                <Link to={'/stats'} style={{ color: "white" }} className="btn me-2">Stats</Link>
                <Link to={'/rankings'} style={{ color: "white" }} className="btn me-2">Rankings</Link>
                <a type="button" className="btn btn-outline-light me-2" href="/profile">{props.user.first_name} {props.user.last_name}</a>
                <a type="button" className="btn btn-warning" href="/login" onClick={async () => { await axios.post('logout') }}>Sign Out</a>
            </div>
        )
    } else {
        menu = (
            <div className="text-end">
                <a type="button" className="btn btn-outline-light me-2" href="/login">Login</a>
                <a type="button" className="btn btn-warning" href="/register">Sign-up</a>
            </div>
        )
    }
    return <header className="p-3 text-bg-dark">
        <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li><NavLink to="/" className="nav-link px-2 text-secondary">Frontend</NavLink></li>
                    <li><NavLink to="/backend" className="nav-link px-2 text-white">Backend</NavLink></li>
                </ul>

                {menu}
            </div>
        </div>
    </header>
}

const mapStateToProps = (state: any) => ({ user: state.user })

export default connect(mapStateToProps)(Nav)