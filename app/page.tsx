'use client'
import { ConnectKitButton } from 'connectkit';
import React from 'react'
import { useModal } from 'connectkit'
import { useSIWE, SIWESession } from "connectkit";
import { useNetwork, useDisconnect, useAccount, useConnect } from 'wagmi'
import { ChainIcon } from "connectkit";
import {abi} from "../abi/abi.json"

export default function Home() {
  const { setOpen } = useModal();
  const { data, isSignedIn, signOut, signIn } = useSIWE();
  const { isConnected, address, isConnecting } = useAccount();
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();

  if (isConnecting) return <div>Connecting ....</div>;

  return (
    <div className="p-23">
      {!isConnected && <button onClick={() => setOpen(true)}>Connect WALLET</button>}
      {isConnected && (
        <div>
          <h1>Connected wallet: {address}</h1>
          <ChainIcon id={chain?.id} unsupported={chain?.unsupported} />
          <button onClick={() => disconnect()}>Disconnect</button>
        </div>    
      )}
    </div>
  );
}




