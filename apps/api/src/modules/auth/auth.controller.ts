import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { AuthService } from './auth.service';
import { Role } from 'src/common/enums/rol.enum';
import { Auth } from 'src/decorators/auth.decorator';
import { RegisterDto, LoginDto, UpdateProfileDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body()
    registerDto: RegisterDto,
  ) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(
    @Body()
    loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @Auth(Role.USER)
  profile(@ActiveUser() user: UserActiveInterface) {
    console.log(user)
    return this.authService.profile(user);
  }

  @Put('update-profile')
  @Auth(Role.USER)
  updateProfile(
    @ActiveUser() user: UserActiveInterface,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.authService.updateProfile(user.id, updateProfileDto);
  }
}
