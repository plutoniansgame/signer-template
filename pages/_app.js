import "../styles/globals.css";
import { useMemo } from "react";
import { clusterApiUrl } from "@solana/web3.js";
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
  BloctoWalletAdapter,
  SolletWalletAdapter,
  BraveWalletAdapter,
  KeystoneWalletAdapter,
  SalmonWalletAdapter,
  TorusWalletAdapter,
  SolflareWalletAdapter

} from '@solana/wallet-adapter-wallets';
import Head from "next/head";
require('@solana/wallet-adapter-react-ui/styles.css');


function MyApp({ Component, pageProps }) {

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(WalletAdapterNetwork.Devnet), []);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
      new SolletWalletAdapter(),
      new BloctoWalletAdapter(),
      new BraveWalletAdapter(),
      new KeystoneWalletAdapter(),
      new SalmonWalletAdapter(),
      new TorusWalletAdapter(),
      new SolflareWalletAdapter()
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Head>
            <title>Plutonians</title>
          </Head>
          <Component {...pageProps} />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default MyApp;
