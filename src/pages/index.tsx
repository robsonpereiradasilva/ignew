import { GetStaticProps } from 'next';
import Head from 'next/head'
import { stripe } from '../services/stripe';

import styles from './home.module.scss';
import { SubscribeButton } from './SubscribeButton';

interface  HomeProps{
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({product}: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.News</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span> Hey, welcome</span>
          <h1>News about <span>React</span> world.</h1>
          <p>
            Get access to all the content publications <br />
            <span>for { product.amount} month</span>
          </p>    
          <SubscribeButton priceId={product.priceId }/>
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>

  )
}

export const getStaticProps: GetStaticProps = async () =>{
  const price =  await stripe.prices.retrieve('price_1LqzbYA7wDCYbW0tVFG2iqKP')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('es-US',{
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount/100),
  };

  return {
    props: {
      product,
    },
    revalidate: 10,  //Represent 1 day 24hours
  }
}