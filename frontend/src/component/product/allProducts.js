import React, {useState, useEffect}  from "react";
import ReactPaginate from 'react-paginate';

import {getAllProducts} from './productAPICall';

import Topbar from "../topbar/topbar";
import {List} from '../home/home'
import ThreeDotsWave from '../animation/ThreeDotsWave';

import '../home/home.css';
import '../home/home.scss';

const AllProducts = () => {

    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const [pageNumber, setPageNumber] = useState(0);

    const [showNoProduct, setShowNoProduct] = useState(false);

    const productsPerPage = 10;
    const pagesVisited = pageNumber * productsPerPage;

    const pageCount = Math.ceil(products.length / productsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    const NoProductDisplay = () => <div className="not-found">
        <b>Sorry! <br/> No Products Available</b>
    </div>;

    const [sortType, setSortType] = useState('createdAt');

    const [filterType, setFilterType] = useState('All Months');

    useEffect(() => {
        getAllProducts()
        .then(data => {
            if (data.error) {
                console.log(data.error);
            } else {

                var filteredArray = data;

                if (filterType !== "All Months"){
                    filteredArray = data.filter(function (el)
                    {
                        console.log(typeof el.deliveryMonth);
                        const monthNumber = parseInt(el.deliveryMonth.split("-")[1]);
                        const filterMonth = months.indexOf(filterType)+1;
                        return filterMonth === monthNumber;
                    }
                    );
                }

                var sorted = [];
                if (sortType === "pricelh"){
                    sorted = [...filteredArray].sort((a, b) => a.price - b.price);
                } else if (sortType === "pricehl") {
                    sorted = [...filteredArray].sort((a, b) => b.price - a.price);
                } else if (sortType === "pbhhl") {
                    sorted = [...filteredArray].sort((a, b) => b.paymentBeforeharvest - a.paymentBeforeharvest);
                } else if (sortType === "pbhlh") {
                    sorted = [...filteredArray].sort((a, b) => a.paymentBeforeharvest - b.paymentBeforeharvest);
                } else if (sortType === "minoqhl") {
                    sorted = [...filteredArray].sort((a, b) => b.minimumOrderQuantity - a.minimumOrderQuantity);
                } else if (sortType === "minoqlh") {
                    sorted = [...filteredArray].sort((a, b) => a.minimumOrderQuantity - b.minimumOrderQuantity);
                } else if (sortType === "maxoqhl") {
                    sorted = [...filteredArray].sort((a, b) => b.maximumOrderQuantity - a.maximumOrderQuantity);
                } else if (sortType === "maxoqlh") {
                    sorted = [...filteredArray].sort((a, b) => a.maximumOrderQuantity - b.maximumOrderQuantity);
                } else if (sortType === "createdAt") {
                    sorted = [...filteredArray].sort((a, b) => a.createdAt - b.createdAt);
                } else {
                    sorted = [...filteredArray].sort((a, b) => b.updatedAt - a.updatedAt);
                }

                if (sorted.length === 0){
                    setShowNoProduct(true)
                }else{
                    setShowNoProduct(false)
                }

                setProducts(sorted)
                setLoading(false);

            }

        })
    }, [sortType,filterType,showNoProduct]);

    if (isLoading){
        return <ThreeDotsWave/>;
    }

    return (
        <>
         <Topbar/>
        <h2 className="text-center font-weight-bold mt-3">Products</h2><br></br>
        <div className="filter-sort">
            <b className="h4">Filter By Delivery Month:&nbsp;</b>
            <select onChange={(e) => setFilterType(e.target.value)}>
                <option value="All Months">All Months</option>
                {months.map(month => {
                    return <option value={month}>{month}</option>;
                })}
            </select>&nbsp;&nbsp;&nbsp;
            <b className="h4">Sort By:&nbsp;</b>
            <select onChange={(e) => setSortType(e.target.value)}>
                <option value="createdAt">Created (New to Old)</option>
                <option value="pricelh">Price (Low to High)</option>
                <option value="pricehl">Price (High to Low)</option>
                <option value="pbhlh">Payment Before Harvest (Low to High)</option>
                <option value="pbhhl">Payment Before Harvest (High to Low)</option>
                <option value="minoqlh">Min. Order Quantity (Small to Large)</option>
                <option value="minoqhl">Min. Order Quantity (Large to Small)</option>
                <option value="maxoqlh">Max. Order Quantity (Small to Large)</option>
                <option value="maxoqhl">Max. Order Quantity (Large to Small)</option>
            </select>
        </div><br></br>
        {showNoProduct ? <NoProductDisplay /> : null}

        <div className="list-container">
            {products.slice(pagesVisited, pagesVisited + productsPerPage).map((prod, index) => {
                return (
                    <div key={index}>
                        <List prod={prod}/>
                    </div>
                )
            })}
        </div>

        {!showNoProduct ? <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"} /> : null
        }
        </>

    )
}

export default AllProducts;
