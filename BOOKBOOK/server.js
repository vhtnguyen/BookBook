const app = require("./app");
const config = require("./configs/config");
const sequelize = require("./database/db").sequelize;
const services = require("./services/userServices");
const { QueryTypes } = require("sequelize");
//for deploy purpose
const port = config.PORT || 3000;

// sync model and db before start server

// sequelize.sync({ alter: true }).then(() => {
//   console.log("\nSync database\n");
//   return app.listen(port, async () => {
//     console.log(`Server is running on port ${port}\n`);
//   });
// });

app.listen(port, async () => {
  console.log(`Server is running on port ${port}\n`);
});
// app.listen(port, async () => {
//   username = "user333";
//   const result = await services.getNewestFeed();
//   console.log(result);
// });
