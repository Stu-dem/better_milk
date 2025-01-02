import { getTokens } from "./manageTokensClient";
import { refreshTokens } from "./refreshToken";
import { checkTokens } from "./checkTokens";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function fetchWithCredentials(
  path: string,
  init: RequestInit | undefined,
) {
  let userCredentials = await getTokens();
  let authSummary = await checkTokens(userCredentials);

  // Check if tokens need to be updated
  if (authSummary.updateTokens) {
    await refreshTokens(userCredentials);
    userCredentials = await getTokens();
    authSummary = await checkTokens(userCredentials);
  }

  console.log({authSummary})
  console.log({userCredentials})

  // Check if user is logged in and tokens are present
  if (!authSummary.loggedIn || !userCredentials) {
    console.log("Authentication failed for this request...")
    return {
      message: "No user credentials found",
      status: 401,
    };
  }

  const url = `${BACKEND_URL}${path}`;
  console.log(BACKEND_URL)
  console.log({url})

  // Attempt to fetch data with current access token
  const requestToFetch = makeFetch(url, userCredentials.access, init);
  return await requestToFetch();

}

function makeFetch(
  path: string,
  accessToken: string,
  init: RequestInit | undefined
): () => Promise<any> {
  return async function () {
    return fetch(
      path,
      {
      ...init,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      ...init,
    }).then((res) => res.json());
  };
}
