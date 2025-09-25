import { ExampleType } from '@/example/dto/enum/example-type.enum';
import { ExampleDto } from '@/example/dto/example.dto';

type GenerateStubExample = Partial<ExampleDto>;

export const generateStubExample = (
  example?: GenerateStubExample,
): ExampleDto => ({
  id: 'id',
  createdAt: new Date(),
  title: 'Example',
  type: ExampleType.THEORETICAL,
  description: 'description',
  ...example,
});
