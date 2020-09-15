const {ServerParameters} = require("./configuration/ConfigParameters");
const Server = require('./src/server.js');

const port = process.env.PORT || ServerParameters.PORT;
Server.listen(port, () => {
   console.log(`Listening on: http://localhost:${port}`);
   console.log('SERVER Started on PORT ', port, ' at ', new Date().toJSON());
});