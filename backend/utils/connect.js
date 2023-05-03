const dbPath = 'mongodb://localhost:27017/spb-medicine'
const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
async function connected(app) {
    try {
      mongoose.connect(dbPath, {
        useNewUrlParser: true,
      });
    } catch (err) {
      console.log(err);
    }
    app.listen(PORT, () => {
      console.log(`App listeind o port ${PORT}`);
    });
  }
module.exports = {connected}