import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { getOrderByCriteria } from 'src/misc/filtering';
import { Page } from '../misc/page';
import { PrismaService } from '../prisma';
import { CreateTopicDto } from './dto/create-topic.dto';
import { FilterTopicsDto } from './dto/filter-topics.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Topic } from './entities/topic.entity';

@Injectable()
export class TopicsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filterTopicsDto: FilterTopicsDto): Promise<Page<Topic>> {
    const { orderBy, title, subTitle, contextImageUrl, graphImageUrl, body, affectedCantons, ...rest } =
      filterTopicsDto;

    const where: Prisma.TopicWhereInput = {
      AND: [
        { title: { contains: title, mode: 'insensitive' } },
        { subTitle: { contains: subTitle, mode: 'insensitive' } },
        { contextImageUrl: { contains: contextImageUrl, mode: 'insensitive' } },
        { graphImageUrl: { contains: graphImageUrl, mode: 'insensitive' } },
        { body: { contains: body, mode: 'insensitive' } },
        { affectedCantons: { hasSome: affectedCantons } }
      ]
    };

    const page = await findManyCursorConnection(
      args =>
        this.prisma.topic.findMany({
          ...args,
          where,
          orderBy: getOrderByCriteria<Prisma.TopicOrderByWithRelationInput>(orderBy)
        }),
      () => this.prisma.topic.count({ where }),
      rest,
      {
        recordToEdge: record => ({ node: record })
      }
    );

    // https://github.com/devoxa/prisma-relay-cursor-connection/pull/432
    delete page.nodes;

    return new Page<Topic>(page);
  }

  async findOne(id: string): Promise<Topic> {
    return this.prisma.topic.findUnique({ where: { id } });
  }

  async create(createTopicDto: CreateTopicDto): Promise<Topic> {
    return this.prisma.topic.create({ data: createTopicDto });
  }

  async update(id: string, updateTopicDto: UpdateTopicDto): Promise<Topic> {
    return this.prisma.topic.update({ where: { id: id }, data: updateTopicDto });
  }

  async remove(id: string): Promise<Topic> {
    return this.prisma.topic.delete({ where: { id } });
  }
}
