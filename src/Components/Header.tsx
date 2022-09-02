import { useEffect, useState } from "react"
import { connect } from "react-redux"

const Header = (props: any) => {
    const [title, setTitle] = useState("Welcome")
    const [description, setDescription] = useState("Share link and earn")

    useEffect(() => {
        if (props.user?.id) {
            setTitle(`$${props.user.revenue}`)
            setDescription("Your earning so far")
        } else {
            setTitle("Welcome")
            setDescription("Share link and earn")
        }
    }, [props.user])

    let header

    if (!props.user?.id) {
        header = (
            <>
                <a href="/login" className="btn btn-primary my-2">Login</a>
                <a href="/register" className="btn btn-secondary my-2">Register</a>
            </>
        )
    }

    return <section className="py-5 text-center container">
        <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
                <h1 className="fw-light">{title}</h1>
                <p className="lead text-muted">{description}</p>
                <p>
                    {header}
                </p>
            </div>
        </div>
    </section>
}

const mapStateToProps = (state: any) => ({ user: state.user })

export default connect(mapStateToProps)(Header)