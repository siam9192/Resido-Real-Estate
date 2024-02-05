import {createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home.jsx/Home";
import Routes from "../Routes/Routes";
import Listings from "../Pages/Listings/Listings";
import SignIn from "../Pages/Form/Signin";
import SignUp from "../Pages/Form/SignUp";
import AgentDetails from "../Pages/AgentDetails/AgentDetails";
import PropertyDetails from "../Pages/PropertyDetails/PropertyDetails";
import DashboardOutlet from '../Pages/DashboardPages/DashboardOutlet/DashboardOutlet'
// import AddProperty from '../Pages/DashboardPages/DashboardRoutes/AddProperties/AddProperties'
import Dashboard from '../Pages/DashboardPages/DashboardRoutes/Dashboard/Dashboard'
import AddProperties from "../Pages/DashboardPages/DashboardRoutes/AddProperties/AddProperties";
import MyProperties from '../Pages/DashboardPages/DashboardRoutes/MyProperties/MyProperties'
import Profile from "../Pages/DashboardPages/DashboardRoutes/Profile/Profile";
import Membership from "../Pages/DashboardPages/DashboardRoutes/Membership/Membership";
import PrivateRoutes1 from "../Components/PrivateRoutes/PrivateRoutes1";
import FavoriteProperties from "../Pages/DashboardPages/DashboardRoutes/FavoriteProperties/FavoriteProperties";
import Error from "../Pages/Error/Error";
import Message from "../Pages/DashboardPages/DashboardRoutes/Message/Message";
// https://html.creativegigstf.com/homy/homy/dashboard/dashboard-index.html
const Router = createBrowserRouter([
    {
        path:'/',
        element:<Routes></Routes>,
        errorElement: <Error></Error>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            }
        ]
    },

    {
        path:'/listings',
        element:<Listings></Listings>
    },
    {
    path:'/listings/property/details/:id',
    element:<PropertyDetails></PropertyDetails>

    },

    {
        path:'/sign-in',
        element:<SignIn></SignIn>
    },
    {
        path:'/agents/details/:name',
        element:<AgentDetails></AgentDetails>

    },
    {
        path:'/sign-up',
        element:<SignUp></SignUp>
    },
    {
        path:'/dashboard',
        element:<PrivateRoutes1><DashboardOutlet></DashboardOutlet></PrivateRoutes1>,
        children:[
            {
                path:"/dashboard",
                element: <Dashboard></Dashboard>
            },
            ,
            {
                path:"/dashboard/message",
                element:<Message></Message>
            },
            {
                path:'/dashboard/my-properties',
                element:<MyProperties></MyProperties>
            
            },
            {
             path:"/dashboard/add-property",
             element:<AddProperties></AddProperties>
            
            },
            {
                path:"/dashboard/favourite-property",
                element:<FavoriteProperties></FavoriteProperties>
               
               },
            ,
            {
                path:"/dashboard/profile",
                element:<Profile></Profile>
               
               },
               {
                path:"/dashboard/membership",
                element:<Membership></Membership>
               
               }
        ]
    }
])


export default Router;
