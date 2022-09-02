import axios from "axios"
import { useEffect, useState } from "react"
import Layout from "../Components/Layout"

const Stats = () => {

    const [stats, setStats] = useState([])

    useEffect(() => {
        (async () => {
            const { data } = await axios.get('stats')
            setStats(data)
        })()
    }, [])

    return (
        <Layout>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Code</th>
                            <th>Reveneue</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(stats) && stats.map((stat: any) => (
                            <tr key={stat.code}>
                                <td>#</td>
                                <td>{stat.code}</td>
                                <td>{stat.revenue}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}

export default Stats