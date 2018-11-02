import { LoginVm } from './loginVm.model';
import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';

export class RegisterVm extends LoginVm {
    @ApiModelPropertyOptional() firstName?: string;
    @ApiModelPropertyOptional() lastName?: string;

}