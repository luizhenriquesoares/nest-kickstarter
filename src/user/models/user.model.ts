import { BaseModel, schemaOptions } from './../../shared/base.model';
import { userRole } from './userRole.enum';
import { prop, ModelType } from 'typegoose';

export class User extends BaseModel {
    @prop({required: [true, 'Username is required'], unique: true})
    username: string;
    @prop({required: [true, 'Password is required'], unique: true})
    password: string;
    @prop({enum: userRole, default: userRole.User})
    role?: userRole;
    @prop()
    firstName?: string;
    @prop()
    lastName?: string;

    get fullName(): string {
        return `${this.fullName} ${this.lastName}`;
    }

    static get model(): ModelType<User> {
        return new User().getModelForClass(User, { schemaOptions});
    }

    static get modelName(): string {
        return this.model.modelName;
    }
}
