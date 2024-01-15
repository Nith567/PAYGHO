'use client'
import { WagmiConfig, createConfig } from "wagmi";
import React, { ReactNode } from 'react';
import { ConnectKitProvider, ConnectKitButton, getDefaultConfig } from "connectkit";

interface ConnectKitProviderProps {
  children: ReactNode;
}
const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: process.env.ALCHEMY_ID,
    walletConnectProjectId: process.env.PROJECT_ID as string,

    // Required
    appName: "LGFHO",

    // Optional
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
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