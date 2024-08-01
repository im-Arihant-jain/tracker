import React, { useState, useEffect } from 'react';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const log = JSON.parse(localStorage.getItem('user'));
    if (log && log.reviews) {
      setReviews(log.reviews);
    }
  }, []);

  return (
    <div className='revsec'>
      <div className='revhead'>Reviews</div>
      <div>
        {reviews.map((review, index) => (
          <div key={index} className="review-item">
            <div className="reviewer-name">{review.reviewerName}</div>
            <div className="review-text">{review.review}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
