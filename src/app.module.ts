import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules-api/auth/auth.module';
import { PrismaModule } from './modules-system/prisma/prisma.module';
import { TokenModule } from './modules-system/token/token.module';
import { ArticleModule } from './modules-api/article/article.module';
import { ProtectStrategy } from './common/guard/protect/protect.strategy';
import { CheckPermissionStrategy } from './common/guard/check-permision/check-permission.strategy';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, PrismaModule, TokenModule, ArticleModule],
  controllers: [AppController],
  providers: [AppService, ProtectStrategy, CheckPermissionStrategy],
})
export class AppModule {}
