'use client';

import { useState } from 'react';
import { Transaction } from '@mysten/sui/transactions';
import { useSignAndExecuteTransaction, useSuiClient } from '@mysten/dapp-kit';
import { TESTNET_BLACKCHAIN_PACKAGE_ID } from '@/lib/networkConfig';

export function PostStatusButton({
  emoji,
  onPosted,
}: {
  emoji: string;
  onPosted: (digest: string) => void;
}) {
  const suiClient = useSuiClient();
  const blackPackageId = TESTNET_BLACKCHAIN_PACKAGE_ID;
  const [loading, setLoading] = useState(false);

  const { mutate: signAndExecute } = useSignAndExecuteTransaction();

  const handlePost = async () => {
    if (!emoji) return;

    setLoading(true);

    const tx = new Transaction();
    tx.moveCall({
      target: `${blackPackageId}::black_contract::post_status`,
      arguments: [
        tx.pure.string(emoji),
        tx.object('0x6'), // Global Clock object (for testnet)
      ],
    });

    signAndExecute(
      {
        transaction: tx,
      },
      {
        onSuccess: async ({ digest }) => {
          setLoading(false);
          onPosted(digest);
        },
        onError: (err) => {
          console.error('Failed to post status:', err);
          setLoading(false);
        },
      },
    );
  };

  return (
    <button
      onClick={handlePost}
      disabled={!emoji || loading}
      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? 'Posting...' : 'Post Status'}
    </button>
  );
}
