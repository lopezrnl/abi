import { handleUpload } from '@vercel/blob/client';

export default async function handler(request, response) {
  const body = await request.json();
  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (_pathname) => {
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif'],
          tokenPayload: JSON.stringify({ /* optional user ID */ }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload: _tokenPayload }) => {
        console.log('Upload completed:', blob.url);
      },
    });
    return response.status(200).json(jsonResponse);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
}