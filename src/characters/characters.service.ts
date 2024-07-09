import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character } from './entities/character.entity';
import { randomUUID, UUID } from 'crypto';

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

  findOne(id: UUID) {
    const foundChar = this.chars.filter(c => c.id === id);
    if (foundChar.length <= 0)
      throw new NotFoundException('Product not found');
    return foundChar[0];
  }

  update(id: UUID, updateCharacterDto: UpdateCharacterDto) {
    const index = this.chars.findIndex(c => c.id === id);
    if (index < 0 ) throw new NotFoundException('Character not found');
    const updatedChar : Character = {
      ...this.chars[index],
      ...updateCharacterDto,
      birthday: new Date(updateCharacterDto.birthday! || this.chars[index].birthday)
    }
    this.chars[index] = updatedChar
    return updatedChar
  }

  remove(id: UUID) {
    const chars = this.chars.filter(c => c.id !== id);
    if (chars.length === this.chars.length)
      throw new NotFoundException('Character not found');
    this.chars = chars;
    return true;
  }
}
