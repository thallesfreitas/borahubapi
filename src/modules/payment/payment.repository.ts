/* eslint-disable @typescript-eslint/naming-convention */
// SDK do Mercado Pago
const mercadopago = require('mercadopago');
// Adicione as credenciais
mercadopago.configure({
  access_token:
    'TEST-6139487512800502-090214-f45c4318c4c6ec68c04b7846b4920ee4-75364347',
});
export const payment = async (userId: number) => {
  // const credits = await db.credits.findFirst({
  //   where: {
  //     userId,
  //   },
  // });

  const preference = {
    // o "purpose": "wallet_purchase" permite apenas pagamentos logados
    // para permitir pagamentos como guest, você pode omitir essa propriedade
    // purpose: 'wallet_purchase',
    items: [
      {
        id: 'item-ID-1234',
        title: 'Meu produto',
        quantity: 1,
        unit_price: 75.76,
      },
    ],
  };

  const payment_data = {
    amount: 100,
  };
  const paymentResult = await mercadopago.payment.save(payment_data);
  const { status, status_detail, id } = paymentResult.body;

  // .then(function(response) {
  //   const { status, status_detail, id } = response.body;
  //   res.status(response.status).json({ status, status_detail, id });
  // })
  // .catch(function(error) {
  //   console.error(error);
  // });
  return { status, status_detail, id };
};
