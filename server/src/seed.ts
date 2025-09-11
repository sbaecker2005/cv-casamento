import * as rsvpRepo from './lib/rsvpRepo';

const samples = [
  { name: 'Ana Silva', email: 'ana@example.com', phone: '11999990000', attending: true, companions: 2, restrictions: 'Vegetariana' },
  { name: 'Bruno Lima', email: 'bruno@example.com', phone: '21988887777', attending: false, companions: 0, restrictions: '' },
  { name: 'Carla Souza', email: 'carla@example.com', phone: '31977776666', attending: true, companions: 1, restrictions: '' },
];

for (const s of samples) {
  try { rsvpRepo.insertRsvp(s); } catch {
    /* ignore duplicates */
  }
}

console.log('Seed concluído');
process.exit(0);
