export class CreateUserDto {
  public email: string;
  public registerDate: string;
  public userName: string;
  public userPassword: string;
  public passwordHash: string;
  public role: string;
}
