export default async function handler(_req: any, res: any) {
  try {
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).send(
      JSON.stringify({
        ok: true,
        node: process.version,
        env: {
          MONGODB_URI: Boolean(process.env.MONGODB_URI),
          MONGODB_DB: process.env.MONGODB_DB || 'wedding',
          ADMIN_TOKEN: Boolean(process.env.ADMIN_TOKEN),
        },
      })
    );
  } catch (err: any) {
    // Should never happen, but keep consistent error shape
    console.error('[API ERROR] health/GET:', err);
    return res.status(500).json({ ok: false, message: err?.message || 'Internal error' });
  }
}
