export function generateUPIQRCode(payeeName: string, upiId: string, amount: number): string {
  // Format according to UPI specification
  const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR`;
  
  // Use a QR code service (you can replace this with any QR code service)
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUrl)}`;
}