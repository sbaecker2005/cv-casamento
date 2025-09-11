// Gera payload BR Code PIX estático (EMVCo/Bacen)
function crc16(payload: string): string {
  let crc = 0xFFFF;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) crc = (crc << 1) ^ 0x1021;
      else crc <<= 1;
      crc &= 0xFFFF;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

export function gerarPayloadPix({
  chave,
  nome,
  cidade,
  valor,
  mensagem
}: {
  chave: string;
  nome: string;
  cidade: string;
  valor?: number;
  mensagem?: string;
}): string {
  // IDs EMVCo
  const gui = "BR.GOV.BCB.PIX";
  const payload = [
    "000201", // Payload format indicator
    "26" + (gui.length + 4).toString().padStart(2, "0") + "0014" + gui + "01" + chave.length.toString().padStart(2, "0") + chave,
    "52040000", // Merchant category code
    "5303986", // Currency (BRL)
    valor ? "54" + valor.toFixed(2).replace(".", "").padStart(6, "0") : "",
    "5802BR", // Country code
    "59" + nome.length.toString().padStart(2, "0") + nome,
    "60" + cidade.length.toString().padStart(2, "0") + cidade,
    mensagem ? "62" + (4 + mensagem.length).toString().padStart(2, "0") + "0503" + mensagem : "",
    "6304" // CRC16
  ].filter(Boolean).join("");
  const crc = crc16(payload);
  return payload + crc;
}
