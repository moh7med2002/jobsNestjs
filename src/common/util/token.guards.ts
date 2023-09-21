// token.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../types/role.enum';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<Role[]>(
      'roles',
      context.getHandler(),
    );

    if (!requiredRoles) {
      return true; // No roles are required, allow access
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (!token) {
      return false; // No token provided, deny access
    }

    try {
      const decodedToken = await this.jwtService.verifyAsync(token, {
        secret: 'token',
      });
      request.user = decodedToken; // Store the decoded token in the request

      return requiredRoles.some((role) => decodedToken.role === role); // Check if user has any of the required roles
    } catch (error) {
      return false; // Token verification failed, deny access
    }
  }
}
