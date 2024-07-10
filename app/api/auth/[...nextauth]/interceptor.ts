/**
 * Interceptors are required for those providers
 * of which response does not strictly follow the OAuth2 spec
 */
const createInterceptor = (
  modifier: (body: Record<string, any>) => Record<string, any>
) => {
  return (originalFetch: typeof fetch) =>
    async (
      url: Parameters<typeof fetch>[0],
      options: Parameters<typeof fetch>[1] = {}
    ) => {
      if (options.method !== 'POST') {
        return originalFetch(url, options);
      }

      const response = await originalFetch(url, options);

      /* Clone the response to be able to modify it */
      const clonedResponse = response.clone();
      const body = await clonedResponse.json();

      const modifiedBody = modifier(body);

      /*  Create a new response with the modified body */
      const modifiedResponse = new Response(JSON.stringify(modifiedBody), {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      });

      /* Add the original url to the response */
      return Object.defineProperty(modifiedResponse, 'url', {
        value: response.url,
      });
    };
};

export const naverFetchInterceptor = createInterceptor((body) => {
  return {
    ...body,
    expires_in: Number(body.expires_in),
  };
});
