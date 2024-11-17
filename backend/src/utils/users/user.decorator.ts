import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const logger = new Logger('User Decorator');
    const request = ctx.switchToHttp().getRequest();
    const json = () => JSON.stringify(request);
    logger.log(json)
    return request.user;
  },
);
