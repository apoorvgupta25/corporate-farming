import React, {useState, useEffect}  from "react";

import {getAllLands} from './landAPICall'

import Navbar from '../Navbar';
import {Card} from '../home/home'
import Topbar from "../topbar/topbar";
import '../home/home.css';
import ThreeDotsWave from '../animation/ThreeDotsWave';
import ReactPaginate from 'react-paginate';

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

    const NoLandDisplay = () => <div className="noLands">
        <b style={myStyle2}>Sorry!</b>
        <b style={myStyle2}>No Lands Available</b>
    </div>;

    var states = new Array("Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Pondicherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Tripura", "Uttaranchal", "Uttar Pradesh", "West Bengal");

    const mystyle = {
        marginRight: "10rem",
        display: "flex",
        justifyContent: "flex-end"
    };

    const myStyle2 = {
        fontFamily: "Fontdiner Swanky,cursive",
        fontSize: "4rem",
        color: "#4b62d1",
        marginBottom: "1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    const [sortType, setSortType] = useState('pricelh');

    const [filterType, setFilterType] = useState('All States');

    useEffect(() => {
        getAllLands()
        .then(data => {
            if (data.error) {
                console.log(data.error);
            } else {

                var filteredArray = data;

                if (filterType != "All States"){
                    filteredArray = data.filter(function (el)
                    {
                        return el.landProperties.state == filterType;
                    }
                    );
                }

                var sorted = [];
                if (sortType == "pricelh"){
                    sorted = [...filteredArray].sort((a, b) => a.expectedProfit.exactAmount - b.expectedProfit.exactAmount);
                } else if (sortType == "pricehl") {
                    sorted = [...filteredArray].sort((a, b) => b.expectedProfit.exactAmount - a.expectedProfit.exactAmount);
                } else if (sortType == "bondhl") {
                    sorted = [...filteredArray].sort((a, b) => b.bondTime - a.bondTime);
                } else if (sortType == "bondlh") {
                    sorted = [...filteredArray].sort((a, b) => a.bondTime - b.bondTime);
                } else if (sortType == "areahl") {
                    sorted = [...filteredArray].sort((a, b) => b.landProperties.totalArea - a.landProperties.totalArea);
                } else if (sortType == "arealh") {
                    sorted = [...filteredArray].sort((a, b) => a.landProperties.totalArea - b.landProperties.totalArea);
                } else {
                    sorted = [...filteredArray].sort((a, b) => b.updatedAt - a.updatedAt);
                }

                if (sorted.length == 0){
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
        <div style={mystyle}>
            <b>Filter By State:&nbsp;</b>
            <select onChange={(e) => setFilterType(e.target.value)}>
                <option value="All States">All States</option>
                {states.map(state => {
                return <option value={state}>{state}</option>;
                })}
            </select>&nbsp;&nbsp;
            <b>Sort By:&nbsp;</b>
            <select onChange={(e) => setSortType(e.target.value)}>
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
