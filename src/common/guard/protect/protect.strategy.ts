import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ACCESS_TOKEN_SECRET } from 'src/common/constant/app.constant';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';

@Injectable()
export class ProtectStrategy extends PassportStrategy(Strategy, 'protect') {
  // 2: kiểm tra token
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ACCESS_TOKEN_SECRET as string,
    });
  }

  // 3. chỉ chạy khi kiểm tra token thành công
  async validate(decode: any) {
    console.log('validate', decode);
    if (!decode?.userId) {
      throw new UnauthorizedException('Token invalid Build');
    }

    const userExist = await this.prisma.users.findUnique({
      where: {
        id: decode.userId,
      },
    });
    if (!userExist) {
      throw new UnauthorizedException('Người dùng không hợp lệ');
    }

    return userExist
  }
}
