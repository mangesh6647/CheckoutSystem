import express from 'express'
import router from './routes'

const PORT = 3000;
const server = express()

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(router)
server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
