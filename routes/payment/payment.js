const router = require('express').Router();
const Razorpay = require('razorpay');
const { nanoid } = require('nanoid');
const crypto = require('crypto');
const OrderDetails = require('../../models/order');
const userDetails = require('../../models/user');
const verifyUser = require('../auth/verifyToken');

const razorPayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post('/order', verifyUser, (req, res) => {
  const params = {
    amount: req.body.amount * 100,
    currency: 'INR',
    receipt: nanoid(),
    payment_capture: '1',
  };
  razorPayInstance.orders.create(params).then(async (response) => {
    const order = new OrderDetails({
      orderId: response.id,
      receiptId: response.receipt,
      amount: response.amount,
      currency: response.currency,
      createdAt: response.created_at,
      status: response.status,
      userID: req.user.id,
    });
    try {
      const details = await order.save();
      res.status(200).send(details);
    } catch (err) {
      if (err) throw err;
    }
  }).catch((err) => {
    if (err) throw err;
  });
});

router.post('/verify', verifyUser, async (req, res) => {
  const body = `${req.body.razorpay_order_id}|${req.body.razorpay_payment_id}`;

  const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');

  if (expectedSignature === req.body.razorpay_signature) {
    await OrderDetails.findOneAndUpdate(
      { orderId: req.body.razorpay_order_id },
      {
        paymentId: req.body.razorpay_payment_id,
        signature: req.body.razorpay_signature,
        status: 'paid',
      }, { new: true },
      async (err, details) => {
        if (err) res.status(400).send(err);
        const days = (req.body.plan === 'M' ? 30 : 365);
        await userDetails.findOneAndUpdate({ _id: req.user.id },
          { expiry: new Date(new Date().setDate(new Date().getDate() - days).toJSON().replace(/-/g, '/')) });
        res.status(200).send(details);
      },
    );
  } else {
    await userDetails.findOneAndUpdate({ _id: req.user.id }, { status: 'failed' }, { new: true });
    res.status(205).send('Payment Failed');
  }
});

module.exports = router;
