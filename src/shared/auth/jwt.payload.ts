import { userRole } from '../../user/models/userRole.enum';

export interface JwtPayload {
    username: string;
    role: userRole;
    iat?: Date;
}