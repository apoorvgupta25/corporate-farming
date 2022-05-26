import React, {useState, useEffect}  from "react";
import ReactPaginate from 'react-paginate';

import {getAllLands} from './landAPICall'

import Topbar from "../topbar/topbar";
import {Card} from '../home/home'
import ThreeDotsWave from '../animation/ThreeDotsWave';

import '../home/home.css';

const AllLands = () => {
    const [lands, setLands] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(0);

    const [showNoLand, setShowNoLand] = useState(false);

    const landsPerPage = 8;
    const pagesVisited = pageNumber * landsPerPage;

    const pageCount = Math.ceil(lands.length / landsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const NoLandDisplay = () => <div className="not-found">
        <b>Sorry! <br/> No Lands Available</b>
    </div>;

    var states = ["Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Pondicherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Tripura", "Uttaranchal", "Uttar Pradesh", "West Bengal"];

    const [sortType, setSortType] = useState('createdAt');

    const [filterType, setFilterType] = useState('All States');

    useEffect(() => {
        getAllLands()
        .then(data => {
            if (data.error) {
                console.log(data.error);
            } else {

                var filteredArray = data;

                if (filterType !== "All States"){
                    filteredArray = data.filter(function (el)
                    {
                        return el.landProperties.state === filterType;
                    }
                    );
                }

                var sorted = [];
                if (sortType === "pricelh"){
                    sorted = [...filteredArray].sort((a, b) => a.expectedProfit.exactAmount - b.expectedProfit.exactAmount);
                } else if (sortType === "pricehl") {
                    sorted = [...filteredArray].sort((a, b) => b.expectedProfit.exactAmount - a.expectedProfit.exactAmount);
                } else if (sortType === "bondhl") {
                    sorted = [...filteredArray].sort((a, b) => b.bondTime - a.bondTime);
                } else if (sortType === "bondlh") {
                    sorted = [...filteredArray].sort((a, b) => a.bondTime - b.bondTime);
                } else if (sortType === "areahl") {
                    sorted = [...filteredArray].sort((a, b) => b.landProperties.totalArea - a.landProperties.totalArea);
                } else if (sortType === "arealh") {
                    sorted = [...filteredArray].sort((a, b) => a.landProperties.totalArea - b.landProperties.totalArea);
                } else if (sortType === "createdAt") {
                    sorted = [...filteredArray].sort((a, b) => a.createdAt - b.createdAt);
                } else {
                    sorted = [...filteredArray].sort((a, b) => b.updatedAt - a.updatedAt);
                }

                if (sorted.length === 0){
                    setShowNoLand(true)
                }else{
                    setShowNoLand(false)
                }

                setLands(sorted)
                setLoading(false);

            }

        })
    }, [sortType,filterType,showNoLand]);

    if (isLoading){
        return <ThreeDotsWave/>;
    }

    return (
        <>
        <Topbar/>
        <h2 className="text-center font-weight-bold mt-3">Land for Lease</h2><br></br>
        <div className="filter-sort">
            <b className="h4">Filter By State:&nbsp;</b>
            <select onChange={(e) => setFilterType(e.target.value)}>
                <option value="All States">All States</option>
                {states.map(state => {
                    return <option value={state}>{state}</option>;
                })}
            </select>&nbsp;&nbsp;
            <b className="h4">Sort By:&nbsp;</b>
            <select onChange={(e) => setSortType(e.target.value)}>
                <option value="createdAt">Create (New to Old)</option>
                <option value="pricelh">Price (Low to High)</option>
                <option value="pricehl">Price (High to Low)</option>
                <option value="bondlh">Bond Time (Low to High)</option>
                <option value="bondhl">Bond Time (High to Low)</option>
                <option value="arealh">Land Size (Small to Large)</option>
                <option value="areahl">Land Size (Large to Small)</option>
            </select>
        </div><br></br>
        {showNoLand ? <NoLandDisplay /> : null}

        <div className="wrapper mb-5">
            {lands.slice(pagesVisited, pagesVisited + landsPerPage).map((land, index) => {
                return (
                    <div key={index}>
                        <Card land={land}/>
                    </div>
                )
            })}
        </div>

        {!showNoLand ? <ReactPaginate
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

export default AllLands;
