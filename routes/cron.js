const cron = require('node-cron');
const userModel = require('../models/user');

function membershipExpiry() {
  try {
    userModel.updateMany({ expiry: Date.now() }, { isPremium: false });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('CRON ERROR---->>>', err);
  }
}

const membershipExpiryTask = cron.schedule('0 0 0 * * *', () => {
  membershipExpiry();
  membershipExpiryTask.stop();
});
