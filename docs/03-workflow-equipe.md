# Workflow da Equipe

Para garantir consistência e eficiência, o workflow de testes deve ser padronizado e fácil de seguir por todos os membros da equipe.

## Organização dos Arquivos
- **Unit Tests**: `src/**/*.spec.ts`
- **Integration Tests**: `test/integration/**/*.spec.ts`
- **E2E Tests**: `test/e2e/**/*.spec.ts`

## Fluxo de Desenvolvimento
1. **Planejamento**: Defina os casos de teste antes da implementação.
2. **Unitários Primeiro**: Comece testando funções isoladas.
3. **Integração**: Valide a comunicação entre módulos.
4. **E2E**: Teste o fluxo completo da aplicação.

## Convenções de Nomenclatura
- Arquivos de teste devem ter o sufixo `.spec.ts`.
- Describe blocks devem indicar claramente o módulo ou função.

```typescript
describe('AuthController', () => {
  it('deve autenticar usuário válido', async () => {
    // código do teste
  });
});
```

## Revisão de Código
- Todos os PRs devem conter testes para novas funcionalidades.
- Testes quebrando bloqueiam merges para a branch principal.

---

Próximo: [Configuração do Ambiente](04-configuracao-ambiente.md)