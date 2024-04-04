export function timeSince(date) {
  const postDate = new Date(date);
  const now = new Date();
  const secondsPast = (now - postDate) / 1000;

  if (secondsPast < 60) {
    return `${Math.round(secondsPast)} secunde in urma`;
  }
  if (secondsPast < 3600) {
    return `${Math.round(secondsPast / 60)} minute in urma`;
  }
  if (secondsPast <= 86400) {
    return `${Math.round(secondsPast / 3600)} ore in urma`;
  }
  if (secondsPast <= 172800) {
    return "ieri";
  }

  const days = Math.round(secondsPast / 86400);
  return `${days} zile in urma`;
}
