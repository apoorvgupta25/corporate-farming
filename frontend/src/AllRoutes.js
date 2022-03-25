import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './component/home/home';
import AllLands from './component/land/allLands';
import Land from './component/land/land';
import AllProducts from './component/product/allProducts';
import Product from './component/product/product';
import CropPrediction from './component/cropPrediction/cropPrediction'
import {PrivateRoute, FarmerRoute, CorporateRoute} from './auth/protectedRoute';
import Messenger from './component/messenger/messenger';
import Signin from './auth/signin';
import Signup from './auth/signup';

import FarmerDashboard from './user/farmer_dashboard';
import AddLand from './user/farmer/AddLand';
import ManageLand from './user/farmer/ManageLand';
import AddProduct from './user/farmer/AddProduct';
import ManageProduct from './user/farmer/ManageProduct';

import CorporateDashboard from './user/corporate_dashboard';

export default function AllRoutes(){

    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Home/>}/>
                <Route path="/lands" exact element={<AllLands/>}/>
                <Route path="/products" exact element={<AllProducts/>}/>

                <Route path="/land/:landId" exact element={<Land/>}/>
                <Route path="/product/:productId" exact element={<Product/>}/>

                <Route path="/signin" exact element={<Signin/>}/>
                <Route path="/signup" exact element={<Signup/>}/>

                <Route path="/cropPrediction" exact element={<CropPrediction/>}/>
                <Route path="/messenger" exact element={<Messenger/>}/>
                <Route path='/dashboard/:userId' exact element={<PrivateRoute><FarmerDashboard/></PrivateRoute>}/>

                <Route path='/farmer/dashboard/:userId' exact element={<FarmerRoute><FarmerDashboard/></FarmerRoute>}/>
                <Route path='/farmer/add/land' exact element={<FarmerRoute><AddLand/></FarmerRoute>}/>
                <Route path='/farmer/manage/land' exact element={<FarmerRoute><ManageLand/></FarmerRoute>}/>
                <Route path='/farmer/add/product' exact element={<FarmerRoute><AddProduct/></FarmerRoute>}/>
                <Route path='/farmer/manage/product' exact element={<FarmerRoute><ManageProduct/></FarmerRoute>}/>

                <Route path='/corporate/dashboard/:userId' exact element={<CorporateRoute><CorporateDashboard/></CorporateRoute>}/>
            </Routes>
        </Router>
    )
}
