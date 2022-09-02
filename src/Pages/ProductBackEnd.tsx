import axios from "axios"
import { useEffect, useState } from "react"
import Layout from "../Components/Layout"
import Products from "../Components/Products"
import { filters } from "../Models/filters"

const ProductBackEnd = () => {
    const [products, setProducts] = useState([])
    const [filters, setFilters] = useState<filters>({ q: "", sort: "", page: 1 })
    const [lastPage, setLastPage] = useState(null)

    useEffect(() => {
        (async () => {
            const filterOptions = []
            filters.q && filterOptions.push(`q=${filters.q}`)
            filters.sort && filterOptions.push(`sort=${filters.sort}`)
            filters.page && filterOptions.push(`page=${filters.page}`)
            const { data } = await axios.get('products/backend?' + filterOptions.join("&"))
            setProducts(filters.page === 1 ? data.data : products.concat(data.data))
            setLastPage(data.last_page)
        })()
    }, [filters])

    return <Layout>
        <Products products={products} filters={filters} setFilters={setFilters} lastPage={lastPage} />
    </Layout>
}

export default ProductBackEnd