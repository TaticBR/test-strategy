# Debugging com VS Code

Este guia descreve como configurar o **debugging** de testes em projetos **NestJS** com **Jest** e **TypeScript**, utilizando o VS Code para um workflow eficiente.

## Configuração do VS Code

Crie um arquivo `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Jest Test Current File",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": [
        "${file}",
        "--runInBand",
        "--watchAll"
      ],
      "runtimeArgs": [
        "-r",
        "ts-node/register",
        "-r",
        "tsconfig-paths/register"
      ],
      "env": {
        "TS_NODE_PROJECT": "${workspaceFolder}/tsconfig.json"
      },
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "skipFiles": [
        "<node_internals>/**",
        "**/node_modules/**"
      ]
    }
  ]
}
```

### Benefícios

* **Debug de arquivo único**: Executa apenas o arquivo de teste atual.
* **Watch mode**: Reexecuta automaticamente quando o arquivo é modificado.
* **Suporte a TypeScript**: Path mapping configurado corretamente.
* **Breakpoints**: Total funcionalidade de breakpoints em testes e código-fonte.
* **Console integrado**: Saída direta no terminal do VS Code.

## Workflow de Debugging

1. **Abrir arquivo de teste**: Navegue até o arquivo `.spec.ts`.
2. **Definir breakpoints**: Clique na margem esquerda do editor.
3. **Executar debug**: Vá em **Run and Debug** e selecione **Debug Jest Test Current File**.
4. **Investigar**: Examine variáveis, call stack e fluxo de execução com o debugger.

## Live Reloading e Desenvolvimento Ágil

Para ciclos de desenvolvimento rápidos, use o **watch mode** do Jest:

```bash
npm run test:watch
```

Ou use a configuração de debugging do VS Code, que já inclui o watch mode.

### Vantagens do Live Reloading

* **Feedback imediato**: Resultados de teste em tempo real.
* **Desenvolvimento iterativo**: Modificações refletidas instantaneamente.
* **Debugging contínuo**: Breakpoints mantidos entre execuções.
* **Produtividade aumentada**: Redução significativa do tempo de ciclo.

---

Próximo: [Análise de Qualidade e Métricas](07-analise-qualidade-metricas.md)
