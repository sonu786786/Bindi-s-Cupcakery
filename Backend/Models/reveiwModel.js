import mongoose from 'mongoose';
import User from "./UserModels.js";

const reviewSchema = new mongoose.Schema(
  {
    review_text: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 1000,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    status: {
      type: String,
      enum: ['pending', 'approved'],
      default: 'pending',
    },
    is_featured: {
      type: Boolean,
      default: false,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    user_name: {
      type: String, // Add the user_name field
      required: true,
    }
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);

export default Review;
