import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Metaplex } from "@metaplex-foundation/js";
import { getParsedNftAccountsByOwner, isValidSolanaAddress, createConnectionConfig } from "@nfteyez/sol-rayz";

import React from "react";

export const NFTList = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const metaplex = new Metaplex(connection);

    const getAllSolanaNFTs = async () => {
        const tokens = await connection.getParsedTokenAccountsByOwner(publicKey, {
            programId: TOKEN_PROGRAM_ID,
        });
        // filter NFTs
        const nfts = tokens.value.filter((token) => token.account.data.parsed.info.tokenAmount.decimals === 0);

        // const nfts = await getParsedNftAccountsByOwner({
        //     publicAddress: publicKey.toString(),
        //     connection: connection,
        // });

        // const myNfts = await metaplex.nfts().findAllByOwner({
        //     owner: publicKey,
        // });
        console.info(nfts, "nfts");
    };
    return (
        <div>
            <button onClick={getAllSolanaNFTs}>NFTList</button>
        </div>
    );
};
