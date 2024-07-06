import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character } from './entities/character.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class CharactersService {
  private chars: Character[] = [];

  create(createCharacterDto: CreateCharacterDto) {
    const char: Character = {id: randomUUID(), ...createCharacterDto, birthday: new Date(createCharacterDto.birthday)}
    this.chars.push(char)
    return char;
  }

  findAll() {
    return this.chars;
  }

  findOne(id: string) {
    const foundChar = this.chars.filter((c) => c.id === id);
    if (foundChar.length <= 0)
      throw new NotFoundException('Product not found');
    return foundChar[0];
  }

  update(id: number, updateCharacterDto: UpdateCharacterDto) {
    return `This action updates a #${id} character`;
  }

  remove(id: number) {
    return `This action removes a #${id} character`;
  }
}
