import { filters } from "../Models/filters";
import { Product } from "../Models/product";

const Products = (props: { products: Product[], filters: filters, setFilters: (filters: filters) => void }) => {
    return <>
        <div className="col-md-12 mb-4 input-group">
            <input type="search" className="form-control" placeholder="Search..." aria-label="Search" onKeyUp={(e: any) => props.setFilters({ ...props.filters, q: e.target.value })}></input>
            <div className="input-group-append">
                <select className="form-select" onChange={(e: any) => { props.setFilters({ ...props.filters, "sort": e.target.value }) }}>
                    <option value="">Select</option>
                    <option value="asc">Price Ascending</option>
                    <option value="desc">Price Descending</option>
                </select>
            </div>
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" >
            {Array.isArray(props.products) && props.products.map((product, index) => (
                <div className="col" key={index}>
                    <div className="card shadow-sm">
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
    </>
}

export default Products