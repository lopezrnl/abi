/* eslint-env node */
import { handleUpload } from '@vercel/blob/client';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(request, response) {
  // 1. Setup CORS Headers
  response.setHeader('Access-Control-Allow-Credentials', 'true');
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT');
  response.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  // 2. Handle Preflight Request
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  // 3. Only allow POST/PUT
  if (request.method !== 'POST' && request.method !== 'PUT') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const jsonResponse = await handleUpload({
      body: request,
      request,
      // Removed unused 'pathname' and 'clientPayload' to satisfy ESLint
      onBeforeGenerateToken: async () => {
        // 'process' is now recognized due to 'eslint-env node' at top
        if (!process.env.BLOB_READ_WRITE_TOKEN) {
          throw new Error('BLOB_READ_WRITE_TOKEN is not configured');
        }

        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/jpg'],
          tokenPayload: JSON.stringify({
            userId: 'abigail-diary',
            uploadedAt: new Date().toISOString(),
          }),
        };
      },
      // Destructured only 'blob' since 'tokenPayload' was unused
      onUploadCompleted: async ({ blob }) => {
        console.log('✅ Upload completed:', blob.url);
      },
    });

    return response.status(200).json(jsonResponse);
  } catch (error) {
    console.error('❌ Upload error:', error);
    return response.status(400).json({ 
      error: error.message,
      details: error.toString(),
      stack: error.stack
    });
  }
}