'use client';

import { initiateZkLogin } from '@/lib/zklogin';
import { useSuiClient } from '@mysten/dapp-kit';
import { FcGoogle } from 'react-icons/fc';

export function LoginButton() {
    const suiClient = useSuiClient();
    const handleLogin = () => {
        initiateZkLogin(suiClient);
    }
  return (
    <button
        onClick={handleLogin}
        className="bg-blue-100 text-blue-800 px-4 py-2 rounded hover:bg-blue-200 flex items-center justify-center gap-2"
    >
        <FcGoogle className="text-xl" />
        Login with Google
    </button>
  );
}
