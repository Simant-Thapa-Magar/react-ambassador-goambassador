import axios from "axios"
import { useEffect, useState } from "react"
import Layout from "../Components/Layout"
import Products from "../Components/Products"
import { filters } from "../Models/filters"
import { Product } from "../Models/product"

const ProductFrontEnd = () => {

    const [allProducts, setAllProducts] = useState([])
    const [products, setProducts] = useState([])
    const [filters, setFilters] = useState<filters>({ q: "", sort: "" })

    useEffect(() => {
        (async () => {
            const { data } = await axios.get('products/frontend')
            setAllProducts(data)
            setProducts(data)
        })()
    }, [])

    useEffect(() => {
        let products = allProducts.filter((product: any) => product.title.toLowerCase().indexOf(filters.q.toLowerCase()) >= 0 || product.description.toLowerCase().indexOf(filters.q.toLowerCase()) >= 0)
        if (filters.sort === "asc") {
            products.sort((p1: Product, p2: Product) => {
                if (p1.price > p2.price) return 1
                if (p1.price < p2.price) return -1
                return 0
            })
        } else if (filters.sort === "desc") {
            products.sort((p1: Product, p2: Product) => {
                if (p1.price < p2.price) return 1
                if (p1.price > p2.price) return -1
                return 0
            })
        }
        setProducts(products)
    }, [filters, allProducts])

    return <Layout>
        <Products products={products} filters={filters} setFilters={setFilters} />
    </Layout>
}

export default ProductFrontEnd