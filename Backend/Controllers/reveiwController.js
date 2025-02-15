// controllers/reviewController.js
import Review from "../Models/reveiwModel.js";

// Submit a reviewimport mongoose from "mongoose";
import mongoose from "mongoose";
export const submitReview = async (req, res) => {
    try {
      let { review_text, rating, user_id, user_name } = req.body;
  
      // Validate user_id
      if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(400).json({ error: "Invalid user_id format" });
      }
  
      user_id = new mongoose.Types.ObjectId(user_id); // Convert to ObjectId
  
      // Create new review
      const review = new Review({
        review_text,
        rating,
        user_id,
        user_name, // Add user_name to the review
      });
  
      await review.save();
      return res.status(201).json({ message: "Review submitted successfully" });
    } catch (err) {
      console.error("Error submitting review:", err);
      return res.status(500).json({ error: "Failed to submit review", details: err.message });
    }
  };
  

// Get all reviews for admin

export const getReviews = async (req, res) => {
    try {
      const reviews = await Review.find().populate("user_id", "User");
  
      if (!reviews || reviews.length === 0) {
        return res.status(404).json({ error: "No reviews found" });
      }
  
      return res.status(200).json(reviews);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      return res.status(500).json({ error: "Failed to fetch reviews", details: err.message });
    }
  };

// Approve a review (make it visible)
export const approveReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await Review.findByIdAndUpdate(reviewId, { status: 'approved' }, { new: true });

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    return res.status(200).json({ message: 'Review approved successfully', review });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to approve review' });
  }
};

// Feature a review (highlight it)
export const featureReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await Review.findByIdAndUpdate(reviewId, { is_featured: true }, { new: true });

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    return res.status(200).json({ message: 'Review featured successfully', review });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to feature review' });
  }
};


// Get only approved reviews
export const getApprovedReviews = async (req, res) => {
    try {
      const reviews = await Review.find({ status: "approved" })
        .populate("user_id", "name") // Populate user's name
        .sort({ updatedAt: -1 }); // Sort by latest
  
      if (!reviews.length) {
        return res.status(404).json({ error: "No approved reviews found" });
      }
  
      return res.status(200).json(reviews);
    } catch (err) {
      console.error("Error fetching approved reviews:", err);
      return res.status(500).json({ error: "Failed to fetch approved reviews" });
    }
  };
  