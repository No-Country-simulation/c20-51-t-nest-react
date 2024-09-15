import Stripe from 'stripe';
import { envs } from './envs';

export const stripe = new Stripe(envs.STRIPE_SECRET);
