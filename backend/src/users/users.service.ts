import { Injectable } from '@nestjs/common';
import { Prisma, User } from "@prisma/client";
import { from, Observable } from "rxjs";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {
  }

  findUser(where: Prisma.UserWhereUniqueInput): Observable<User> {
    return from(this.prisma.user.findUnique({ where }));
  }
}
