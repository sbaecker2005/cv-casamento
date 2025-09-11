// Envia um RSVP de exemplo usando fetch nativo (Node 18+)
const url = 'http://localhost:3001/api/rsvp';

async function main() {
  const payload = {
    name: 'Teste ' + new Date().toISOString().slice(11,19),
    email: 'teste+' + Date.now() + '@example.com',
    attending: true,
    companions: 1
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const json = await res.json();
  console.log('Status:', res.status, '\nResposta:', json);
}

main().catch(e => { console.error(e); process.exit(1); });
