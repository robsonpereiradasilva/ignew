import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from 'stream'
import Stripe from "stripe";
import { stripe } from "../../services/stripe";
import { saveSubscription } from "./_lib/manageSubscription";

async function buffer(readable: Readable) {
    const chunks = []

    for await (const chunk of readable) {
        chunks.push(
            typeof chunk === 'string' ? Buffer.from(chunk) : chunk
        );
    }
    return Buffer.concat(chunks)
}

export const config = {
    api: {
        bodyParser: false
    }
}

const relevantEvents = new Set([
    'checkout.session.completed',
    'customer.subscription.updated',
    'customer.subscription.delete',
])


// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const buf = await buffer(req)
       
        const secret = req.headers['stripe-signature']

        let event: Stripe.Event;


        try {
            event = stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_WEBHOOK_SECRET)       
        } catch (error) {             
            return res.status(400).send(`Webhook erro: ${error.message}`);
        }

        const { type } = event;


        if (relevantEvents.has(type)) {
            try {
                switch (type) {
                    case 'customer.subscription.created':   
                    case 'customer.subscription.updated':               
                    case 'customer.subscription.deleted':

                        console.log("tipo evento " + type)


                        const subscription = event.data.object as Stripe.Subscription;
                        
                        console.log("subscription evento " + subscription)
                        await saveSubscription(
                            subscription.id,
                            subscription.customer.toString(),
                            false,                    
                            )                            
                        break;
                        
                        case 'checkout.session.completed':

                        const checkoutSession = event.data.object as Stripe.Checkout.Session
                         
                        console.log("checkoutSession evento " + checkoutSession)
                        await saveSubscription(
                            checkoutSession.subscription.toString(),
                            checkoutSession.customer.toString(),
                            true,                  
                        )
                        break;
                    default:
                    throw new Error('Evento não tratado')
                }
            }
            catch (error) { 
                return res.json({ error: 'Webhook handler failed.' })
            }
        }
        res.json({ received: true })
    } else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method not allowed')
    }
}