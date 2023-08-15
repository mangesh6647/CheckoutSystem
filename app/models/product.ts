import {
    DataTypes, Model, Sequelize,
} from 'sequelize'


class Product extends Model {
    public productName!: string
    public price!: number

    // Auto-generated
    public id!: number
    public createdAt!: Date;
    public updatedAt!: Date;


    public static initialize(sequelize: Sequelize) {
        this.init({
            productName: DataTypes.STRING,
            price: DataTypes.INTEGER
        }, { sequelize: sequelize })
    }
}

export default Product;