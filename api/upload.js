/* eslint-env node */
import { handleUpload, del } from '@vercel/blob/client';

export const config = {
  api: {
    bodyParser: false, // Required for handleUpload to work with large files
  },
};

// Helper function to read the body stream when bodyParser is disabled
async function getRawBody(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString('utf-8');
}

export default async function handler(request, response) {
  // 1. Setup CORS Headers
  response.setHeader('Access-Control-Allow-Credentials', 'true');
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT,DELETE');
  response.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (request.method === 'OPTIONS') return response.status(200).end();

  // Handle Image Deletion
  if (request.method === 'DELETE') {
    try {
      // Manually parse the body because bodyParser is false
      const rawBody = await getRawBody(request);
      const { url } = JSON.parse(rawBody);
      
      if (!url) {
        return response.status(400).json({ error: 'URL is required for deletion' });
      }

      await del(url);
      return response.status(200).json({ success: true });
    } catch (error) {
      console.error('❌ Delete error:', error);
      return response.status(500).json({ error: error.message });
    }
  }

  // Handle Upload
  try {
    const jsonResponse = await handleUpload({
      body: request.body, // handleUpload knows how to handle the stream
      request,
      onBeforeGenerateToken: async () => {
        if (!process.env.BLOB_READ_WRITE_TOKEN) {
          throw new Error('BLOB_READ_WRITE_TOKEN is not configured');
        }
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/jpg'],
          addRandomSuffix: true, 
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