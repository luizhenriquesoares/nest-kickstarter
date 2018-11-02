import { BaseModel } from './../../../shared/base.model';
import { userRole } from '../userRole.enum';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { EnumToArray } from './../../../shared/utilities/enumToArray';

export class UserVm extends BaseModel {
    @ApiModelProperty() username: string;
    @ApiModelPropertyOptional() firstName?: string;
    @ApiModelPropertyOptional() lastName?: string;
    @ApiModelPropertyOptional({ enum: EnumToArray(userRole)}) role?: userRole;

}
