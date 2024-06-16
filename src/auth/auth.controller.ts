import { Body, Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './dto';
import { GetUser } from 'src/share/decorators';
import { JwtGuard } from './gauad/myjwt.guard';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterDTO) {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() body: LoginDTO) {
    return this.authService.login(body);
  }

  @UseGuards(JwtGuard)
  @Get('me')
  async getMe(@GetUser() userId: number) {
    return { data: await this.authService.getMe(userId) };
  }
}
