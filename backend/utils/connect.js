require('dotenv').config()
const { PORT = 3000, DB_PATH_PROD, DB_PATH_DEV, NODE_ENV } = process.env;
const mongoose = require('mongoose');
async function connected(app) {
  try {
    mongoose.connect(NODE_ENV === 'production' ? DB_PATH_PROD : DB_PATH_DEV, {
      useNewUrlParser: true,
    });
  } catch (err) {
    console.log(err)
  }
  app.listen(PORT, () => {
    console.log(`App listeind o port ${PORT}`);
  });
}
module.exports = { connected }