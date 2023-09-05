// import { dbClient } from '../../lib';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export interface CreateUserStripeArgs {
  email: String;
  name: String;
}
interface CreateUserStripe {
  (param: CreateUserStripeArgs): Promise<string>;
}
export const createUserStripe: CreateUserStripe = async ({ email, name }) => {
  const customers = await stripe.customers.list({ email });
  let customer;

  if (customers.data.length > 0) {
    customer = await stripe.customers.update(customers.data[0].id, {
      name,
    });
  } else {
    customer = await stripe.customers.create({
      name,
      email,
    });
  }

  return customer.id;
};
