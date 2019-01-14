import { createParamDecorator } from '@nestjs/common';

export const UserRoles = createParamDecorator((data, req) => {
  return data ? req.user[data] : req.user.roles;
});
