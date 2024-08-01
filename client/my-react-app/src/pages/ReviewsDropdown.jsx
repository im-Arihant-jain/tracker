import React, { useState } from 'react';

const ReviewsDropdown = ({ reviews }) => {
  const [selectedReview, setSelectedReview] = useState('');

  const handleChange = (event) => {
    setSelectedReview(event.target.value);
  };

  return (
    <div>
      <label htmlFor="reviews-dropdown">Select a Review:</label>
      <select id="reviews-dropdown" value={selectedReview} onChange={handleChange}>
        <option value="" disabled>Select a review</option>
        {log.reviews.map((review, index) => (
          <option key={index} value={review.review}>
            {review.reviewerName}: {review.review}
          </option>
        ))}
      </select>
      {selectedReview && (
        <div>
          <h3>Selected Review:</h3>
          <p>{selectedReview}</p>
        </div>
      )}
      {reviews && 
        reviews.map((rev, index) => (
          <React.Fragment key={index}>
            <div>{rev.reviewerName}</div>
            <div>{rev.review}</div>
          </React.Fragment>
        ))
      }
    </div>
  );
};

export default ReviewsDropdown;
