import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class ImageQuery {
  @IsNotEmpty()
  @IsString({ each: true })
  fields: string[];

  @IsNotEmpty()
  @IsString()
  @Matches(/\.(buffer|base64url)/gi)
  represent: 'buffer' | 'base64url';
}
