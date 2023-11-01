import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthenticatedUser = createParamDecorator( (data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user: any = request.user;
  return data ? user && user[data] : user;
});
