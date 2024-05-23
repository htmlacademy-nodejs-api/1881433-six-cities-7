import { UserType } from '../../../types/user-type.enum.js';

export class CreateUserDto {
  public email: string;
  public avatarPath: string;
  public firstname: string;
  public password: string;
  public typeUser: UserType;
}
