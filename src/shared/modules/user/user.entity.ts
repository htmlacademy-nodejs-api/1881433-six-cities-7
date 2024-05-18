import { User } from '../../types/index.js';

export class UserEntity implements User {
  password: string;
  typeUser: string;
  public email: string;
  public avatarPath: string;
  public firstname: string;
  public lastname: string;
}
