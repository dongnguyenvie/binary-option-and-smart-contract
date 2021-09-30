import { applyDecorators, UseGuards } from '@nestjs/common';
import JwtAuthGuard from './jwt-auth.guard';

export default function PoliciesGuard(payload?: any) {
  return applyDecorators(UseGuards(JwtAuthGuard));
}
