export function bufferToBase64Url(buffer: Buffer): string {
  return Buffer.from(buffer).toString('base64url');
}
