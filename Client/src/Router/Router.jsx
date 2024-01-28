import {createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home.jsx/Home";
import Routes from "../Routes/Routes";
import Listings from "../Pages/Listings/Listings";
import SignIn from "../Pages/Form/Signin";
import SignUp from "../Pages/Form/SignUp";
import AgentDetails from "../Pages/AgentDetails/AgentDetails";
import PropertyDetails from "../Pages/PropertyDetails/PropertyDetails";

const Router = createBrowserRouter([
    {
        path:'/',
        element:<Routes></Routes>,
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
    }
])


export default Router;
