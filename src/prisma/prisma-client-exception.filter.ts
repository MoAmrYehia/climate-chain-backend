import {
  BadRequestException,
  Catch,
  ConflictException,
  ExceptionFilter,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Observable, throwError } from 'rxjs';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter<Prisma.PrismaClientKnownRequestError> {
  catch(exception: Prisma.PrismaClientKnownRequestError): Observable<never> {
    switch (exception.code) {
      case 'P1000':
        return throwError(
          () =>
            new InternalServerErrorException(
              'Service cannot connect to the database, the provided credentials are invalid'
            )
        );
      case 'P1001':
        return throwError(() => new InternalServerErrorException('Service cannot reach database server'));
      case 'P1002':
        return throwError(
          () => new InternalServerErrorException('Service can reach database server, but it timed out')
        );
      case 'P1003':
        return throwError(() => new InternalServerErrorException('Missing database file'));
      case 'P1008':
        return throwError(() => new InternalServerErrorException('Database operation timed out'));
      case 'P1009':
        return throwError(() => new InternalServerErrorException('Database already exists on database server'));
      case 'P1010':
        return throwError(() => new InternalServerErrorException('Access to database denied'));
      case 'P1011':
        return throwError(() => new InternalServerErrorException('Error opening a TLS connection to the database'));
      case 'P1012':
        return throwError(() => new InternalServerErrorException('P1012: Most commonly an error in the prisma schema'));
      case 'P1013':
        return throwError(() => new InternalServerErrorException('The provided database string is invalid'));
      case 'P1014':
        return throwError(() => new InternalServerErrorException('P1014: Underlying model does not exist'));
      case 'P1015':
        return throwError(
          () =>
            new InternalServerErrorException(
              'Your Prisma schema is using features that are not supported for the version of the database'
            )
        );
      case 'P1016':
        return throwError(() => new InternalServerErrorException('Raw query had an incorrect number of parameters'));
      case 'P1017':
        return throwError(() => new InternalServerErrorException('Database server has closed the connection'));
      case 'P2000':
        return throwError(() => new BadRequestException('Database server has closed the connection'));
      case 'P2001':
        return throwError(() => new NotFoundException('A record searched for does not exist'));
      case 'P2002':
        return throwError(() => new ConflictException('Unique constraint failed'));
      case 'P2003':
        return throwError(() => new ConflictException('Foreign key constraint failed'));
      case 'P2004':
        return throwError(() => new ConflictException('A constraint failed on the database'));
      case 'P2005':
        return throwError(() => new InternalServerErrorException('A value stored on this record is invalid'));
      case 'P2006':
        return throwError(() => new BadRequestException('A provided value is not valid'));
      case 'P2007':
        return throwError(() => new InternalServerErrorException('Database validation error'));
      case 'P2008':
        return throwError(() => new InternalServerErrorException('Failed to parse the query'));
      case 'P2009':
        return throwError(() => new BadRequestException('Failed to validate the query'));
      case 'P2010':
        return throwError(() => new InternalServerErrorException('Raw query failed'));
      case 'P2011':
        return throwError(() => new BadRequestException('Null constraint violation'));
      case 'P2012':
        return throwError(() => new BadRequestException('Missing a required value'));
      case 'P2013':
        return throwError(() => new BadRequestException('Missing the required argument'));
      case 'P2014':
        return throwError(
          () => new BadRequestException('The change you are trying to make would violate the required relation')
        );
      case 'P2015':
        return throwError(() => new NotFoundException('A related record could not be found'));
      case 'P2016':
        return throwError(() => new InternalServerErrorException('Query interpretation error'));
      case 'P2017':
        return throwError(() => new InternalServerErrorException('The records for a relation are not connected'));
      case 'P2018':
        return throwError(() => new NotFoundException('The required connected records were not found'));
      case 'P2019':
        return throwError(() => new BadRequestException('Input error'));
      case 'P2020':
        return throwError(() => new BadRequestException('Value out of range for the type'));
      case 'P2021':
        return throwError(
          () => new InternalServerErrorException('Required table does not exist in the current database')
        );
      case 'P2022':
        return throwError(
          () => new InternalServerErrorException('Required column does not exist in the current database')
        );
      case 'P2023':
        return throwError(() => new InternalServerErrorException('Inconsistent column data'));
      case 'P2024':
        return throwError(
          () => new InternalServerErrorException('Timed out fetching a new connection from the connection pool')
        );
      case 'P2025':
        return throwError(
          () =>
            new NotFoundException(
              'An operation failed because it depends on one or more records that were required but not found'
            )
        );
      case 'P2026':
        return throwError(
          () =>
            new InternalServerErrorException(
              'The current database provider does not support a feature that the query used'
            )
        );
      case 'P2027':
        return throwError(
          () => new InternalServerErrorException('Multiple errors occurred on the database during query execution')
        );
      case 'P2030':
        return throwError(() => new InternalServerErrorException('Cannot find a fulltext index to use for the search'));
      default:
        return throwError(() => new InternalServerErrorException('internal error'));
    }
  }
}
