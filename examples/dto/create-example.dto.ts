export enum ExampleType {
  PRACTICAL = "PRACTICAL",
  THEORETICAL = "THEORETICAL",
}

export class CreateExampleDto {
  title: string;
  description?: string;
  type: ExampleType;
}
