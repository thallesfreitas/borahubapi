// import { dbClient } from '../../lib';
import dbClient from '../../lib/dbClient';
export interface GetAllOptions {
  withoutProductBinded?: boolean;
}

// interface CreateOneArgs {
//   idErp: string;
//   name: string;
//   height: number;
//   width: number;
//   length: number;
//   price: number;
//   weight: number;
// }

// export const createProduct = async (data: CreateOneArgs) => {
//   return dbClient.erpProduct.create({
//     data: {
//       idErp: data.idErp,
//       name: data.name,
//       height: data.height,
//       width: data.width,
//       length: data.length,
//       price: data.price,
//       weight: data.weight,
//     },
//   });
// };

// interface AddStockToProductArgs {
//   idErpProduct: number;
//   idErp: string;
//   quantity: number;
// }

// export const addStockToProduct = async (data: AddStockToProductArgs) => {
//   return dbClient.erpProductStock.create({
//     data: {
//       quantity: data.quantity,
//       erpProduct: {
//         connect: {
//           id: data.idErpProduct,
//         },
//       },
//       warehouse: {
//         connectOrCreate: {
//           where: {
//             idErp: data.idErp,
//           },
//           create: {
//             idErp: data.idErp,
//             name: '',
//           },
//         },
//       },
//     },
//   });
// };
