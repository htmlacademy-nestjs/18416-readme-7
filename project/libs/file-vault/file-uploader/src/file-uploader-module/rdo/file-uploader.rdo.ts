import { Expose } from 'class-transformer';

export class FileUploaderRdo {
  @Expose()
  public id: string;

  @Expose()
  public originalName: string;

  @Expose()
  public hashName: string;

  @Expose()
  public subDirectory: string;

  @Expose()
  public mimetype: string;

  @Expose()
  public size: number;
}
