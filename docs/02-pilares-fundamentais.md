# Pilares Fundamentais

Para construir uma base sólida de testes automatizados, definimos três pilares fundamentais que devem orientar todo o processo:

## 1. Compreensão Completa
Antes de escrever qualquer teste, é essencial compreender:
- A funcionalidade que será testada.
- Os possíveis fluxos alternativos e casos de erro.

**Prática recomendada:**
- Liste os cenários de teste antes de implementar, usando `it.todo` no Jest para mapear os casos pendentes.

```typescript
describe('LoginService', () => {
  it.todo('deve autenticar usuário válido');
  it.todo('deve falhar para senha incorreta');
  it.todo('deve bloquear usuário após 3 tentativas inválidas');
});
```

---

## 2. Cobertura Completa
Cobertura não significa apenas atingir 100% no relatório, mas garantir que cenários críticos foram validados.

**Prática recomendada:**
- Priorize cenários de negócio e funcionalidades críticas.
- Combine testes unitários, de integração e E2E.

---

## 3. Preparação Antecipada
Planejar antes de codificar ajuda a evitar retrabalho e falhas.

**Prática recomendada:**
- Configure o ambiente de testes no início do projeto.
- Defina padrões de nomenclatura e organização de arquivos.

---

Próximo: [Workflow da Equipe](03-workflow-equipe.md)
