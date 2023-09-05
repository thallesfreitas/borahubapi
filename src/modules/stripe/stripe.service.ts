import * as StripeRepository from './stripe.repository';

export const createUserStripe = async (email: string, name: string) =>
  StripeRepository.createUserStripe({ email, name });
