export function timeSince(date) {
  const postDate = new Date(date);
  const now = new Date();
  const secondsPast = (now - postDate) / 1000;

  if (secondsPast < 60) {
    return `${Math.round(secondsPast)} seconds ago`;
  }
  if (secondsPast < 3600) {
    return `${Math.round(secondsPast / 60)} minutes ago`;
  }
  if (secondsPast <= 86400) {
    return `${Math.round(secondsPast / 3600)} hours ago`;
  }
  if (secondsPast <= 172800) {
    return "yesterday";
  }

  const days = Math.round(secondsPast / 86400);
  return `${days} zile in urma`;
}
