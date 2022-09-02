import axios from "axios";
import { useEffect, useState } from "react";
import { filters } from "../Models/filters";
import { Product } from "../Models/product";

const Products = (props: { products: Product[], filters: filters, setFilters: (filters: filters) => void, lastPage: number | null }) => {
    const [selected, setSelected] = useState<number[]>([])
    const [notify, setNotify] = useState({
        show: false,
        error: false,
        message: ''
    })
    const handlSelect = (id: number) => {
        if (selected.some(s => s === id)) {
            setSelected(selected.filter(s => s !== id))
            return
        }
        setSelected([...selected, id])
    }

    const generateLink = async () => {
        try {
            const { data } = await axios.post("link", {
                products: selected
            })
            setNotify({
                show: true,
                error: false,
                message: `Link Generated http://localhost:5000/${data.code}`
            })
        } catch (e) {
            setNotify({
                show: true,
                error: true,
                message: "Please login to generate link"
            })
        } finally {
            setTimeout(() => {
                setNotify({
                    show: false,
                    error: false,
                    message: ""
                })
            }, 4000)
        }
    }

    let GenerateLinkButton, infoContainer

    if (selected.length > 0) {
        GenerateLinkButton = (
            <div className="input-group-append">
                <button className="btn btn-info" onClick={generateLink}>Generate Link</button>
            </div>
        )
    }

    if (notify.show) {
        infoContainer = (
            <div className="col-md-12 mb-4">
                <div className={notify.error ? "alert alert-danger" : "alert alert-info"} role="alert">
                    {notify.message}
                </div>
            </div>
        )
    }

    return <>
        {infoContainer}
        <div className="col-md-12 mb-4 input-group">
            <input type="search" className="form-control" placeholder="Search..." aria-label="Search" onKeyUp={(e: any) => props.setFilters({ ...props.filters, q: e.target.value, page: 1 })}></input>
            {GenerateLinkButton}
            <div className="input-group-append">
                <select className="form-select" onChange={(e: any) => { props.setFilters({ ...props.filters, sort: e.target.value, page: 1 }) }}>
                    <option value="">Select</option>
                    <option value="asc">Price Ascending</option>
                    <option value="desc">Price Descending</option>
                </select>
            </div>
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" >
            {Array.isArray(props.products) && props.products.map((product, index) => (
                <div className="col" key={index}>
                    <div className={selected.indexOf(product.id) === -1 ? "card shadow-sm" : "card shadow-sm selected"} onClick={() => handlSelect(product.id)}>
                        <img src={product.image} alt={product.title} height="50" width="50" />
                        <div className="card-body">
                            <p className="card-text">{product.title}</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <small className="text-muted">${product.price}</small>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        {(!props.lastPage || props.lastPage > props.filters.page) &&
            <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-outline-primary" onClick={() => { props.setFilters({ ...props.filters, page: props.filters.page + 1 }) }}>Load More</button>
            </div>
        }
    </>
}

export default Products