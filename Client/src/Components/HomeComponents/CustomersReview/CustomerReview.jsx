import React from 'react';
import SectionHeading from '../../Reuse/SectionHeading/SectionHeading';
import CustomerReviewCard from './CustomerReviewCard';

const CustomerReview = () => {
  const reviews =  [
        {"name": "JohnDoe123", "rating": 5, "comment": "Excellent product, exceeded my expectations!"},
        {"name": "HappyCustomer456", "rating": 4, "comment": "Great service and fast delivery."},
        {"name": "SatisfiedShopper789", "rating": 5, "comment": "Top-notch quality, highly recommended."},
        {"name": "EcoFriendlyReviewer", "rating": 4, "comment": "Impressed with the eco-friendly packaging."},
        {"name": "TechGuru101", "rating": 5, "comment": "Innovative features, worth every penny."},
        {"name": "Fashionista456", "rating": 4, "comment": "Trendy and stylish, love the design."},
        {"name": "FitnessFanatic789", "rating": 5, "comment": "Durable and perfect for my workout routine."},
        {"name": "Bookworm123", "rating": 4, "comment": "Captivating read, couldn't put it down."},
        {"name": "FoodieExplorer", "rating": 5, "comment": "Delicious flavors, will order again."},
      
      ]
    return (
        <div className='p-10 bg-[#ffedea]'>
            <SectionHeading heading={'Good Reviews by Customers '} title={`"Customer reviews highlight the exceptional quality, outstanding service, and overall satisfaction experienced by delighted customers."`}></SectionHeading>
            <div className='py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                   reviews.map((review,index)=>{
                    return <CustomerReviewCard review={review} key={index}></CustomerReviewCard>
                   }) 
                }
            </div>

        </div>
    );
}

export default CustomerReview;
