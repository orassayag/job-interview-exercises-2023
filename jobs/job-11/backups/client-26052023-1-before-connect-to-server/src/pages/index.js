import Head from 'next/head';
import Storyboard from '../components/pages/Storyboard/Storyboard';

export default function Home() {
  return (
    <>
      <Head>
        <title>Storyboard Manager</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script src="https://kit-pro.fontawesome.com/releases/v6.4.0/js/pro.min.js" data-auto-fetch-svg></script>
      </Head>
      <Storyboard />
    </>
  );
}
