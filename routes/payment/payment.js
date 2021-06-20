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

router.post('/verify', async (req, res) => {
  const body = req.body.payload.payment.entity;
  const secret = 'technoquiz';
  const signature = req.headers['x-razorpay-signature'];
  const expectedSignature = crypto.createHmac('sha256', secret)
    .update(JSON.stringify(req.body))
    .digest('hex');
  const uId = await OrderDetails.findOne({ orderId: body.order_id }, 'userID');
  if (expectedSignature === signature) {
    await OrderDetails.findOneAndUpdate(
      { orderId: body.order_id },
      {
        paymentId: body.id,
        signature,
        status: 'paid',
      }, { new: true },
      async (err, details) => {
        if (err) res.status(400).send(err);
        const days = (req.body.plan === 'M' ? 30 : 365);
        await userDetails.findOneAndUpdate({ _id: details.userID },
          {
            expiry: new Date(new Date().setDate(new Date().getDate() - days)),
            isPremium: true,
          }, { new: true });
        res.status(200).send('ok');
      },
    );
  } else {
    await userDetails.findOneAndUpdate({ _id: uId }, { status: 'failed' }, { new: true });
    res.status(205).send('Payment Failed');
  }
});

module.exports = router;
