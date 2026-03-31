import Head from 'next/head';
import PizzaRestaurant from '../components/pages/PizzaRestaurant/PizzaRestaurant';

export default function Home() {
  return (
    <>
      <Head>
        <title>Pizza Restaurant</title>
        <meta name="description" content="Pizza restaurant - The best pizzas in the world" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PizzaRestaurant />
    </>
  );
}
