import { registerAs } from '@nestjs/config';

export const JwtConfig = registerAs('jwt', () => ({
  algorithm: process.env.JWT_ALGORITHM,
  access: process.env.JWT_SECRET,
  refresh: process.env.JWT_SECRET_REFRESH,
  accessExpires: process.env.JWT_SECRET_EXPIRES_IN,
  refreshExpires: process.env.JWT_SECRET_REFRESH_EXPIRES_IN,
}));
