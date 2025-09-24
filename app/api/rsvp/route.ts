import { getDb } from 'lib/mongodb';
import { RsvpSchema } from 'lib/schemas';

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = RsvpSchema.safeParse(json);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid payload', issues: parsed.error.issues }),
        { status: 400, headers: { 'content-type': 'application/json' } }
      );
    }
    const input = parsed.data;
    const db = await getDb();
    const now = new Date().toISOString();
    const doc = { ...input, created_at: now };
    await db.collection('rsvp').insertOne(doc);

    const message = input.attending
      ? 'Obrigado pela confirmação! Estamos felizes em contar com você.'
      : 'Obrigada(o) por avisar! Sentiremos sua falta.';
    return new Response(JSON.stringify({ success: true, message }), {
      status: 201,
      headers: { 'content-type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, message: 'Internal error' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}

export async function GET() {
  try {
    const db = await getDb();
    const items = await db
      .collection('rsvp')
      .find()
      .sort({ created_at: -1 })
      .toArray();
    return new Response(JSON.stringify({ success: true, data: items }), {
      headers: { 'content-type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, message: 'Internal error' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}
