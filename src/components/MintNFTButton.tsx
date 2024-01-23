import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";

import * as anchor from "@coral-xyz/anchor";
import { Program, Idl, AnchorProvider, BN, utils, web3 } from "@coral-xyz/anchor";
import { Metaplex, Nft, Sft } from "@metaplex-foundation/js";

import idl from "../../idl.json";
import { Commitment, Keypair, PublicKey, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";

import { notify } from "utils/notifications";
import { LinkIcon, Loader } from "./Icons";
import { NFTCard } from "./nft/NFTCard";

const programId = new PublicKey(idl.metadata.address);

const opts: { preflightCommitment: Commitment } = {
    preflightCommitment: "processed",
};

export const MintNFTButton = ({ mint: mintKeypair }: { mint: Keypair }) => {
    const [txSig, setTxSig] = useState("");
    const [loading, setLoading] = useState(false);
    const [nftDetails, setNftDetails] = useState<Sft | Nft | null>(null);

    const { connection } = useConnection();
    const wallet = useWallet();
    const { publicKey, sendTransaction } = useWallet();

    const link = () => {
        return txSig ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet` : "";
    };
    // const program = anchor.workspace?.PdaMintAuthority as Program<PdaMintAuthority>;

    const getProgram = () => {
        /* create the provider and return it to the caller */

        const provider = new AnchorProvider(connection, wallet as any, opts);
        /* create the program interface combining the idl, program ID, and provider */
        const program = new Program(idl as Idl, programId, provider);
        return program;
    };

    const program = getProgram();

    // Derive the PDA that will be used to initialize the dataAccount.
    const [dataAccountPDA, bump] = PublicKey.findProgramAddressSync([Buffer.from("mint_authority")], program.programId);

    const nftTitle = "Homer NFT";
    const nftSymbol = "HOMR";
    const nftUri =
        "https://raw.githubusercontent.com/solana-developers/program-examples/new-examples/tokens/tokens/.assets/nft.json";

    const mintNft = async (e) => {
        setLoading(true);
        try {
            e.preventDefault();

            const metaplex = Metaplex.make(connection);
            const metadataAddress = await metaplex.nfts().pdas().metadata({ mint: mintKeypair.publicKey });

            // Add your test here.
            const createTx = await program.methods
                .createTokenMint(
                    dataAccountPDA,
                    0, // 0 decimals for NFT
                    nftTitle, // NFT name
                    nftSymbol, // NFT symbol
                    nftUri // NFT URI
                )
                .accounts({
                    payer: wallet.publicKey,
                    mint: mintKeypair.publicKey,
                    metadata: metadataAddress,
                    mintAuthority: dataAccountPDA,
                    rentAddress: SYSVAR_RENT_PUBKEY,
                    metaplexId: new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"),
                })
                .signers([mintKeypair])
                .rpc({ skipPreflight: true });

            const tokenAccount = getAssociatedTokenAddressSync(mintKeypair.publicKey, wallet.publicKey);

            const tx = await program.methods
                .mintTo()
                .accounts({
                    pdaAccount: dataAccountPDA,
                    payer: wallet.publicKey,
                    tokenAccount: tokenAccount,
                    owner: wallet.publicKey,
                    mint: mintKeypair.publicKey,
                })
                .rpc({ skipPreflight: true });

            setTxSig(tx);

            let metadata = await metaplex
                .nfts()
                .findByMint({ mintAddress: mintKeypair.publicKey, tokenOwner: wallet.publicKey });
            setNftDetails(metadata);
            notify({ message: "NFT Minted" });
        } catch (err) {
            console.log(err);
            notify({ message: err.message });
        }
        setLoading(false);
    };

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
            {txSig && nftDetails ? (
                <div>
                    <div className="flex flex-col gap-y-2 mt-8">
                        <p className="flex items-center gap-x-2">NFT Minted 🎉</p>
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
                    <div className="w-full max-w-xs ">
                        <p className="text-xl mt-4 mb-4 font-light">Here is your minted NFT</p>
                        <NFTCard nftDetails={nftDetails} mint={mintKeypair} />
                    </div>
                </div>
            ) : null}
        </div>
    );
};
