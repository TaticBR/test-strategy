# Configuração do Ambiente

Este guia descreve a configuração necessária para começar a escrever testes automatizados utilizando **Jest**, **TypeScript** e **NestJS**.

## Instalação de Dependências
```bash
npm install --save-dev jest @types/jest ts-jest supertest
```

## Configuração do Jest
Crie um arquivo `jest.config.js` na raiz do projeto:
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coverageDirectory: '../coverage',
  collectCoverageFrom: ['**/*.(t|j)s'],
};
```

## Debugging no VS Code
Adicione um arquivo `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Jest Tests",
      "program": "${workspaceFolder}/node_modules/jest/bin/jest.js",
      "args": ["--runInBand"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

## Scripts no package.json
Adicione scripts para facilitar a execução:
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage"
  }
}
```

---

Próximo: [Implementação de Testes](05-implementacao-testes.md)