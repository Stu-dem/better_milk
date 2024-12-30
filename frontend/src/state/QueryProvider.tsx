"use client"

import {
    isServer,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                staleTime: 6*1000
            },
        },
    })
}

let browserQueryClient = QueryClient | undefined;
browserQueryClient = undefined;
function getQueryClient() {
    if (isServer) {
        return makeQueryClient();
    } else {
        if (!browserQueryClient) {
            browserQueryClient = makeQueryClient();
        }
    }
    return browserQueryClient;
}


export default function QueryProvider({
    children
}: {
    children: React.ReactNode
}) {

    const queryClient = getQueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}