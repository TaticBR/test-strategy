// Importa ferramentas de teste do NestJS para criar módulos isolados
import { Test, TestingModule } from "@nestjs/testing";

// Função que gera stubs (dados simulados) para testes
import { generateStubExample } from "./repository/__mocks__/example.stub";

// Imports do controller, service e DTOs do módulo Example
import { ExampleController } from "./example.controller";
import { ExampleService } from "./example.service";
import { CreateExampleDto, ExampleType } from "./dto/create-example.dto";

describe("ExampleController", () => {
  let controller: ExampleController; // Controller que será testado
  let service: jest.Mocked<ExampleService>; // Service mockado usado pelo controller

  // Executa antes de cada teste
  beforeEach(async () => {
    // Cria um service mockado com todas as funções simuladas
    service = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
    } as unknown as jest.Mocked<ExampleService>;

    // Cria o módulo de teste do NestJS com controller e provider mockado
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExampleController], // Registra o controller no módulo
      providers: [{ provide: ExampleService, useValue: service }], // Injeta o service mockado
    }).compile();

    // Obtém a instância do controller do módulo de teste
    controller = module.get<ExampleController>(ExampleController);
  });

  // Teste básico para verificar se o controller foi definido corretamente
  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  // Testa se o controller chama o service corretamente ao criar um exemplo
  it("should call create example service", async () => {
    const stubCreateExample: CreateExampleDto = {
      title: "Lorem ipsum",
      description: "description",
      type: ExampleType.THEORETICAL,
    };

    // Chama o método do controller
    await controller.create(stubCreateExample);

    // Verifica se o service.create foi chamado com os dados corretos
    expect(service.create).toHaveBeenCalledWith(stubCreateExample);
  });

  // Testa se o controller chama o service para buscar um exemplo por ID
  it("should call find one example service", async () => {
    // Mocka o retorno do service.findOne com um stub
    jest
      .spyOn(service, "findOne")
      .mockResolvedValue(generateStubExample({ id: "1" }));

    await controller.findOne("1");

    // Verifica se o service.findOne foi chamado com o ID correto
    expect(service.findOne).toHaveBeenCalledWith("1");
  });

  // Testa se o controller chama o service para buscar todos os exemplos
  it("should call find one example service", async () => {
    await controller.findAll();

    // Verifica se o service.findAll foi chamado
    expect(service.findAll).toHaveBeenCalled();
  });

  // Testa o comportamento quando um ID não é encontrado
  it("should throw a not found exception if not found id", async () => {
    // Espera que o método lance uma exceção
    await expect(() => controller.findOne("1")).rejects.toThrow(
      'Example with id "1" not found'
    );
  });

  // Testa se o controller chama o service corretamente ao atualizar um exemplo
  it("should call update example service", async () => {
    // Mocka o retorno do service.update com um stub
    jest
      .spyOn(service, "update")
      .mockResolvedValue(generateStubExample({ id: "asd" }));

    await controller.update("asd", { title: "new title" });

    // Verifica se o service.update foi chamado com os parâmetros corretos
    expect(service.update).toHaveBeenCalledWith("asd", { title: "new title" });
  });

  // Testa o comportamento quando tenta atualizar um ID inexistente
  it("should throw a not found exception if not found id on update", async () => {
    // Espera que o método lance uma exceção
    await expect(() =>
      controller.update("2", { title: "new" })
    ).rejects.toThrow('Example with id "2" not found');
  });
});
