import Head from 'next/head';
import Form from '../components/pages/Form/Form';
import Day from '../components/pages/Day/Day';

export default function Home() {
  return (
    <>
      <Head>
        <title>American Questions Form</title>
        <meta name="description" content="American Questions Form" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Day /> */}
      <Form />
    </>
  );
}
