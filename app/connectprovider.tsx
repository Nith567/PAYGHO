'use client'
import { WagmiConfig, createConfig } from "wagmi";
import React, { ReactNode } from 'react';
import { sepolia } from "wagmi/chains";
import { ConnectKitProvider, ConnectKitButton, getDefaultConfig, ChainIcon } from 'connectkit';

interface ConnectKitProviderProps {
  children: ReactNode;
}
const chains = [sepolia];
const config = createConfig(
  getDefaultConfig({
    alchemyId: process.env.ALCHEMY_ID,
    walletConnectProjectId: process.env.PROJECT_ID as string,
    // Required
    appName: "PAYGHO",
    appDescription: "PAYGHOFAM",
    chains,
    appUrl: "https://family.co", 
    appIcon: "https://family.co/logo.png",
  }),
);

export const ConnectKitProviders : React.FC<ConnectKitProviderProps>  = ({children}) => {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider
       theme="retro">
        {children}
        <ConnectKitButton />
      </ConnectKitProvider>
    </WagmiConfig>
  );
};