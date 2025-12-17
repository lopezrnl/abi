import { handleUpload } from '@vercel/blob/client';

export default async function handler(request, response) {
  const body = await request.json();

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      // Prefix 'pathname' with underscore to ignore unused variable warning
      onBeforeGenerateToken: async (_pathname) => {
        // Here you can verify if the user is authorized
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif'],
          tokenPayload: JSON.stringify({
            /* optional data */
          }),
        };
      },
      // Prefix 'tokenPayload' with underscore
      onUploadCompleted: async ({ blob, tokenPayload: _tokenPayload }) => {
        // This runs on the server after the upload succeeds
        console.log('Upload completed:', blob.url);
      },
    });

    return response.status(200).json(jsonResponse);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
}