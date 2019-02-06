require('dotenv').config();
const server = require('./app.js');

const port = process.env.port || 4000;
server.listen(port, () => console.log(`Listening on port ${port}!`));
