import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiGatewayTimeoutResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { ApiPageResponse, Page } from 'src/misc/page';
import { CreateTopicInstanceDto } from './dto/create-topic-instance.dto';
import { FilterTopicInstancesDto } from './dto/filter-topic-instances.dto';
import { UpdateTopicInstanceDto } from './dto/update-topic-instance.dto';
import { TopicInstance } from './entities/topic-instance.entity';
import { TopicInstancesService } from './topic-instances.service';

@ApiTags('Topic Instances')
@Controller({ version: '1' })
export class TopicInstancesController {
  constructor(private readonly topicInstancesService: TopicInstancesService) {}

  @Post('topics/:topicId/instances')
  // @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: `Create a new ${TopicInstance.name}` })
  @ApiCreatedResponse({ description: `The ${TopicInstance.name} got created successfully`, type: TopicInstance })
  @ApiBadRequestResponse({ description: 'Invalid input was provided.' })
  @ApiInternalServerErrorResponse({
    description: `An unknown error occured during creation of the ${TopicInstance.name}.`
  })
  async create(
    @Param('topicId') topicId: string,
    @Body() createTopicInstanceDto: CreateTopicInstanceDto
  ): Promise<TopicInstance> {
    return this.topicInstancesService.create(topicId, createTopicInstanceDto);
  }

  @Get('instances')
  // @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: `Filter all ${TopicInstance.name}s` })
  @ApiPageResponse(TopicInstance)
  @ApiInternalServerErrorResponse({ description: 'Unknown error occured during the search.' })
  async findAll(@Query() filterTopicInstancesDto: FilterTopicInstancesDto): Promise<Page<TopicInstance>> {
    return this.topicInstancesService.findAll(filterTopicInstancesDto);
  }

  @Get('instances/:id')
  // @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: `Get a specific ${TopicInstance.name}` })
  @ApiOkResponse({ description: `${TopicInstance.name} found`, type: TopicInstance })
  @ApiNotFoundResponse({ description: `${TopicInstance.name} not found` })
  @ApiInternalServerErrorResponse({ description: 'Unknown error occured during the search.' })
  async findOne(@Param('id') id: string): Promise<TopicInstance> {
    return this.topicInstancesService.findOne(id);
  }

  @Patch('instances/:id')
  // @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: `Update an existing ${TopicInstance.name}` })
  @ApiOkResponse({ description: `The ${TopicInstance.name} got updated successfully`, type: TopicInstance })
  @ApiNotFoundResponse({ description: 'Resource was not found.' })
  @ApiInternalServerErrorResponse({ description: 'An unknown error occured.' })
  @ApiGatewayTimeoutResponse({ description: 'Microservice failed to answer' })
  async update(
    @Param('id') id: string,
    @Body() updateTopicInstanceDto: UpdateTopicInstanceDto
  ): Promise<TopicInstance> {
    return this.topicInstancesService.update(id, updateTopicInstanceDto);
  }

  @Delete('instances/:id')
  // @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: `Delete an ${TopicInstance.name}` })
  @ApiGatewayTimeoutResponse({ description: 'Microservice failed to answer' })
  @ApiOkResponse({ description: 'The app and its versions were deleted successfully.', type: TopicInstance })
  @ApiNotFoundResponse({ description: 'Resource was not found.' })
  @ApiInternalServerErrorResponse({ description: 'An unknown error occured during the deletion of the app.' })
  async remove(@Param('id') id: string): Promise<TopicInstance> {
    return this.topicInstancesService.remove(id);
  }
}
