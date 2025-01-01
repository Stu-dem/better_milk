import { NextRequest } from "next/server";
import { getUserCredentials } from "@/lib/auth/getUserCredentials";

import { getTokenExpiry } from "./getTokenExpiry";
import saveUserTokens from "./saveUserTokens";

const BACKEND_URL = process.env.BACKEND_URL;
const ACCESS_TOKEN_LIFETIME = Number(process.env.ACCESS_TOKEN_LIFETIME) || 3600;

export default async function fetchWithCredentials(
    path: string,
    init: RequestInit | undefined,
    req: NextRequest
) {
    const userCredentials = getUserCredentials();
    
    if (!userCredentials) {
        return {
            message: "No user credentials found",
            status: 401,
        }
    }

    const requestToFetch = makeFetch(
        path,
        userCredentials.access,
        init
    )

    const tokenExpires = new Date(userCredentials.accessTokenExpires);

    if (tokenExpires.getTime() - (Date.now() + ACCESS_TOKEN_LIFETIME*1000) < 0) {
        const newAccessToken = await refresh(userCredentials.refresh);

        if ("access" in newAccessToken) {
            const newTokens = {
                access: newAccessToken.access,
                refresh: userCredentials.refresh,
                accessExpires: getTokenExpiry("access"),
                refreshExpires: getTokenExpiry("refresh"),
            }
            saveUserTokens(newTokens);

            return await requestToFetch(newAccessToken.access);
        }
        return newAccessToken;
    }

    return await requestToFetch();

}



function makeFetch(
    path: string,
    accessToken: string,
    init: RequestInit | undefined
): (newAccessToken?: string) => Promise<any> {
    return async function (newAccessToken?: string) {
        return fetch(`${BACKEND_URL}${path}`, {
            ...init,
            headers: {
                Authorization: `Bearer ${newAccessToken ?? accessToken}`,
            },
            ...init,
        }).then((res) => res.json());
    }
}


async function refresh(rt: string) {
    return new Promise<any>((resolve) => {
      // Make a POST request to the token refresh endpoint
      fetch(BACKEND_URL + "/auth/refresh", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${rt}`,
        },
      })
        .then((res) => res.json())
        .then((json) => resolve(json));
    });
  }