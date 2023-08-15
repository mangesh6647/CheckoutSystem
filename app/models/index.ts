import { Options, Sequelize } from 'sequelize'
import Product from './product';
import CartItem from './cart';
import config from '../config.json'

// Open database connection
const sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    <Options>config.development
)

// Initialize each model in the database
let models = [Product, CartItem]
models.forEach(model => model.initialize(sequelize))


// Create database tables
// Pass {force :true } in sync function, force: true causes database to reset with each run
sequelize.sync()

export {
    sequelize as Database,
    Product,
    CartItem
}