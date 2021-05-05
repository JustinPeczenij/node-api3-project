// require your server and launch it
const server = require('./api/server')

server.listen(3000, ()=> {
    console.log('\n* server is running on port 3000 *\n')
})