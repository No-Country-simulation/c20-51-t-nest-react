import { IsUUID } from 'class-validator';

export class UserFindOneByIdDto {
  @IsUUID()
  id: string;
}
