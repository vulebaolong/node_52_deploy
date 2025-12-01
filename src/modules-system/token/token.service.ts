import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from 'src/common/constant/app.constant';

@Injectable()
export class TokenService {
  createTokens(userId: number) {
    // hạn sử dụng của access token
    // cần được giảm xuống đáng kể, để giảm thiểu rủi ro khi người dùng bị lộ token
    // thời gian hết hạn tồn tại bao nhiêu thì người dùng rủi ro bấy nhiêu (nếu bị lộ)
    const accessToken = jwt.sign(
      { userId: userId },
      ACCESS_TOKEN_SECRET as string,
      { expiresIn: '1d' },
    );

    // hạn sử dụng của refresh token
    // sẽ để cao hơn thời gian hết hạn của access,
    // Trả về CẶP token mới: thời gian hết hạn là thời gian nếu như người dùng không đăng nhập thì sẽ cần phải đăng nhập lại
    // Chỉ Trả accessToken mới: thời gian hết hạn là thời gian bắt buộc người dùng sẽ cần phải đăng nhập lại
    const refreshToken = jwt.sign(
      { userId: userId },
      REFRESH_TOKEN_SECRET as string,
      { expiresIn: '7d' },
    );

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  verifyAccessToken(accessToken: string, option?: jwt.VerifyOptions) {
    const decodeAccessToken = jwt.verify(
      accessToken,
      ACCESS_TOKEN_SECRET as string,
      option,
    );
    return decodeAccessToken;
  }

  verifyRefreshToken(refreshToken: string) {
    const decodeRefreshToken = jwt.verify(
      refreshToken,
      REFRESH_TOKEN_SECRET as string,
    );
    return decodeRefreshToken;
  }
}
