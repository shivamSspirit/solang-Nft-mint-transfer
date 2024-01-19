import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { getMint } from "@solana/spl-token";

import * as anchor from "@coral-xyz/anchor";
import { Program, Idl, AnchorProvider, BN, utils, web3 } from "@coral-xyz/anchor";
import { Metaplex } from "@metaplex-foundation/js";

import idl from "../../idl.json";
import { Commitment, PublicKey, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import { notify } from "utils/notifications";
import { CopyIcon, LinkIcon, Loader } from "./Icons";

const programId = new PublicKey(idl.metadata.address);

const opts: { preflightCommitment: Commitment } = {
    preflightCommitment: "processed",
};

export const MintNFTButton = () => {
    const [txSig, setTxSig] = useState("");

    const [loading, setLoading] = useState(false);

    const { connection } = useConnection();
    const wallet = useWallet();
    const { publicKey, sendTransaction } = useWallet();

    const link = () => {
        return txSig ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet` : "";
    };

    const getProgram = () => {
        /* create the provider and return it to the caller */

        const provider = new AnchorProvider(connection, wallet as any, opts);
        /* create the program interface combining the idl, program ID, and provider */
        const program = new Program(idl as Idl, programId, provider);
        return program;
    };

    const program = getProgram();

    // data and mint account
    const dataAccount = anchor.web3.Keypair.generate();
    const mintKeypair = anchor.web3.Keypair.generate();

    const mintNft = async () => {};
    return (
        <div>
            {publicKey ? (
                <form onSubmit={mintNft} className="text-center">
                    <button type="submit" className="btn px-8 bg-purple-500 hover:bg-purple-400">
                        {loading && <Loader />} Mint NFT
                    </button>
                </form>
            ) : (
                <span>Connect Your Wallet</span>
            )}
            {txSig ? (
                <div className="flex flex-col gap-y-2 mt-4">
                    <p className="flex items-center gap-x-2">
                        NFT Minted :fire:
                        {/* <button
                            onClick={() => navigator.clipboard.writeText(mint)}
                            className="btn p-1 min-h-0 h-fit bg-transparent normal-case gap-x-2"
                        >
                            {mint} <CopyIcon />
                        </button> */}
                    </p>
                    <p className="flex items-center gap-x-2">
                        View your transaction on
                        <a className="link flex gap-x-2 items-center" href={link()}>
                            Solana Explorer
                            <span className="h-5 w-5">
                                <LinkIcon />
                            </span>
                        </a>
                    </p>
                </div>
            ) : null}
        </div>
    );
};
