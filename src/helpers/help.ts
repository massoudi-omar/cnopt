export const bufferToBase64 = (buffer: number[]) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

export const getYear = (date?: string) => {
  if (!date) return "";
  return new Date(date).getFullYear().toString();
};

export function formatDateFR(dateString: any) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");

  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre"
  ];

  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}