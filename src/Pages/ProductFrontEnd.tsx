import axios from "axios"
import { useEffect, useState } from "react"
import Layout from "../Components/Layout"
import Products from "../Components/Products"
import { filters } from "../Models/filters"
import { Product } from "../Models/product"

const ProductFrontEnd = () => {

    const [allProducts, setAllProducts] = useState([])
    const [products, setProducts] = useState([])
    const [filters, setFilters] = useState<filters>({ q: "", sort: "", page: 1 })
    const [lastPage, setLastPage] = useState<number | null>(null)

    useEffect(() => {
        (async () => {
            const { data } = await axios.get('products/frontend')
            setAllProducts(data)
            setProducts(data)
        })()
    }, [])

    useEffect(() => {
        const perPage: number = 9
        let filteredProducts = allProducts.filter((product: any) => product.title.toLowerCase().indexOf(filters.q.toLowerCase()) >= 0 || product.description.toLowerCase().indexOf(filters.q.toLowerCase()) >= 0)
        if (filters.sort === "asc") {
            filteredProducts.sort((p1: Product, p2: Product) => {
                if (p1.price > p2.price) return 1
                if (p1.price < p2.price) return -1
                return 0
            })
        } else if (filters.sort === "desc") {
            filteredProducts.sort((p1: Product, p2: Product) => {
                if (p1.price < p2.price) return 1
                if (p1.price > p2.price) return -1
                return 0
            })
        }

        setLastPage(Math.ceil(filteredProducts.length / perPage))
        setProducts(filteredProducts.slice(0, filters.page * perPage))

    }, [filters, allProducts])

    return <Layout>
        <Products products={products} filters={filters} setFilters={setFilters} lastPage={lastPage} />
    </Layout>
}

export default ProductFrontEnd