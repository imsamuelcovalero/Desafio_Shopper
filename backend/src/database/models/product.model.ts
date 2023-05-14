import { Model, DataTypes } from 'sequelize';
import db from '.';

class ProductModel extends Model {
  code!: number;
  name!: string;
  costPrice!: number;
  salesPrice!: number;
}

ProductModel.init(
  {
    code: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      field: 'code',
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'name',
    },
    costPrice: {
      type: DataTypes.DECIMAL(9, 2),
      allowNull: false,
    },
    salesPrice: {
      type: DataTypes.DECIMAL(9, 2),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'products',
    underscored: true,
    createdAt: false,
    updatedAt: false,
  },
);

export default ProductModel;
