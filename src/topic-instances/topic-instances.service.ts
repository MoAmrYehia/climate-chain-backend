import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { getOrderByCriteria } from 'src/misc/filtering';
import { Page } from '../misc/page';
import { PrismaService } from '../prisma';
import { CreateTopicInstanceDto } from './dto/create-topic-instance.dto';
import { FilterTopicInstancesDto } from './dto/filter-topic-instances.dto';
import { UpdateTopicInstanceDto } from './dto/update-topic-instance.dto';
import { TopicInstance } from './entities/topic-instance.entity';

@Injectable()
export class TopicInstancesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filterTopicInstancesDto: FilterTopicInstancesDto): Promise<Page<TopicInstance>> {
    const { orderBy, title, value, unit, difference, year, ...rest } = filterTopicInstancesDto;

    const where: Prisma.TopicInstanceWhereInput = {
      AND: [
        { title: { contains: title, mode: 'insensitive' } },
        { value: { equals: value } },
        { unit: { contains: unit, mode: 'insensitive' } },
        { difference: { equals: difference } },
        { year: { equals: year } }
      ]
    };

    const page = await findManyCursorConnection(
      args =>
        this.prisma.topicInstance.findMany({
          ...args,
          where,
          orderBy: getOrderByCriteria<Prisma.TopicInstanceOrderByWithRelationInput>(orderBy)
        }),
      () => this.prisma.topicInstance.count({ where }),
      rest,
      {
        recordToEdge: record => ({ node: record })
      }
    );

    // https://github.com/devoxa/prisma-relay-cursor-connection/pull/432
    delete page.nodes;

    return new Page<TopicInstance>(page);
  }

  async findOne(id: string): Promise<TopicInstance> {
    return this.prisma.topicInstance.findUnique({ where: { id } });
  }

  async create(topicId: string, createTopicInstanceDto: CreateTopicInstanceDto): Promise<TopicInstance> {
    return this.prisma.topicInstance.create({
      data: { ...createTopicInstanceDto, topic: { connect: { id: topicId } } }
    });
  }

  async update(id: string, updateTopicInstanceDto: UpdateTopicInstanceDto): Promise<TopicInstance> {
    return this.prisma.topicInstance.update({ where: { id: id }, data: updateTopicInstanceDto });
  }

  async remove(id: string): Promise<TopicInstance> {
    return this.prisma.topicInstance.delete({ where: { id } });
  }
}
