import { Contains, IsString } from 'class-validator';

export class UpdatePhotoDto {
  @IsString()
  @Contains('https://via.placeholder.com/150', {
    message:
      'Хм... Мне кажется что вы хотите передать плохое значение. Не изменяйте setNewURL функцию !',
  })
  url: string;
}
