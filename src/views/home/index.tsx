// Next, React
import { FC, useEffect } from "react";

// Wallet
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

// Store
import useUserSOLBalanceStore from "../../stores/useUserSOLBalanceStore";

import { MintNFTButton } from "components/MintNFTButton";
import * as anchor from "@coral-xyz/anchor";

export const HomeView: FC = ({}) => {
    const wallet = useWallet();
    const { connection } = useConnection();

    const balance = useUserSOLBalanceStore((s) => s.balance);
    const { getUserSOLBalance } = useUserSOLBalanceStore();

    // Mint Account
    const mintKeypair = anchor.web3.Keypair.generate();

    useEffect(() => {
        if (wallet.publicKey) {
            console.log(wallet.publicKey.toBase58());
            getUserSOLBalance(wallet.publicKey, connection);
        }
    }, [wallet.publicKey, connection, getUserSOLBalance]);

    return (
        <div className="md:px-32 px-4 mx-auto py-12 max-w-7xl">
            <div className="md:px-16 px-4 pt-4 flex flex-col items-start gap-y-16">
                <div className="flex flex-col gap-16 w-full items-center">
                    <MintNFTButton mint={mintKeypair} />
                </div>
            </div>
        </div>
    );
};
