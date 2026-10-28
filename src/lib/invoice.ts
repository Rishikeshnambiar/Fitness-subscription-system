/**
 * Generate a standardized invoice number: INV-YYYYMM-XXXX
 * where XXXX is a 4-digit random string/counter.
 */
export function generateInvoiceNumber(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `INV-${year}${month}-${randomSuffix}`;
}
