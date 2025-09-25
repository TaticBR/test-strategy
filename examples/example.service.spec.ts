// Faz o mock do repositório para não depender de banco de dados real (https://jestjs.io/docs/manual-mocks)
jest.mock("./repository/example.repository");

import { Test, TestingModule } from "@nestjs/testing";
import { Types } from "mongoose";

import { ExampleService } from "./example.service";
import { ExampleRepository } from "./repository/example.repository";
import { CreateExampleDto, ExampleType } from "./dto/create-example.dto";

describe("ExampleService", () => {
  let service: ExampleService;

  // Antes de cada teste, cria o módulo de teste do NestJS e injeta o service
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExampleService, ExampleRepository],
    }).compile();

    service = module.get(ExampleService); // Obtemos a instância do service
  });

  // Testa se o service foi corretamente definido pelo NestJS
  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  // Testa a criação de um exemplo
  it("should create a example", async () => {
    // Espia a função 'create' do repositório para garantir que foi chamada corretamente
    const spyCreateExampleRepository = jest.spyOn(
      service["exampleRepository"],
      "create"
    );

    // Define um DTO de exemplo para criação
    const createExampleStub: CreateExampleDto = {
      title: "Lorem ipsum",
      type: ExampleType.THEORETICAL,
      description: "",
    };

    // Executa o método do service
    const result = await service.create(createExampleStub);

    // Valida que o resultado possui um 'id' (simulando criação no banco)
    expect(result).toHaveProperty("id");
    // Confirma que o repositório foi chamado exatamente uma vez
    expect(spyCreateExampleRepository).toHaveBeenCalledTimes(1);
    // Confirma que o repositório foi chamado com os dados corretos
    expect(spyCreateExampleRepository).toHaveBeenCalledWith(createExampleStub);
  });

  // Testa busca de um exemplo por ID válido
  it("should find one example by id", async () => {
    const spyFindByIdExampleRepository = jest.spyOn(
      service["exampleRepository"],
      "findById"
    );

    const objectId = new Types.ObjectId().toString(); // Simula um ObjectId válido
    const result = await service.findOne(objectId);

    // Valida que o resultado contém o mesmo 'id'
    expect(result).toHaveProperty("id", objectId);
    // Confirma que o repositório foi chamado com o id correto
    expect(spyFindByIdExampleRepository).toHaveBeenCalledWith(objectId);
  });

  // Testa comportamento quando o ID fornecido é inválido
  it("should return null if is a invalid object id", async () => {
    const spyFindByIdExampleRepository = jest.spyOn(
      service["exampleRepository"],
      "findById"
    );

    const result = await service.findOne("asd"); // 'asd' não é um ObjectId válido
    expect(result).toBeNull(); // Espera retorno nulo
    expect(spyFindByIdExampleRepository).toHaveBeenCalledTimes(0); // Repo não deve ser chamado
  });

  // Testa busca de todos os exemplos
  it("should find a list of examples", async () => {
    const spyFindAllExampleRepository = jest.spyOn(
      service["exampleRepository"],
      "findAll"
    );

    const result = await service.findAll();
    // Valida que o resultado é um array (mesmo que vazio)
    expect(result).toEqual(expect.arrayContaining([]));
    expect(spyFindAllExampleRepository).toHaveBeenCalled(); // Repo deve ser chamado
  });

  // Testa atualização de um exemplo com ID válido
  it("should update a example", async () => {
    const spyUpdateExampleRepository = jest.spyOn(
      service["exampleRepository"],
      "update"
    );

    const objectId = new Types.ObjectId().toString();
    const result = await service.update(objectId, { title: "new title" });

    // Valida que o resultado possui ID e título atualizados
    expect(result).toHaveProperty("id", objectId);
    expect(result).toHaveProperty("title", "new title");

    // Confirma que o repositório foi chamado com os parâmetros corretos
    expect(spyUpdateExampleRepository).toHaveBeenCalledWith(objectId, {
      title: "new title",
    });
  });

  // Testa comportamento quando ID inválido é passado para atualização
  it("should return null if is invalid object id", async () => {
    const spyUpdateExampleRepository = jest.spyOn(
      service["exampleRepository"],
      "update"
    );

    const result = await service.update("asd", { title: "new title" });
    expect(result).toBeNull(); // Deve retornar nulo
    expect(spyUpdateExampleRepository).toHaveBeenCalledTimes(0); // Repo não é chamado
  });
});
