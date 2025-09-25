import { ExampleDto } from '@/example/dto/example.dto';
import { UpdateExampleDto } from '@/example/dto/update-example.dto';
import { generateStubExample } from '@/example/repository/__mocks__/example.stub';

export class ExampleRepository {
  findAll(): Promise<ExampleDto[]> {
    return Promise.resolve([generateStubExample()]);
  }

  findById(id: string): Promise<ExampleDto> {
    return Promise.resolve(generateStubExample({ id }));
  }

  create(example: ExampleDto): Promise<ExampleDto> {
    return Promise.resolve(generateStubExample(example));
  }

  update(id: string, data: UpdateExampleDto): Promise<ExampleDto> {
    return Promise.resolve(generateStubExample({ ...data, id }));
  }
}
