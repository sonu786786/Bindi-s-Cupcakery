"use client";
import { useEffect, useState } from "react";

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/v1/reviews/admin/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  const handleApprove = async (reviewId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/reviews/admin/reviews/approve/${reviewId}`,
        { method: "PUT" }
      );
      if (response.ok) {
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review._id === reviewId ? { ...review, status: "approved" } : review
          )
        );
      }
    } catch (error) {
      console.error("Error approving review:", error);
    }
  };

  const handleFeature = async (reviewId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/reviews/admin/reviews/feature/${reviewId}`,
        { method: "PUT" }
      );
      if (response.ok) {
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review._id === reviewId ? { ...review, is_featured: true } : review
          )
        );
      }
    } catch (error) {
      console.error("Error featuring review:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Admin - Manage Reviews</h2>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review._id} className="p-2 border-b">
              <p>
                <strong>{review.user_name || "Anonymous"}:</strong>{" "}
                {review.review_text}
              </p>
              <p>Rating: {review.rating} / 5</p>
              <p>Status: {review.status}</p>
              {review.status === "pending" && (
                <button
                  className="bg-green-500 text-white p-1 m-1 rounded"
                  onClick={() => handleApprove(review._id)}
                >
                  Approve
                </button>
              )}
              {!review.is_featured && review.status === "approved" && (
                <button
                  className="bg-blue-500 text-white p-1 m-1 rounded"
                  onClick={() => handleFeature(review._id)}
                >
                  Feature
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default AdminReviews;
