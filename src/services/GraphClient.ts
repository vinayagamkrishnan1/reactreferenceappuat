import "isomorphic-fetch";
// import { ClientSecretCredential } from "@azure/identity";
// import { Client } from "@microsoft/microsoft-graph-client";
// import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";
// import { BASE_URL, GRAPH_API } from "../utils/constants";

// const port = "<PORT_NUMBER>";
// const tenantId = "5b973f99-77df-4beb-b27d-aa0c70b8482c";
// const clientId = "d17a6484-950a-4969-8b54-b7bc8c0c9c7a";
// const clientSecret = "<CLIENT_SECRET>";
// const scopes = ["User.Read"];
// const redirectUri = `http://localhost:${port}/authresponse`;
// const authorityHost = "https://login.microsoftonline.com";

// export const initSDK = async () => {
// 	const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
// 	const authProvider = new TokenCredentialAuthenticationProvider(credential, { scopes: scopes });
// 	const client = Client.initWithMiddleware({
// 		debugLogging: true,
// 		authProvider,
// 	});
// 	const res = await client.api(BASE_URL + GRAPH_API).get();
// 	console.log(".........................................", res);
//     return res;
// }