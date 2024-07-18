import { Expose } from 'class-transformer';

export class UserRdo {
  @Expose()
  public id: string;

  @Expose()
  public userName: string;

  @Expose()
  public registerDate: string;

  @Expose()
  public email: string;

  @Expose()
  public role: string;
}
