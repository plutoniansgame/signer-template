import styles from '../styles/Home.module.css'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Stack } from "@mui/material"
import { useWallet } from '@solana/wallet-adapter-react';

export default function Home() {
  const wallet = useWallet();

  const getMessage = async () => {
    const res = await fetch('/api/get-message');
    const { message } = await res.json();
    const te = new TextEncoder("utf-8");
    const bytes = te.encode(message);
    let signature = await wallet.signMessage(bytes);

    const res2 = await fetch('/api/verify-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address: wallet.publicKey.toString(),
        signature,
      })
    });

    const { verified, secretURL } = await res2.json();
    console.log({ verified })

    if (verified) {
      window.location.href = secretURL;
    }
  }

  return (
    <Stack direction="column" spacing={4}>
      <Stack direction="row" justifyContent="space-between" alignItems={"center"}>
        <h1>test</h1>
        <WalletMultiButton />
      </Stack>
      <button onClick={getMessage}>Click me to sign in</button>
    </Stack>
  )
}
