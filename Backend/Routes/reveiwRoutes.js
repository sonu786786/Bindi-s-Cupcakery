// routes/reviewRoutes.js
import express from 'express';
import { submitReview, getReviews, approveReview, featureReview,getApprovedReviews  } from '../Controllers/reveiwController.js';

const router = express.Router();

// Submit a review (User can do this)
router.post('/submit', submitReview);

// Admin routes (these would need authentication and authorization, e.g., middleware)
router.get('/admin/reviews', getReviews);
router.put('/admin/reviews/approve/:reviewId', approveReview);
router.put('/admin/reviews/feature/:reviewId', featureReview);


// Route to get only approved reviews
router.get("/approved", getApprovedReviews);


export default router;
