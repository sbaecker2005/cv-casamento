export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  return new Response(
    JSON.stringify({
      ok: true,
      node: process.version,
      env: {
        MONGODB_URI: Boolean(process.env.MONGODB_URI),
        MONGODB_DB: process.env.MONGODB_DB || 'wedding',
        ADMIN_TOKEN: Boolean(process.env.ADMIN_TOKEN),
      },
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );
}
