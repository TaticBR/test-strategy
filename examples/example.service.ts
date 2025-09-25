import { Injectable, Logger } from '@nestjs/common';
import { Types } from 'mongoose';

import { CreateExampleDto } from './dto/create-example.dto';
import { UpdateExampleDto } from './dto/update.example.dto';
import { ExampleRepository } from './repository/example.repository

/**
 * Responsable to manage example services
 */
@Injectable()
export class ExampleService {
  private readonly logger = new Logger(ExampleService.name);

  constructor(private readonly exampleRepository: ExampleRepository) {}

  async create(createExampleDto: CreateExampleDto): Promise<CreateExampleDto> {
    this.logger.log('Creating example');

    return this.exampleRepository.create(createExampleDto);
  }

  async findAll() {
    this.logger.log('Get all examples');
    return this.exampleRepository.findAll();
  }

  async findOne(id: string): Promise<CreateExampleDto> {
    this.logger.log(`Search for example ${id}`);
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    return this.exampleRepository.findById(id);
  }

  async update(id: string, data: UpdateExampleDto) {
    this.logger.log(`Updating example ${id}`);
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    return this.exampleRepository.update(id, data);
  }
}
