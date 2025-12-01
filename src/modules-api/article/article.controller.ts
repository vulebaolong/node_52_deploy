import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { QueryDto } from './dto/query.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { SkipPermission } from 'src/common/decorators/check-permission.decorator';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  // @UseGuards(ProtectGuard)
  @SkipPermission()
  @ResponseMessage("Get list article successs")
  @Get()
  findAll(@Query() queryDto: QueryDto, @Req() req: any) {
    console.log(req.user);
    return this.articleService.findAll(queryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
}
