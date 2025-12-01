import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { buildQuery } from 'src/common/helper/build-query.helper';
import { QueryDto } from './dto/query.dto';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';

@Injectable()
export class ArticleService {
  constructor(private readonly prisma: PrismaService) {}

  create(createArticleDto: CreateArticleDto) {
    return 'This action adds a new article';
  }

  async findAll(queryDto: QueryDto) {
    const { page, pageSize, filters, index } = buildQuery(queryDto);

    const articlesPromise = this.prisma.articles.findMany({
      // skip qua index bao nhiêu
      where: filters,
      skip: index,
      take: pageSize,
    });
    const totalItemPromise = this.prisma.articles.count({ where: filters });

    const [articles, totalItem] = await Promise.all([
      articlesPromise,
      totalItemPromise,
    ]);

    const totalPage = Math.ceil(totalItem / pageSize);

    return {
      page: page,
      pageSize: pageSize,
      totalItem: totalItem,
      totalPage: totalPage,
      items: articles || [],
      messageCustom: 'hello world',
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
