export type PdaMintAuthority = {
    version: "0.0.1";
    name: "pda_mint_authority";
    instructions: [
        {
            name: "new";
            accounts: [
                {
                    name: "dataAccount";
                    isMut: true;
                    isSigner: false;
                    isOptional: false;
                },
                {
                    name: "payer";
                    isMut: true;
                    isSigner: true;
                    isOptional: false;
                },
                {
                    name: "systemProgram";
                    isMut: false;
                    isSigner: false;
                    isOptional: false;
                }
            ];
            args: [
                {
                    name: "bump";
                    type: {
                        array: ["u8", 1];
                    };
                }
            ];
        },
        {
            name: "createTokenMint";
            accounts: [
                {
                    name: "payer";
                    isMut: true;
                    isSigner: true;
                    isOptional: false;
                },
                {
                    name: "mint";
                    isMut: true;
                    isSigner: true;
                    isOptional: false;
                },
                {
                    name: "metadata";
                    isMut: true;
                    isSigner: false;
                    isOptional: false;
                },
                {
                    name: "mintAuthority";
                    isMut: false;
                    isSigner: false;
                    isOptional: false;
                },
                {
                    name: "rentAddress";
                    isMut: false;
                    isSigner: false;
                    isOptional: false;
                },
                {
                    name: "metaplexId";
                    isMut: false;
                    isSigner: false;
                    isOptional: false;
                },
                {
                    name: "systemProgram";
                    isMut: false;
                    isSigner: false;
                    isOptional: false;
                },
                {
                    name: "tokenProgram";
                    isMut: false;
                    isSigner: false;
                    isOptional: false;
                }
            ];
            args: [
                {
                    name: "freezeauthority";
                    type: "publicKey";
                },
                {
                    name: "decimals";
                    type: "u8";
                },
                {
                    name: "name";
                    type: "string";
                },
                {
                    name: "symbol";
                    type: "string";
                },
                {
                    name: "uri";
                    type: "string";
                }
            ];
        },
        {
            name: "mintTo";
            accounts: [
                {
                    name: "payer";
                    isMut: true;
                    isSigner: true;
                    isOptional: false;
                },
                {
                    name: "tokenAccount";
                    isMut: true;
                    isSigner: false;
                    isOptional: false;
                },
                {
                    name: "owner";
                    isMut: false;
                    isSigner: false;
                    isOptional: false;
                },
                {
                    name: "mint";
                    isMut: true;
                    isSigner: false;
                    isOptional: false;
                },
                {
                    name: "pdaAccount";
                    isMut: true;
                    isSigner: false;
                    isOptional: false;
                },
                {
                    name: "associatedTokenProgram";
                    isMut: false;
                    isSigner: false;
                    isOptional: false;
                },
                {
                    name: "systemProgram";
                    isMut: false;
                    isSigner: false;
                    isOptional: false;
                },
                {
                    name: "tokenProgram";
                    isMut: false;
                    isSigner: false;
                    isOptional: false;
                }
            ];
            args: [];
        },
        {
            name: "transferNft";
            accounts: [
                {
                    name: "from";
                    isMut: true;
                    isSigner: false;
                    isOptional: false;
                },
                {
                    name: "to";
                    isMut: true;
                    isSigner: false;
                    isOptional: false;
                },
                {
                    name: "owner";
                    isMut: false;
                    isSigner: true;
                    isOptional: false;
                },
                {
                    name: "tokenProgram";
                    isMut: false;
                    isSigner: false;
                    isOptional: false;
                },
                {
                    name: "systemProgram";
                    isMut: false;
                    isSigner: false;
                    isOptional: false;
                }
            ];
            args: [];
        }
    ];
    metadata: {
        address: "8QjnMJzRhYLe7JFgZveW7HGTtRy97FMbdZSNwsNwnVfC";
    };
};

export const IDL: PdaMintAuthority = {
    version: "0.0.1",
    name: "pda_mint_authority",
    instructions: [
        {
            name: "new",
            accounts: [
                {
                    name: "dataAccount",
                    isMut: true,
                    isSigner: false,
                    isOptional: false,
                },
                {
                    name: "payer",
                    isMut: true,
                    isSigner: true,
                    isOptional: false,
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false,
                    isOptional: false,
                },
            ],
            args: [
                {
                    name: "bump",
                    type: {
                        array: ["u8", 1],
                    },
                },
            ],
        },
        {
            name: "createTokenMint",
            accounts: [
                {
                    name: "payer",
                    isMut: true,
                    isSigner: true,
                    isOptional: false,
                },
                {
                    name: "mint",
                    isMut: true,
                    isSigner: true,
                    isOptional: false,
                },
                {
                    name: "metadata",
                    isMut: true,
                    isSigner: false,
                    isOptional: false,
                },
                {
                    name: "mintAuthority",
                    isMut: false,
                    isSigner: false,
                    isOptional: false,
                },
                {
                    name: "rentAddress",
                    isMut: false,
                    isSigner: false,
                    isOptional: false,
                },
                {
                    name: "metaplexId",
                    isMut: false,
                    isSigner: false,
                    isOptional: false,
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false,
                    isOptional: false,
                },
                {
                    name: "tokenProgram",
                    isMut: false,
                    isSigner: false,
                    isOptional: false,
                },
            ],
            args: [
                {
                    name: "freezeauthority",
                    type: "publicKey",
                },
                {
                    name: "decimals",
                    type: "u8",
                },
                {
                    name: "name",
                    type: "string",
                },
                {
                    name: "symbol",
                    type: "string",
                },
                {
                    name: "uri",
                    type: "string",
                },
            ],
        },
        {
            name: "mintTo",
            accounts: [
                {
                    name: "payer",
                    isMut: true,
                    isSigner: true,
                    isOptional: false,
                },
                {
                    name: "tokenAccount",
                    isMut: true,
                    isSigner: false,
                    isOptional: false,
                },
                {
                    name: "owner",
                    isMut: false,
                    isSigner: false,
                    isOptional: false,
                },
                {
                    name: "mint",
                    isMut: true,
                    isSigner: false,
                    isOptional: false,
                },
                {
                    name: "pdaAccount",
                    isMut: true,
                    isSigner: false,
                    isOptional: false,
                },
                {
                    name: "associatedTokenProgram",
                    isMut: false,
                    isSigner: false,
                    isOptional: false,
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false,
                    isOptional: false,
                },
                {
                    name: "tokenProgram",
                    isMut: false,
                    isSigner: false,
                    isOptional: false,
                },
            ],
            args: [],
        },
        {
            name: "transferNft",
            accounts: [
                {
                    name: "from",
                    isMut: true,
                    isSigner: false,
                    isOptional: false,
                },
                {
                    name: "to",
                    isMut: true,
                    isSigner: false,
                    isOptional: false,
                },
                {
                    name: "owner",
                    isMut: false,
                    isSigner: true,
                    isOptional: false,
                },
                {
                    name: "tokenProgram",
                    isMut: false,
                    isSigner: false,
                    isOptional: false,
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false,
                    isOptional: false,
                },
            ],
            args: [],
        },
    ],
    metadata: {
        address: "8QjnMJzRhYLe7JFgZveW7HGTtRy97FMbdZSNwsNwnVfC",
    },
};
