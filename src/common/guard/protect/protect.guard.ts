import {
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';

export class ProtectGuard extends AuthGuard('protect') {
  constructor(public reflector: Reflector) {
    super();
  }
  // 1
  canActivate(context: ExecutionContext) {
    // hàm canActivate sẽ luôn luôn được chạy đầu tiên, để kiểm tra đầu vào xem api đó có muốn kiểm tra token hay không
    // nếu api đó được đánh dấu @Public thì chúng ta sẽ bỏ qua không kiểm tra token với api đó
    console.log(`canActivate`);
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // console.log({ isPublic });

    if (isPublic === true) {
      return true;
    }

    return super.canActivate(context);
  }

  //   4. thành công hay thất bại thì sẽ luôn luôn chạy cuối cùng
  handleRequest(err, user, info) {
    console.log(`handleRequest`, { err, user, info });
    // err: là các lỗi có trong hệ thống hoặc do mình tạo ra (exception: BadRequestException)
    // info: lỗi của thư viện  passport-jwt đang saif

    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      if (info instanceof TokenExpiredError) {
        // 403 để cho FE làm mới token
        throw new ForbiddenException(info.message);
      }
      if (info instanceof JsonWebTokenError) {
        // 401 để cho FE logout người dùng, vì token đang không hợp lệ, có dấu hiệu bất thường
        throw new UnauthorizedException(info.message);
      }
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
