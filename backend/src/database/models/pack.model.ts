import { Model, BIGINT } from 'sequelize';
import db from '.';
import ProductModel from './product.model';

class PackModel extends Model {
  id!: number;
  packId!: number;
  productId!: number;
  qty!: number;
}

PackModel.init(
  {
    id: {
      type: BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    packId: {
      type: BIGINT,
      allowNull: false,
    },
    productId: {
      type: BIGINT,
      allowNull: false,
    },
    qty: {
      type: BIGINT,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'packs',
    underscored: true,
    createdAt: false,
    updatedAt: false,
  },
);

// CONSTRAINT FOREIGN KEY (pack_id) REFERENCES products(code),
// implemente a linha comentada acima
PackModel.belongsTo(ProductModel, {
  foreignKey: 'packId',
  as: 'pack',
});

ProductModel.hasOne(PackModel, {
  foreignKey: 'packId',
  as: 'pack',
});

// CONSTRAINT FOREIGN KEY(product_id) REFERENCES products(code)
// a relação aqui é de 1 para N, pois cada productId pode estar contido N vezes, através de qty, mas referenciando por productId
PackModel.belongsTo(ProductModel, {
  foreignKey: 'productId',
  as: 'product',
});

ProductModel.hasMany(PackModel, {
  foreignKey: 'productId',
  as: 'packs',
});

export default PackModel;
