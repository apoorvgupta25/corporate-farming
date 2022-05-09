import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './component/home/home';
import AllLands from './component/land/allLands';
import Land from './component/land/land';
import AllProducts from './component/product/allProducts';
import Product from './component/product/product';
import CropPrediction from './component/cropPrediction/cropPrediction';
import CropDiseasePrediction from './component/cropDiseasePrediction/cropDiseasePrediction';
import CropCostPrediction from './component/cropCostPrediction/cropCostPrediction';
import CropCommodity from './component/cropCostPrediction/cropCommodity';
import WeatherPrediction from './component/weatherPrediction/weatherPrediction';

import {PrivateRoute, FarmerRoute, CorporateRoute, AdminRoute} from './auth/protectedRoute';
import Messenger from './component/messenger/messenger';
import Contract from './component/contract/contract';
import Signin from './auth/signin';
import SignupFarmer from './auth/signupFarmer';
import SignupCorporate from './auth/signupCorporate';
import VerifyOtp from './auth/verifyOtp';

import FarmerDashboard from './user/farmer_dashboard';
import AddLand from './user/farmer/AddLand';
import ManageLand from './user/farmer/ManageLand';
import UpdateLand from './user/farmer/UpdateLand';
import AddProduct from './user/farmer/AddProduct';
import ManageProduct from './user/farmer/ManageProduct';
import UpdateProduct from './user/farmer/UpdateProduct';

import CorporateDashboard from './user/corporate_dashboard';

import AdminDashboard from './user/admin_dashboard';
import ManageFarmerVerification from './user/admin/ManageFarmerVerification';
import ManageCorporateVerification from './user/admin/ManageCorporateVerification';
import ManageContract from './user/farmer/ManageContract';
import ViewContract from './component/contract/viewcontract';
import StatusChangeContract from './component/contract/statusChangeContract';
import WeatherData from './component/weatherForecast/weatherData';

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
                <Route path="/signup/farmer" exact element={<SignupFarmer/>}/>
                <Route path="/signup/corporate" exact element={<SignupCorporate/>}/>
                <Route path="/verifyOtp/:userId" exact element={<VerifyOtp/>}/>

                <Route path="/crop/prediction" exact element={<CropPrediction/>}/>
                <Route path="/disease/prediction" exact element={<CropDiseasePrediction/>}/>
                <Route path="/cost/prediction" exact element={<CropCostPrediction/>}/>
                <Route path="/commodity/:commodityName" exact element={<CropCommodity/>}/>
                <Route path="/weather/prediction" exact element={<WeatherPrediction/>}/>
                <Route path="/weather/forecast" exact element={<WeatherData/>}/>

                <Route path="/messenger" exact element={<Messenger/>}/>
                <Route path="/contract/:productId/:farmerId/:isProd" exact element={<CorporateRoute><Contract/></CorporateRoute>}/>
                <Route path='/contract/manage/' exact element={<ManageContract/>}/>
                <Route path='/contract/statusChange/:contractId/:newstatus' exact element={<StatusChangeContract/>}/>
                <Route path='/contract/view/:contractId' exact element={<ViewContract/>}/>
                <Route path='/dashboard/:userId' exact element={<PrivateRoute><FarmerDashboard/></PrivateRoute>}/>

                <Route path='/farmer/dashboard/:userId' exact element={<PrivateRoute><FarmerDashboard/></PrivateRoute>}/>
                <Route path='/farmer/add/land' exact element={<FarmerRoute><AddLand/></FarmerRoute>}/>
                <Route path='/farmer/manage/land' exact element={<FarmerRoute><ManageLand/></FarmerRoute>}/>
                <Route path='/farmer/land/update/:landId' exact element={<FarmerRoute><UpdateLand/></FarmerRoute>}/>
                <Route path='/farmer/add/product' exact element={<FarmerRoute><AddProduct/></FarmerRoute>}/>
                <Route path='/farmer/manage/product' exact element={<FarmerRoute><ManageProduct/></FarmerRoute>}/>
                <Route path='/farmer/product/update/:productId' exact element={<FarmerRoute><UpdateProduct/></FarmerRoute>}/>

                <Route path='/corporate/dashboard/:userId' exact element={<CorporateRoute><CorporateDashboard/></CorporateRoute>}/>

                <Route path='/admin/dashboard/:userId' exact element={<AdminRoute><AdminDashboard/></AdminRoute>}/>
                <Route path='/admin/farmer/verification' exact element={<AdminRoute><ManageFarmerVerification/></AdminRoute>}/>
                <Route path='/admin/corporate/verification' exact element={<AdminRoute><ManageCorporateVerification/></AdminRoute>}/>

            </Routes>
        </Router>
    )
}
