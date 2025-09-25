import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateExampleDto } from '@/example/dto/create-example.dto';
import { ExampleDto } from '@/example/dto/example.dto';
import { Example } from '@/example/entities/example.entity';

@Injectable()
export class ExampleRepository {
  constructor(
    @InjectModel(Example.name)
    private readonly exampleModel: Model<Example>,
  ) {}

  async findById(id: string): Promise<ExampleDto> {
    const exampleDocument = await this.exampleModel.findById(id).exec();
    if (!exampleDocument) return null;
    return Example.toExampleDto(exampleDocument);
  }

  async create(exampleDto: CreateExampleDto): Promise<ExampleDto> {
    const createdExample = new this.exampleModel(exampleDto);
    const example = await createdExample.save();
    return Example.toExampleDto(example);
  }

  async update(id: string, data: Partial<ExampleDto>): Promise<ExampleDto> {
    const exampleDocument = await this.exampleModel.findByIdAndUpdate(
      id,
      {
        $set: data,
      },
      {
        new: true,
      },
    );
    if (!exampleDocument) return null;
    return Example.toExampleDto(exampleDocument);
  }

  async findAll(): Promise<ExampleDto[]> {
    const exampleDocuments = await this.exampleModel.find();
    return exampleDocuments.map((example) => Example.toExampleDto(example));
  }
}
