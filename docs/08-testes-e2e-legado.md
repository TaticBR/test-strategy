# Testes E2E: Estratégia para Sistemas Legados

Este guia apresenta a abordagem de **testes end-to-end (E2E)** para sistemas legados, utilizando **NestJS** e **Supertest**, garantindo validação completa do comportamento do sistema sem necessidade imediata de refatoração.

## Abordagem para Códigos Legados

Testes E2E são a estratégia mais eficaz para sistemas legados sem cobertura prévia de testes, pois:

* **Validam comportamento completo do sistema**: Exercitam todas as camadas da aplicação.
* **Não requerem refatoração imediata**: Permitem criar testes mesmo em código antigo.
* **Oferecem segurança para futuras modificações**: Mudanças podem ser verificadas automaticamente.
* **Servem como documentação viva**: O teste descreve como o sistema deve se comportar.

## Implementação de Testes E2E com NestJS

Exemplo de teste E2E para o endpoint de criação de usuários:

```typescript
// app.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (POST) should create user', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'João Silva',
        email: 'joao@example.com'
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.name).toBe('João Silva');
        expect(res.body.id).toBeDefined();
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
```

**Resumo:** Testes E2E garantem que funcionalidades críticas continuem funcionando, servindo tanto para validação quanto para documentação de sistemas legados.

---

Próximo: [Conclusão e Próximos Passos](09-conclusao-e-proximos-passos.md)