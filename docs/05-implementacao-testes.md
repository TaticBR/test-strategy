# Implementação de Testes com NestJS e Jest

Este documento traz um guia prático para implementação de testes unitários, integração e E2E em aplicações **NestJS**, utilizando o **Jest** como framework principal.

---

## 1. Arquitetura de Testes no NestJS

Um teste básico de serviço com Jest e NestJS geralmente segue esta estrutura:

```typescript
// user.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './repository/user.repository';

jest.mock('./repository/user.repository');

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, UserRepository],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
```

---

## 2. Estratégias de Mocking

### 2.1 Conceito

Mocks são simulações de dependências externas.
Objetivos:

* Testes isolados
* Execução rápida
* Determinismo nos resultados

### 2.2 Metodologia AAA (Arrange, Act, Assert)

Organize os testes em três blocos claros:

* **Arrange**: Configuração inicial
* **Act**: Execução da funcionalidade
* **Assert**: Validação dos resultados

```typescript
it('should return true for valid CPF', () => {
  // Arrange
  const cpf = '123.456.789-09';

  // Act
  const result = service.validateCPF(cpf);

  // Assert
  expect(result).toBe(true);
});
```

---

## 3. Tipos de Mocks

### 3.1 Stubs (simulação de comportamento)

```typescript
it('should handle external API failure', async () => {
  jest.spyOn(service['userRepository'], 'create')
    .mockRejectedValueOnce(new Error('External API Error'));

  await expect(service.create({ name: 'John' }))
    .rejects.toThrow('External API Error');
});
```

### 3.2 Spies (monitoramento de chamadas)

```typescript
it('should call repository with correct parameters', async () => {
  const spy = jest.spyOn(service['userRepository'], 'findById');
  const id = '123';

  await service.getUser(id);

  expect(spy).toHaveBeenCalledWith(id);
  expect(spy).toHaveBeenCalledTimes(1);
});
```

### 3.3 Fake Timers (simulação de tempo)

```typescript
beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

it('should execute task after delay', () => {
  const task = jest.fn();
  service.scheduleTask(task, 5000);
  jest.advanceTimersByTime(5000);
  expect(task).toHaveBeenCalled();
});
```

---

## 4. Boas Práticas

* **Nomenclatura**:

  * `describe` → contexto
  * `it` → comportamento esperado

* **Testes isolados**:

  * Cada teste deve funcionar sozinho

* **Reset de estados**:

  * Use `beforeEach` para limpar variáveis, feature flags e mocks

* **Factories para DTOs**:

  * Crie funções para gerar objetos padrão e evitar duplicação

* **Documentação viva**:

  * O código do teste deve ser autoexplicativo

---

## 5. Próximos Passos

* Criar mocks para todas as dependências externas
* Implementar testes para cenários de erro
* Introduzir **coverage reports** para monitorar qualidade

Próximo: [Debugging e Troubleshooting](06-debugging-e-troubleshooting.md)
