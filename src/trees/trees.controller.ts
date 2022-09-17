// import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
// import { ClientProxy } from '@nestjs/microservices';
// import { AuthGuard } from '@nestjs/passport';
// import {
//   ApiBadRequestResponse,
//   ApiBearerAuth,
//   ApiCreatedResponse,
//   ApiGatewayTimeoutResponse,
//   ApiInternalServerErrorResponse,
//   ApiNotFoundResponse,
//   ApiOkResponse,
//   ApiOperation,
//   ApiTags
// } from '@nestjs/swagger';
// import {
//   ApiPageResponse,
//   App,
//   AppWithAppVersions,
//   CreateAppDto,
//   FilterAppsDto,
//   Page,
//   UpdateAppDto
// } from '@yourmileag/backend_packages_schema';

// @ApiTags('Apps')
// @Controller({ version: '1', path: 'apps' })
// export class AppsController {
//   constructor(@Inject(Services.ESSENTIALS) private readonly essentialsClient: ClientProxy) {}

//   @Post()
//   @UseGuards(AuthGuard('jwt'), PermissionsGuard)
//   @Permissions('create:apps')
//   @ApiOperation({ summary: `Create a new ${App.name}` })
//   @ApiBearerAuth('JWT-auth')
//   @ApiCreatedResponse({ description: `The ${App.name} got created successfully`, type: App })
//   @ApiBadRequestResponse({ description: 'Invalid input was provided.' })
//   @ApiGatewayTimeoutResponse({ description: 'Microservice failed to answer' })
//   @ApiInternalServerErrorResponse({
//     description: `An unknown error occured during creation of the ${App.name}.`
//   })
//   async create(@Body() createAppDto: CreateAppDto): Promise<App> {
//     return fetchFromServiceAsGateway<App>(this.essentialsClient.send('appCreate', { createAppDto }));
//   }

//   @Get()
//   @UseGuards(AuthGuard('jwt'))
//   @ApiBearerAuth('JWT-auth')
//   @ApiOperation({ summary: `Filter all ${App.name}s` })
//   @ApiPageResponse(App)
//   @ApiGatewayTimeoutResponse({ description: 'Microservice failed to answer' })
//   @ApiInternalServerErrorResponse({ description: 'Unknown error occured during the search.' })
//   async findAll(@Query() filterAppsDto: FilterAppsDto): Promise<Page<App>> {
//     return fetchFromServiceAsGateway<Page<App>>(this.essentialsClient.send('appFindAll', { filterAppsDto }));
//   }

//   @Get(':id')
//   @UseGuards(AuthGuard('jwt'))
//   @ApiBearerAuth('JWT-auth')
//   @ApiOperation({ summary: `Get a specific ${App.name}` })
//   @ApiOkResponse({ description: `${App.name} found`, type: App })
//   @ApiNotFoundResponse({ description: `${App.name} not found` })
//   @ApiInternalServerErrorResponse({ description: 'Unknown error occured during the search.' })
//   @ApiGatewayTimeoutResponse({ description: 'Microservice failed to answer' })
//   async findOne(@Param('id') id: string): Promise<AppWithAppVersions> {
//     return fetchFromServiceAsGateway<AppWithAppVersions>(this.essentialsClient.send('appFindOne', { id }));
//   }

//   @Patch(':id')
//   @UseGuards(AuthGuard('jwt'), PermissionsGuard)
//   @Permissions('update:apps')
//   @ApiOperation({ summary: `Update an existing ${App.name}` })
//   @ApiBearerAuth('JWT-auth')
//   @ApiOkResponse({ description: `The ${App.name} got updated successfully`, type: App })
//   @ApiNotFoundResponse({ description: 'Resource was not found.' })
//   @ApiInternalServerErrorResponse({ description: 'An unknown error occured.' })
//   @ApiGatewayTimeoutResponse({ description: 'Microservice failed to answer' })
//   async update(@Param('id') id: string, @Body() updateAppDto: UpdateAppDto): Promise<App> {
//     return fetchFromServiceAsGateway<App>(this.essentialsClient.send('appUpdate', { id, updateAppDto }));
//   }

//   @Delete(':id')
//   @UseGuards(AuthGuard('jwt'), PermissionsGuard)
//   @Permissions('delete:apps')
//   @ApiOperation({ summary: `Delete an ${App.name}` })
//   @ApiBearerAuth('JWT-auth')
//   @ApiGatewayTimeoutResponse({ description: 'Microservice failed to answer' })
//   @ApiOkResponse({ description: 'The app and its versions were deleted successfully.', type: App })
//   @ApiNotFoundResponse({ description: 'Resource was not found.' })
//   @ApiInternalServerErrorResponse({ description: 'An unknown error occured during the deletion of the app.' })
//   async remove(@Param('id') id: string): Promise<App> {
//     return fetchFromServiceAsGateway<App>(this.essentialsClient.send('appRemove', { id }));
//   }
// }
