import { Controller, HttpStatus, Post, Get, Body, HttpException } from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiOperation, ApiCreatedResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { User } from './models/user.model';
import { UserService } from './user.service';
import { RegisterVm } from './models/viewModel/registerVm.model';
import { UserVm } from './models/viewModel/userVm.model';
import { ApiException } from './../shared/apiException.model';
import { getOperationId } from '../shared/utilities/getOperationId';
import { LoginResponseVm } from './models/viewModel/loginResponseVm.model';
import { LoginVm } from './models/viewModel/loginVm.model';

@Controller('users')
@ApiUseTags(User.modelName)
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get('/test')
  findAll() {
    return '{"param1":"teste","param2":"4"}';
  }

  @Post('register')
  @ApiResponse({ status: HttpStatus.CREATED, type: UserVm })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  @ApiOperation(getOperationId(User.modelName, 'Register'))
  async register(@Body() registerVm: RegisterVm): Promise<UserVm> {
    const { username, password } = registerVm;

    if (!username) {
      throw new HttpException('Invalid Username', HttpStatus.BAD_REQUEST);
    }

    if (!password) {
      throw new HttpException('Invalid Password', HttpStatus.BAD_REQUEST);
    }

    let exist;

    try {
      exist = await this._userService.findOne({ username });
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if (!exist && exist != null) {
      throw new HttpException('Invalid Error', HttpStatus.BAD_REQUEST);
    }

    const newUser = await this._userService.register(registerVm);
    return this._userService.map<UserVm>(newUser);
  }
  @Post('login')
  @ApiCreatedResponse({ type: LoginResponseVm })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiOperation(getOperationId(User.modelName, 'Login'))
  async login(@Body() vm: LoginVm): Promise<LoginResponseVm> {
    const fields = Object.keys(vm);
    fields.forEach(field => {
      if (!vm[field]) {
        throw new HttpException(`${field} is required`, HttpStatus.BAD_REQUEST);
      }
    });

    return this._userService.login(vm);
  }
}
