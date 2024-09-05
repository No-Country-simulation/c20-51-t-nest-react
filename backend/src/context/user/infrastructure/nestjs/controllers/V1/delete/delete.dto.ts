import { IsUUID } from 'class-validator';

export class UserFindDeleteDto {
  @IsUUID()
  id: string;
}
