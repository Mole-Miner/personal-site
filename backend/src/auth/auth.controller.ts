import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  refresh() {
    return this.authService.refresh(null);
  }

  @Post('logout')
  logout() {
    return this.authService.logout(null);
  }
}
