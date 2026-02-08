export function formatINR(n) {
  const num = Number(n || 0);
  return num.toLocaleString("en-IN");
}

export function splitLines(text) {
  return String(text || "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function calcRowTotal(rate, qty) {
  const r = Number(rate || 0);
  const q = Number(qty || 0);
  return r * q;
}

export function calcGrandTotal(items) {
  return items.reduce((sum, it) => sum + Number(it.total || 0), 0);
}

export function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}
