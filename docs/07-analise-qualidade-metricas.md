# Análise de Qualidade e Métricas

Este guia aborda a importância de métricas de qualidade em testes automatizados, destacando limitações e boas práticas no uso do **code coverage**.

## Limitações do Code Coverage

O **code coverage** é uma métrica útil, mas deve ser interpretada com cuidado. Alguns pontos importantes:

* **100% de cobertura ≠ 100% de qualidade**: É possível cobrir código sem validar seu comportamento.
* **Foco em qualidade, não quantidade**: É preferível ter 80% de cobertura com testes significativos do que 100% sem efetividade.
* **Evitar "gaming" da métrica**: Não crie testes apenas para aumentar o percentual; isso reduz a confiança nos testes.

## Exemplo de Cobertura Inadequada

```typescript
// ❌ Cobertura alta, mas teste inútil
it('should call calculate method', () => {
  const result = service.calculate(10, 5);
  expect(service.calculate).toBeDefined(); // Não valida comportamento
});

// ✅ Cobertura com validação real
it('should calculate tax correctly', () => {
  const result = service.calculate(100, 0.15);
  expect(result).toBe(15);
});
```

**Resumo:** Sempre priorize **testes que validam comportamento e regras de negócio** em vez de apenas gerar métricas superficiais.

---

Próximo: [Testes E2E em Sistemas Legados](docs/08-testes-e2e-legado.md)
