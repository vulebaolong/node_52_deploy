import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { TokenService } from 'src/modules-system/token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokenService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, fullName } = registerDto;
    console.log({ email, password, fullName });

    const userExist = await this.prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (userExist) {
      throw new BadRequestException(
        'Người dùng đã tồn tại, vui lòng đăng nhập',
      );
    }

    // hash: băm (không thể dịch ngược)
    const hashPassword = bcrypt.hashSync(password, 10);

    const userNew = await this.prisma.users.create({
      data: {
        email: email,
        password: hashPassword,
        fullName: fullName,
      },
    });

    return true;
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const userExits = await this.prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (!userExits) {
      throw new BadRequestException(
        'Người dùng chưa tồn tại, vui lòng đăng ký',
      );
    }

    if (!userExits.password) {
      throw new BadRequestException(
        'Vui lòng đăng nhập bằng Google, để cập nhật mật khẩu trong setting',
      );
    }

    const isPassword = bcrypt.compareSync(password, userExits.password);
    if (!isPassword) {
      throw new BadRequestException('Mật khẩu chưa chính xác');
    }

    const tokens = this.tokenService.createTokens(userExits.id);

    // sendMail(email)
    // sendMail('vulebaolong@gmail.com', 'Cảnh báo đăng nhập');

    return tokens;
  }

  getInfo(req) {
    delete req.user.password;
    return req.user;
  }
}
