const cron = require('node-cron');
const { DateTime } = require('luxon');
const userModel = require('../models/user');

// CRON service to update user scores daily
function membershipExpiry() {
  try {
    userModel.updateMany({ expiry: DateTime.now().toISODate() }, { isPremium: false });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('CRON ERROR---->>>', err);
  }
}

const membershipExpiryTask = cron.schedule('0 0 0 * * *', () => {
  membershipExpiry();
  membershipExpiryTask.stop();
});
