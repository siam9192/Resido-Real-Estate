import React from 'react';
import Banner from '../../Components/HomeComponents/Banner/Banner';
import Achievement from '../../Components/HomeComponents/Achievement/Achievement ';
import RecentProperty from '../../Components/HomeComponents/RecentProperty/RecentProperty';
import FeaturedProperty from '../../Components/HomeComponents/FeaturedProperty/FeaturedProperty';
import FeaturedAgents from '../../Components/HomeComponents/FeaturedAgents/FeaturedAgents';
import Packages from '../../Components/HomeComponents/Packages/Packages';
import DownloadApp from '../../Components/HomeComponents/DownloadApp/DownloadApp';
import WantToBeAgent from '../../Components/HomeComponents/WantoBeAgent/WantToBeAgent';
import CustomerReview from '../../Components/HomeComponents/CustomersReview/CustomerReview';
import { Helmet } from 'react-helmet';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Banner></Banner>
            <Achievement></Achievement>
            <RecentProperty></RecentProperty>
            <FeaturedProperty></FeaturedProperty>
            <FeaturedAgents></FeaturedAgents>
            <CustomerReview></CustomerReview>
            <Packages></Packages>
            <DownloadApp></DownloadApp>
            <WantToBeAgent></WantToBeAgent>
          
        </div>
    );
}

export default Home;
