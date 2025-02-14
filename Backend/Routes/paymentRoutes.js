import express from 'express'
import {
  checkout,
  verifyPayment,
} from "../Controllers/paymentController.js";
import {Authenticated} from '../Middlewares/AuthMiddleware.js'

const router = express.Router();



// // user order
// router.get("/userorder",Authenticated, userOrder);

// // All order's
// router.get("/orders", allOrders);

// Route to handle order creation
router.post('/create-order', checkout);

// Route to handle payment verification
router.post('/verify-payment', verifyPayment);

// Route to handle successful payment
router.get('/payment-success', (req, res) => {
    res.send("Payment successful");
});

// module.exports = router;




export default router