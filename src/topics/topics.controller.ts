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
import { CreateTopicDto } from './dto/create-topic.dto';
import { FilterTopicsDto } from './dto/filter-topics.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Topic } from './entities/topic.entity';
import { TopicsService } from './topics.service';

@ApiTags('Topics')
@Controller({ version: '1', path: 'topics' })
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Post()
  // @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: `Create a new ${Topic.name}` })
  @ApiCreatedResponse({ description: `The ${Topic.name} got created successfully`, type: Topic })
  @ApiBadRequestResponse({ description: 'Invalid input was provided.' })
  @ApiInternalServerErrorResponse({
    description: `An unknown error occured during creation of the ${Topic.name}.`
  })
  async create(@Body() createTopicDto: CreateTopicDto): Promise<Topic> {
    return this.topicsService.create(createTopicDto);
  }

  @Get()
  // @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: `Filter all ${Topic.name}s` })
  @ApiPageResponse(Topic)
  @ApiInternalServerErrorResponse({ description: 'Unknown error occured during the search.' })
  async findAll(@Query() filterTopicsDto: FilterTopicsDto): Promise<Page<Topic>> {
    return this.topicsService.findAll(filterTopicsDto);
  }

  @Get(':id')
  // @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: `Get a specific ${Topic.name}` })
  @ApiOkResponse({ description: `${Topic.name} found`, type: Topic })
  @ApiNotFoundResponse({ description: `${Topic.name} not found` })
  @ApiInternalServerErrorResponse({ description: 'Unknown error occured during the search.' })
  async findOne(@Param('id') id: string): Promise<Topic> {
    return this.topicsService.findOne(id);
  }

  @Patch(':id')
  // @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: `Update an existing ${Topic.name}` })
  @ApiOkResponse({ description: `The ${Topic.name} got updated successfully`, type: Topic })
  @ApiNotFoundResponse({ description: 'Resource was not found.' })
  @ApiInternalServerErrorResponse({ description: 'An unknown error occured.' })
  @ApiGatewayTimeoutResponse({ description: 'Microservice failed to answer' })
  async update(@Param('id') id: string, @Body() updateTopicDto: UpdateTopicDto): Promise<Topic> {
    return this.topicsService.update(id, updateTopicDto);
  }

  @Delete(':id')
  // @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: `Delete an ${Topic.name}` })
  @ApiGatewayTimeoutResponse({ description: 'Microservice failed to answer' })
  @ApiOkResponse({ description: 'The app and its versions were deleted successfully.', type: Topic })
  @ApiNotFoundResponse({ description: 'Resource was not found.' })
  @ApiInternalServerErrorResponse({ description: 'An unknown error occured during the deletion of the app.' })
  async remove(@Param('id') id: string): Promise<Topic> {
    return this.topicsService.remove(id);
  }
}
