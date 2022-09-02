import axios from "axios"
import { useEffect, useState } from "react"
import Layout from "../Components/Layout"

const Rankings = () => {

    const [rankings, setRankings] = useState([])

    useEffect(() => {
        (async () => {
            const { data } = await axios.get("rankings")
            setRankings(data)
        })()
    }, [])

    return (
        <Layout>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Revenue</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rankings.map((rank: any, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{rank.Name}</td>
                                <td>{rank.Score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}

export default Rankings