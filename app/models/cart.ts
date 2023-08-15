import { DataTypes, Model, Sequelize } from 'sequelize';

class CartItem extends Model {
    public productId!: number;
    public quantity!: number;

    // Auto-generated
    public id!: number;
    public createdAt!: Date;
    public updatedAt!: Date;

    public static initialize(sequelize: Sequelize) {
        this.init(
            {
                productId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                quantity: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 1,
                },
            },
            { sequelize: sequelize }
        );
    }
}

export default CartItem;
