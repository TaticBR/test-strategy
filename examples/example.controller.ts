import {
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  Put,
  NotFoundException,
} from "@nestjs/common";

import { ExampleService } from "./example.service";
import { CreateExampleDto } from "./dto/create-example.dto";
import { UpdateExampleDto } from "./dto/update.example.dto";

/**
 * Responsable to manage example controllers
 */
@UsePipes(new ValidationPipe({ transform: true }))
@Controller("example")
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Post()
  create(@Body() createExampleDto: CreateExampleDto) {
    return this.exampleService.create(createExampleDto);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const example = await this.exampleService.findOne(id);
    if (!example)
      throw new NotFoundException(`Example with id "${id}" not found`);
    return example;
  }

  @Get("")
  findAll() {
    return this.exampleService.findAll();
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() data: UpdateExampleDto) {
    const example = await this.exampleService.update(id, data);
    if (!example)
      throw new NotFoundException(`Example with id "${id}" not found`);
    return example;
  }
}
