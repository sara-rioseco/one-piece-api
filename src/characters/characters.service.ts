import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCharacterDto, UpdateCharacterDto } from './dto';
import { randomUUID, UUID } from 'crypto';
import {
  Character,
  Affiliation,
  Age,
  Alias,
  Bounty,
  Debut,
  DevilFruit,
  Epiteth,
  Height,
  Occupation,
  Origin,
  Residence,
} from './entities';

@Injectable()
export class CharactersService {
  private logger = new Logger(CharactersService.name);

  constructor(
    @InjectRepository(Character)
    private readonly charactersRepository: Repository<Character>,
    @InjectRepository(Affiliation)
    private readonly affiliationRepository: Repository<Affiliation>,
    @InjectRepository(Age)
    private readonly ageRepository: Repository<Age>,
    @InjectRepository(Alias)
    private readonly aliasRepository: Repository<Alias>,
    @InjectRepository(Bounty)
    private readonly bountyRepository: Repository<Bounty>,
    @InjectRepository(Debut)
    private readonly debutRepository: Repository<Debut>,
    @InjectRepository(DevilFruit)
    private readonly devilFruitRepository: Repository<DevilFruit>,
    @InjectRepository(Epiteth)
    private readonly epitethRepository: Repository<Epiteth>,
    @InjectRepository(Height)
    private readonly heightRepository: Repository<Height>,
    @InjectRepository(Occupation)
    private readonly occupationRepository: Repository<Occupation>,
    @InjectRepository(Origin)
    private readonly OriginRepository: Repository<Origin>,
    @InjectRepository(Residence)
    private readonly residenceRepository: Repository<Residence>,
  ) {}

  async create(createCharacterDto: CreateCharacterDto) {
    const char: Character = {
      char_id: randomUUID(),
      ...createCharacterDto,
      birthday: new Date(createCharacterDto.birthday),
    };
    const newChar = await this.charactersRepository.save(char);
    const affiliations = await this.affiliationRepository.findBy({
      char_id: newChar.char_id,
    });
    const ages = await this.ageRepository.findBy({ char_id: newChar.char_id });
    const alias = await this.aliasRepository.findBy({
      char_id: newChar.char_id,
    });
    const bounties = await this.bountyRepository.findBy({
      char_id: newChar.char_id,
    });
    const debut = (await this.debutRepository.findOneBy({
      char_id: newChar.char_id,
    })) as Debut;
    const epiteths = await this.epitethRepository.findBy({
      char_id: newChar.char_id,
    });
    const devilFruits = await this.devilFruitRepository.findBy({
      char_id: newChar.char_id,
    });
    const heights = await this.heightRepository.findBy({
      char_id: newChar.char_id,
    });
    const occupations = await this.occupationRepository.findBy({
      char_id: newChar.char_id,
    });
    const origin = (await this.OriginRepository.findOneBy({
      char_id: newChar.char_id,
    })) as Origin;
    const residences = await this.residenceRepository.findBy({
      char_id: newChar.char_id,
    });
    const birthday = char.birthday.toISOString();
    const charDTO: CreateCharacterDto = {
      ...char,
      affiliations,
      birthday,
      ages,
      alias,
      bounties,
      debut,
      epiteths,
      devilFruits,
      heights,
      occupations,
      origin,
      residences,
    };
    return charDTO;
  }

  async findAll() {
    const chars: Character[] = await this.charactersRepository.find();
    return Promise.all(
      chars.map(async (char) => {
        return this.getById(char.char_id);
      }),
    );
  }

  async findOne(id: UUID) {
    const char = await this.charactersRepository.findOneBy({ char_id: id });
    if (!char) throw new NotFoundException('Character not found');
    return char;
  }

  async getById(id: UUID) {
    const char = await this.findOne(id);
    const affiliations = await this.affiliationRepository.findBy({
      char_id: id,
    });
    const ages = await this.ageRepository.findBy({ char_id: id });
    const alias = await this.aliasRepository.findBy({ char_id: id });
    const bounties = await this.bountyRepository.findBy({ char_id: id });
    const debut = (await this.debutRepository.findOneBy({
      char_id: id,
    })) as Debut;
    const epiteths = await this.epitethRepository.findBy({ char_id: id });
    const devilFruits = await this.devilFruitRepository.findBy({ char_id: id });
    const heights = await this.heightRepository.findBy({ char_id: id });
    const occupations = await this.occupationRepository.findBy({ char_id: id });
    const origin = (await this.OriginRepository.findOneBy({
      char_id: id,
    })) as Origin;
    const residences = await this.residenceRepository.findBy({ char_id: id });
    const birthday = char.birthday.toISOString();
    const charDTO: CreateCharacterDto = {
      ...char,
      affiliations,
      birthday,
      ages,
      alias,
      bounties,
      debut,
      epiteths,
      devilFruits,
      heights,
      occupations,
      origin,
      residences,
    };
    return charDTO;
  }

  async update(id: UUID, updateCharacterDto: UpdateCharacterDto) {
    const char = await this.findOne(id);
    if (!char) throw new NotFoundException('Character not found');
    const updateResult = await this.charactersRepository.update(
      { char_id: id },
      updateCharacterDto,
    );
    if (updateResult.affected! <= 0)
      throw new InternalServerErrorException('Error updating character');
    const updatedChar = await this.getById(id);
    return updatedChar;
  }

  async remove(id: UUID) {
    try {
      const char = await this.findOne(id);
      if (!char) throw new NotFoundException('Character not found');
      await this.affiliationRepository.delete({ char_id: id });
      await this.ageRepository.delete({ char_id: id });
      await this.aliasRepository.delete({ char_id: id });
      await this.bountyRepository.delete({ char_id: id });
      await this.debutRepository.delete({ char_id: id });
      await this.epitethRepository.delete({ char_id: id });
      await this.devilFruitRepository.delete({ char_id: id });
      await this.heightRepository.delete({ char_id: id });
      await this.occupationRepository.delete({ char_id: id });
      await this.OriginRepository.delete({ char_id: id });
      await this.residenceRepository.delete({ char_id: id });
      const deleteResult = await this.charactersRepository.delete({
        char_id: char.char_id,
      });
      if (deleteResult.affected! <= 0)
        throw new InternalServerErrorException('Error deleting character');
      return { message: 'Character deleted successfully' };
    } catch (err) {
      throw err;
    }
  }
}
