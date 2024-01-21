'use client'
import { useState } from 'react';
import { ConnectKitButton } from 'connectkit';
import React from 'react'
import { useModal } from 'connectkit'
import { useSIWE, SIWESession } from "connectkit";
import { useNetwork, useDisconnect, useAccount, useConnect } from 'wagmi'
import { ChainIcon } from "connectkit";
import {abi} from "../abi/abi.json"
import { useSendTransaction } from 'wagmi';
import { usePrepareContractWrite, useContractWrite, useContractRead, erc20ABI } from 'wagmi';
export default function Home() {
  const [player, setPlayer] = useState(''); // State for player address
  const [amount, setAmount] = useState(); // State for staked amount
  const [gameid, setGameId] = useState( ); // State for game ID
  const [ghoAmount, setGhoAmount] = useState(); // State for GHO amount





  const { setOpen } = useModal();
  const { data, isSignedIn, signOut, signIn } = useSIWE();
  const { isConnected, address, isConnecting } = useAccount();
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();
  const { sendTransaction, error} = useSendTransaction()




  const contractAddress = '0x370a2367831d663d31d38a0fec9112fae036bd3f'; // Replace with your contract address
  const contractABI = abi;

  if (isConnecting) return <div>Connecting ....</div>;

  const { config, error: contractWriteError } = usePrepareContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: 'startRound',
    args: [[player, amount, gameid, ghoAmount]],
  });

  const { data: writeData, isLoading: writeLoading, write } = useContractWrite(config);
  return (
    <div className="p-23">
      {!isConnected && <button onClick={() => setOpen(true)}>Connect WALLET</button>}
      {isConnected && (
        <div>
          <h1>Connected wallet: {address}</h1>
          <ChainIcon id={chain?.id} unsupported={chain?.unsupported} />
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => disconnect()}>Disconnect</button>
        </div>    
      )}
      <br/><hr/><br/>
      <div>
            <h2>Game ID: {gameid}</h2>
            <div className="space-y-4">
            <h2 className="text-lg font-semibold">Game ID: {gameid}</h2>
            <label className="flex flex-col">
              <span className="mb-1">Player Address:</span>
              <input
                className="border border-gray-300 px-3 py-2 rounded"
                type="text"
                value={player}
                onChange={(e) => setPlayer(e.target.value)}
              />
            </label>
            <label className="flex flex-col">
              <span className="mb-1">Amount:</span>
              <input
                className="border border-gray-300 px-3 py-2 rounded"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </label>
            <label className="flex flex-col">
              <span className="mb-1">Game ID:</span>
              <input
                className="border border-gray-300 px-3 py-2 rounded"
                type="number"
                value={gameid}
                onChange={(e) => setGameId(Number(e.target.value))}
              />
            </label>
            <label className="flex flex-col">
              <span className="mb-1">GHO Amount:</span>
              <input
                className="border border-gray-300 px-3 py-2 rounded"
                type="number"
                value={ghoAmount}
                onChange={(e) => setGhoAmount(Number(e.target.value))}
              />
            </label>
            <button  className="bg-green-500 text-white px-4 py-2 rounded" disabled={!write} onClick={() => write()}>
          Write function
        </button>
          </div>
          </div>
    </div>
  );
}




