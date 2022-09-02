import axios from "axios"
import { useEffect, useState } from "react"
import Layout from "../Components/Layout"
import Products from "../Components/Products"
import { filters } from "../Models/filters"

const ProductBackEnd = () => {
    const [products, setProducts] = useState([])
    const [filters, setFilters] = useState<filters>({ q: "", sort: "" })

    useEffect(() => {
        (async () => {
            const filterOptions = []
            filters.q && filterOptions.push(`q=${filters.q}`)
            filters.sort && filterOptions.push(`sort=${filters.sort}`)
            const { data } = await axios.get('products/backend?' + filterOptions.join("&"))
            setProducts(data.data)
        })()
    }, [filters])

    return <Layout>
        <Products products={products} filters={filters} setFilters={setFilters} />
    </Layout>
}

export default ProductBackEnd