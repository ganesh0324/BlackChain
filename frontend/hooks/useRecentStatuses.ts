'use client';

import { useEffect, useState } from 'react';
import { useSuiClient } from '@mysten/dapp-kit';
import type { Status } from '@/lib/types';

interface StatusPostEventData {
    content: number[];
}

function isStatusPostEventData(data: unknown): data is StatusPostEventData {
    return (
        typeof data === 'object' &&
        data != null &&
        'content' in data &&
        Array.isArray((data as any).content)
    )
}

export function useRecentStatuses(packageId: string) {
    const client = useSuiClient();
    const [statuses, setStatuses] = useState<Status[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStatuses() {
            setLoading(true);
            const events = await client.queryEvents({
                query: {
                    MoveEventType: `${packageId}::black_contract::StatusPostEvent`,
                },
                limit: 50,
            });

            const newStatuses: Status[] = events.data.map((e) => {
                const json = e.parsedJson;

                const getTimestamp = () => {
                    if (e.timestampMs && typeof e.timestampMs === 'string') {
                        const parsed = parseInt(e.timestampMs, 10);
                        return isNaN(parsed) ? Date.now() : parsed;
                    }
                    return Date.now();
                };

                if (!isStatusPostEventData(json)) {
                    console.warn('Unexpected event data structure:', json);
                    return {
                        id: e.id.eventSeq || `${e.id.txDigest}-${e.id.eventSeq}`,
                        emoji: '❓', // fallback emoji
                        userAddress: e.sender,
                        timestamp: new Date(getTimestamp()).toISOString(),
                    };
                }
                const emoji = new TextDecoder().decode(Uint8Array.from(json.content));
                return {
                    id: e.id.eventSeq || `${e.id.txDigest}-${e.id.eventSeq}`,
                    emoji,
                    userAddress: e.sender,
                    timestamp: new Date(getTimestamp()).toISOString(),
                };
            });

            setStatuses(newStatuses);
            setLoading(false);
        }

        fetchStatuses();
    }, [packageId, client]);

    return { statuses, loading };
}
