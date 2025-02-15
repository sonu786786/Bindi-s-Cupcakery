"use client";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

const ReviewForm = () => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const user_id = localStorage.getItem("user_id");
    const user_name = localStorage.getItem("user_name"); // Get the user name from localStorage
    
    if (!user_id || user_id.length !== 24) {
      setMessage("Invalid user ID. Please log in.");
      return;
    }
  
    const reviewData = { 
      review_text: reviewText, 
      rating: Number(rating), 
      user_id,
      user_name // Include the user name in the review data
    };
  
    console.log("Submitting Review Data:", reviewData);
  
    try {
      const response = await fetch("http://localhost:4000/api/v1/reviews/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });
  
      const data = await response.json();
      console.log("Server Response:", data);
  
      if (response.ok) {
        setMessage("Review submitted successfully!");
        setReviewText("");
        setRating(0);
      } else {
        setMessage(data.error || "Failed to submit review.");
      }
    } catch (error) {
      console.error("Network error:", error);
      setMessage("Network error. Please try again.");
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 p-4 rounded-lg shadow-lg max-w-sm mx-auto">
      <h2 className="text-white text-lg font-semibold mb-2 text-center">Leave a Review</h2>
      
      <textarea
        className="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Write your review..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        required
      ></textarea>

      {/* Star Rating System */}
      <div className="flex justify-center mt-3 mb-2">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <FaStar
              key={index}
              className={`cursor-pointer transition-colors duration-200 ${
                starValue <= (hover || rating) ? "text-yellow-400" : "text-gray-500"
              }`}
              size={24}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(starValue)}
            />
          );
        })}
      </div>

      <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-500 transition">
        Submit Review
      </button>

      {message && <p className="mt-2 text-center text-green-400">{message}</p>}
    </form>
  );
};

export default ReviewForm;
