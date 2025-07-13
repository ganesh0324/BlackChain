'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { completeZkLogin } from '@/lib/zklogin';

export default function RedirectPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function handleZkLogin() {
            try {
                // Extract `id_token` from the URL fragment
                const hash = new URLSearchParams(window.location.hash.substring(1));
                const idToken = hash.get('id_token');
                if (!idToken) throw new Error('Missing id_token');

                const { zkLoginSignature, address, ephemeralKey } = await completeZkLogin(idToken);
                // Redirect to dashboard or emoji-posting page
                sessionStorage.setItem('zkLoginSignature', JSON.stringify(zkLoginSignature));
                sessionStorage.setItem('zkLoginAddress', address);
                sessionStorage.setItem('ephemeralKey', JSON.stringify(ephemeralKey.getSecretKey()));
                router.push('/');
            } catch (err: any) {
                console.error(err);
                setError(err.message || 'Unknown error');
            }
        }

        handleZkLogin();
    }, [router]);

    if (error) return <p>Error: {error}</p>;
    return <p>Authenticating via zkLogin...</p>;
}
