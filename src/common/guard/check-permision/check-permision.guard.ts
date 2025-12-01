import {
  ExecutionContext,
  UnauthorizedException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_CHECK_PERMISSION_KEY } from 'src/common/decorators/check-permission.decorator';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';

export class CheckPermissionGuard extends AuthGuard('check-permission') {
  constructor(public reflector: Reflector) {
    super();
  }
  // 1 chạy đầu tiên để bật on/off
  canActivate(context: ExecutionContext) {
    // isPublic là on/off của protect
    // mà checkperrmission phụ thuộc vào protect, phải có protect thì check-permission mới chạy
    // cho nên cũng phải để kiểm tra on/off của protect: isPublic
    console.log(`canActivate`);
    // --- PROTECT ---------------------------
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic === true) {
      return true;
    }
    // --- PROTECT ---------------------------

    // --- CHECKPERMISSION ---------------------------
    const skipPermission = this.reflector.getAllAndOverride(
      IS_CHECK_PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );
    console.log({ skipPermission });
    if (skipPermission) {
      return true;
    }

    return super.canActivate(context);
  }

  //   4. thành công hay thất bại thì sẽ luôn luôn chạy cuối cùng
  handleRequest(err, user, info) {
    console.log(`handleRequest`, { err, user, info });
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
