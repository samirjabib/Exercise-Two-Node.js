const { app } = require('./app');

// Utils
const { db } = require('./utils/database');

// Authenticate database credentials
db.authenticate()
  .then(() => console.log('Database authenticated'))
  .catch(err => console.log(err));

// Sync sequelize models
db.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.log(err));

app.listen(4150, () => {
  console.log(`Express app running on port: 4150`);
});
