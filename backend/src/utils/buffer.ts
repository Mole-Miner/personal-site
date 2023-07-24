export function bufferToBase64Url(buffer: Buffer): Promise<string> {
  return Promise.resolve(buffer.toString('base64url'));
}
