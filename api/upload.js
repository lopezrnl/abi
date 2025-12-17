/* eslint-env node */
import { handleUpload } from '@vercel/blob/client';

export const config = {
  api: {
    // CHANGE: Set this to true (or remove it, as it's true by default)
    bodyParser: true, 
  },
};

export default async function handler(request, response) {
  // 1. Setup CORS Headers
  response.setHeader('Access-Control-Allow-Credentials', 'true');
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT');
  response.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (request.method === 'OPTIONS') return response.status(200).end();

  try {
    const jsonResponse = await handleUpload({
      body: request.body, // CHANGE: Pass request.body instead of request
      request,
      onBeforeGenerateToken: async () => {
        if (!process.env.BLOB_READ_WRITE_TOKEN) {
          throw new Error('BLOB_READ_WRITE_TOKEN is not configured');
        }
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/jpg'],
          tokenPayload: JSON.stringify({ userId: 'abigail-diary' }),
        };
      },
      onUploadCompleted: async ({ blob }) => {
        console.log('✅ Upload completed:', blob.url);
      },
    });

    return response.status(200).json(jsonResponse);
  } catch (error) {
    console.error('❌ Upload error:', error);
    return response.status(400).json({ error: error.message });
  }
}
