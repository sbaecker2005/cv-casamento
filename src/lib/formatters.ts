export function maskPhone(value: string): string {
  // Remove tudo que não é número
  value = value.replace(/\D/g, "");
  if (value.length > 11) value = value.slice(0, 11);
  if (value.length > 10)
    return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
  if (value.length > 6)
    return `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6, 10)}`;
  if (value.length > 2)
    return `(${value.slice(0, 2)}) ${value.slice(2, 6)}`;
  if (value.length > 0)
    return `(${value}`;
  return value;
}

export function formatDatePt(date: Date): string {
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}
