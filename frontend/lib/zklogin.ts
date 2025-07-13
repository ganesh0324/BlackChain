import { jwtToAddress, generateNonce, generateRandomness } from '@mysten/sui/zklogin';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { useSuiClient } from '@mysten/dapp-kit';
import { jwtDecode } from 'jwt-decode'
import { SuiClient } from '@mysten/sui/client';
// import { SUI_PROVER_URL } from './constants'; // You'll define this

export async function initiateZkLogin(suiClient : SuiClient) {
    const ephemeralKey = new Ed25519Keypair();
    const { epoch } = await suiClient.getLatestSuiSystemState();
    const randomness = generateRandomness();
    const maxEpoch = Number(epoch) + 10;
    const nonce = await generateNonce(ephemeralKey.getPublicKey(), maxEpoch, randomness);

    sessionStorage.setItem('ephemeralKey', ephemeralKey.getSecretKey());
    sessionStorage.setItem('nonce', nonce);
    sessionStorage.setItem('randomness', randomness);
    sessionStorage.setItem('maxEpoch', maxEpoch.toString());
    
    const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if(googleClientId) {
        console.log("Google Client ID: ", googleClientId);
    } else {
        throw new Error('Can\'t get NEXT_PUBLIC_GOOGLE_CLIENT_ID');
    }

    const redirectUri = encodeURIComponent('http://localhost:3000/redirect'); // Change for prod
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=id_token&scope=openid&nonce=${nonce}`;

    window.location.href = url;
}

export async function completeZkLogin(idToken: string) {
    const decoded: any = jwtDecode(idToken);
    const sub = decoded.sub;
    const aud = decoded.aud;

    if (!sub || !aud) throw new Error("Invalid JWT: missing 'sub' or 'aud'");

    // Restore from sessionStorage
    const ephemeralKeyStr = sessionStorage.getItem('ephemeralKey')!;
    const randomness = sessionStorage.getItem('randomness')!;
    const maxEpoch = Number(sessionStorage.getItem('maxEpoch')!);

    const ephemeralKey = Ed25519Keypair.fromSecretKey(ephemeralKeyStr);

    const ephemeralPublicKey = ephemeralKey.getPublicKey();

    // Call the default Mysten zkLogin prover
    const zkProofResponse = await fetch("https://prover.mystenlabs.com/v1", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            jwt: idToken,
            maxEpoch,
            randomness,
            extendedEphemeralPublicKey: ephemeralPublicKey.toBase64(),
            salt: sub,
            aud
        }),
    });

    const { proof } = await zkProofResponse.json();

    const zkLoginSignature = {
        signature: {
            inputs: {
                ...proof,
                addressSeed: sub,
                maxEpoch,
                userSignature: await ephemeralKey.sign(Buffer.from(sub)),
            },
            signatureScheme: 'ZkLogin',
        },
        signatureScheme: 'ZkLogin',
    };

    sessionStorage.setItem('zkLoginSignature', JSON.stringify(zkLoginSignature));

    const zkAddress = jwtToAddress(idToken, randomness);

    return {
        zkLoginSignature,
        ephemeralKey,
        address: zkAddress,
    };
}