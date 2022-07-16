/*
 * Source: https://github.com/nestjs/nest/issues/5267#issuecomment-673498998
 */

import { ArgumentsHost, BadRequestException, Catch } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';

/**  This filter catches BadRequestException thrown by validation pipe and transforms it into proper WsException */
@Catch(BadRequestException)
export class BadRequestTransformationFilter extends BaseWsExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const properError = new WsException(exception.getResponse());
    super.catch(properError, host);
  }
}
