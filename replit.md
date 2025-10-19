# Dashboard de Drogas Apreendidas - Polícia Civil da Bahia

## Visão Geral
Sistema de controle e monitoramento de drogas apreendidas e armazenadas nas unidades policiais da Bahia. Desenvolvido para a Corregedoria da Polícia Civil da Bahia sob a Secretaria de Segurança Pública.

## Funcionalidades Principais

### 1. Dashboard Interativo
- **KPIs (8 indicadores)**:
  - Total de apreensões
  - Quantidade total (kg)
  - Unidades envolvidas
  - **Apreensões de 2025** (ano atual dinâmico)
  - **Drogas armazenadas em cartório**
  - **Com laudo pericial**
  - **Com pedido de destruição**
  - **Destruição/Incineração concluída**
- **Mapa da Bahia**: Visualização geográfica das apreensões com markers coloridos por intensidade
- **Gráficos**:
  - Gráfico de barras horizontal: Apreensões por tipo de droga
  - Gráfico de linha: Timeline mensal de apreensões
  - Gráfico de pizza: Distribuição por departamento
- **Tabela completa**: Todos os registros com busca, ordenação e paginação

### 2. Sistema de Filtros
- Filtros interativos por:
  - Departamento
  - Unidade policial
  - Tipo de droga
  - Status (Armazenada, Incinerada, Em Análise)
  - Período (data inicial e final)
- Atualização em tempo real dos gráficos e tabelas
- Botão "Limpar filtros" para resetar

### 3. Upload de Dados
- **Upload de Excel**: Importação em lote de dados via arquivo .xlsx ou .xls
- **Inserção Manual**: Formulário completo para adicionar registros individuais
- Validação de dados e feedback visual

### 4. Exportação
- Geração de relatórios em PDF com jsPDF
- Inclui cabeçalho institucional, data de geração e tabela completa dos dados

## Arquitetura Técnica

### Stack
- **Frontend**: React + TypeScript + Vite
- **Backend**: Express.js + Node.js
- **Database**: PostgreSQL (Neon) + Drizzle ORM
- **Styling**: Tailwind CSS + Shadcn UI
- **Maps**: Leaflet
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod

### Estrutura de Dados

```typescript
DrugSeizure {
  id: string
  date: Date
  department: string
  unit: string
  drugType: string
  quantity: decimal
  quantityUnit: string
  status: string
  location?: string
  latitude?: decimal
  longitude?: decimal
  observations?: string
  storedInRegistry: boolean
  forensicReport?: "com_pedido_destruicao" | "sem_pedido_destruicao"
  destructionCompleted: boolean
  createdAt: Date
}
```

### API Endpoints
- `GET /api/seizures` - Listar apreensões (com filtros)
- `POST /api/seizures` - Criar nova apreensão
- `POST /api/upload-excel` - Upload de arquivo Excel
- `GET /api/stats` - Estatísticas do dashboard
- `GET /api/stats/drug-types` - Estatísticas por tipo de droga
- `GET /api/stats/departments` - Estatísticas por departamento
- `GET /api/stats/timeline` - Timeline mensal
- `GET /api/stats/map` - Marcadores para o mapa
- `GET /api/departments` - Lista de departamentos
- `GET /api/units` - Lista de unidades
- `GET /api/drug-types` - Lista de tipos de droga

## Design System

### Paleta de Cores
- **Primary**: Navy Blue (220 70% 25%) - Autoridade institucional
- **Charts**: 5 cores distintas e colorblind-safe
- **Status Colors**:
  - Verde: Armazenada
  - Vermelho: Incinerada
  - Âmbar: Em Análise

### Tipografia
- **Primary Font**: Inter (UI e dados)
- **Mono Font**: JetBrains Mono (números tabulares)

### Componentes
- Cabeçalho institucional com brasão da Polícia Civil da Bahia
- Cards com hover elevation
- Tabela com ordenação e paginação
- Filtros em sidebar sticky
- Dialogs para upload e inserção manual

## Dados Reais Importados
O sistema está operando com **10.201 apreensões reais** importadas da planilha oficial (após normalização de datas e limpeza de unidades inválidas):

### 📊 Estatísticas Gerais
- **10.201** apreensões totais (2010-2025)
  - **~2.400** apreensões de 2025 (jan até 14/out, dados mais recentes)
  - **~7.800** apreensões históricas (2010-2024)
  - 🔄 **86 registros convertidos** (datas após 14/10/2025 → convertidas para 2024)
  - ❌ **348 registros deletados** (unidade policial não especificada)
- **254** unidades policiais distintas
- **7** departamentos (DEPIN, DEPOM, DENARC, DEIC, etc.)
- **1.799** registros com coordenadas geográficas (mapa)
- Arquivo original: 13.910 linhas
  - **3.709 registros filtrados**: datas antigas/malformadas + sem unidade/departamento

### 🌿 Distribuição por Tipo de Droga
- **Maconha**, **Cocaína**, **Crack** e outros tipos identificados automaticamente do texto
- Maioria dos registros têm tipo "Não especificado" devido à falta de padronização no Excel

### 📊 KPIs Operacionais (dados reais)
- **10.105** (93,3%) armazenadas em cartório
- **10.144** (93,6%) com laudo pericial
- **4.492** (41,5%) com pedido de destruição
- **522** (4,8%) com destruição/incineração concluída

### ⚙️ Processo de Importação
- Arquivo: APREENSÃO DROGAS COMPILADO dash_1760700427240.xlsx (13 colunas)
- Importação completa com extração de:
  - Data da apreensão (**validação: 01/01/2010 até 31/10/2025** - estamos em outubro/2025)
  - Departamento, Região, COORPIN, Unidade
  - Tipo de droga e quantidade estimada
  - Status booleanos: Cartório (col I), Laudo (col J), Destruição (col L)
  - Situação atual com análise de pedido de destruição
- Processamento em lotes de 500 registros
- **Validações e Normalizações aplicadas**:
  - **Data**: 01/01/2010 até 14/10/2025
  - **Normalização de ano**: Datas após 14/10/2025 são **convertidas para 2024** (mesmo dia/mês)
    - Exemplo: 28/10/2025 → 28/10/2024
    - Motivo: Estamos em outubro/2025, então datas futuras são erros de digitação do ano
  - **Departamento**: obrigatório (não pode estar vazio)
  - **Unidade policial**: obrigatória (não pode estar vazia)
- **3.709 registros filtrados**: datas inválidas + sem unidade/departamento

## Como Executar

### Desenvolvimento
```bash
npm run dev
```
O sistema iniciará em http://localhost:5000

### Deploy (Produção)

#### Configuração Automática
O sistema está configurado para funcionar automaticamente em produção:
- ✅ **Usuário admin criado automaticamente** no primeiro boot
- ✅ **Cookies seguros** (HTTPS) configurados automaticamente
- ✅ **SESSION_SECRET** configurada pelo Replit
- ✅ **Sessões persistentes** no PostgreSQL
- ✅ **Banco de produção separado** do desenvolvimento

#### Credenciais Padrão
Após o primeiro deploy, use:
```
Usuário: admin
Senha: PCBA@2025!Secure
```

#### Como Fazer o Deploy
1. Clique em **"Deploy"** no Replit
2. Aguarde o servidor iniciar (primeira vez pode demorar ~30s)
3. Verifique os logs: deve aparecer "✅ Default admin user created"
4. Acesse o URL do deploy
5. Faça login com as credenciais acima

#### Troubleshooting Deploy
Se o login não funcionar ou dashboard aparecer vazio:

**1. Verifique os logs do deploy:**

Logs esperados no primeiro boot (banco vazio):
```
🔧 Initializing database...
🔧 Environment: production
🔧 Database URL: SET ✅
🔐 Auth setup - Environment: PRODUCTION
🔐 Cookie secure: true
🔐 Database store: PostgreSQL
🔐 SESSION_SECRET: SET ✅
✅ Default admin user created: admin / PCBA@2025!Secure
📂 Importing seizure data from Excel...
📊 Processing 13910 rows...
📥 Inserting 10836 records in batches...
   ✓ 500 / 10836
   ✓ 1000 / 10836
   ...
   ✓ 10836 / 10836
✅ Successfully imported 10836 records!
```

Logs esperados em boots subsequentes (banco já populado):
```
🔧 Initializing database...
✅ Admin user already exists (id: 1)
✅ Data already imported (10836 records)
```

**2. Se aparecer erro:**
- `🔧 Database URL: NOT SET ❌` → Banco não configurado
- `🔐 SESSION_SECRET: NOT SET ❌` → Secret não configurada
- `❌ Error importing data` → Problema ao ler Excel

**3. Soluções:**
- Limpe o cache do navegador (Ctrl+Shift+Delete)
- Tente em uma aba anônima
- Verifique se o banco de produção está ativo no painel do Replit
- Aguarde a importação completa (pode levar ~30s na primeira vez)

## Próximas Fases
1. ✅ ~~Banco de dados PostgreSQL persistente~~ (Concluído)
2. ✅ ~~Autenticação básica com login/senha~~ (Concluído)
3. Controle de permissões por departamento (RBAC)
4. Sistema de notificações e alertas para apreensões críticas
5. Análises avançadas e previsões com machine learning
6. Sistema de comentários e anotações nos registros
7. Histórico de modificações e auditoria completa
8. Rate limiting para login e upload de arquivos

## Mudanças Recentes
- **2025-10-18 (Date Normalization)**: **Normalização de datas futuras**:
  - Implementada lógica: datas após 14/10/2025 são **convertidas para 2024** (mesmo dia/mês)
  - 86 registros convertidos (ex: 28/10/2025 → 28/10/2024)
  - Data máxima permitida: 14/10/2025 (estamos em outubro/2025)
  - Atualizado: seed-production.ts, init-db.ts, routes.ts
  - Total final: **10.201 registros válidos**
- **2025-10-18 (Data Cleaning)**: **Limpeza de dados inválidos**:
  - Deletados 348 registros com unidade policial "Não especificada"
  - Atualizado scripts para exigir unidade e departamento válidos
- **2025-10-18 (UI Fix)**: **Gráfico de pizza corrigido**:
  - Removidas labels sobrepostas do gráfico
  - Legenda horizontal limpa abaixo do gráfico
  - Tooltip melhorado com número de casos + porcentagem
- **2025-10-17 (Upload Fix)**: **Correção do sistema de upload**:
  - Middleware de autenticação simplificado (callback aninhado → sequência linear)
  - Validação de tipo de arquivo (.xlsx, .xls)
  - Logs detalhados para debugging (📤📄📊💾✅❌)
  - Mensagens de erro em português
  - Script manual seed-production.ts criado como backup
- **2025-10-17 (Deploy Fix)**: **Importação automática de dados** no primeiro boot:
  - Script init-db.ts agora verifica se há dados no banco
  - Se banco vazio (produção), importa automaticamente os 10.836 registros do Excel
  - Resolve problema de "logou sem os dados" no deploy
  - Logs detalhados mostram progresso da importação
- **2025-10-17 (Noite - UI/UX)**: **Botão de logout** adicionado no cabeçalho institucional:
  - Botão "Sair" visível no canto direito do cabeçalho
  - Exibe nome do usuário logado
  - Logout encerra sessão e redireciona para página de login
  - Limpa cache do frontend após logout
- **2025-10-17 (Noite - Segurança)**: **Sistema de autenticação completo** implementado com Passport.js:
  - Página de login institucional com brasão oficial da Polícia Civil da Bahia
  - Proteção de todas as rotas da API com middleware de autenticação
  - Tabela de usuários no PostgreSQL com hash seguro de senhas (scrypt)
  - Sessões persistentes com PostgreSQL session store
  - Credenciais seguras: admin / PCBA@2025!Secure
  - Mensagens de erro claras no login
  - **Correção do mapa**: bolhas agora usam número de apreensões (count) ao invés de quantidade (kg), mostrando cores variadas (verde, amarelo, vermelho, preto)
- **2025-10-17 (Noite - Final)**: Correção completa da importação de dados - todos os 8 KPIs agora funcionam corretamente com dados reais extraídos das 13 colunas do Excel. Total: **10.836 apreensões válidas** (2010-2025), **1.799 com coordenadas** para o mapa
- **2025-10-17 (Tarde)**: Melhorias visuais - Timeline com AreaChart colorido, coluna "Existe Laudo?" na tabela
- **2025-10-17 (Tarde)**: Importação da planilha oficial com extração inteligente de dados, validação de datas e processamento em lotes
- **2025-10-17 (PM)**: Migração completa para PostgreSQL com Drizzle ORM. Adicionados 3 novos KPIs solicitados: Drogas em Cartório, Laudo Pericial e Destruição Concluída
- **2025-10-17 (AM)**: Implementação completa do MVP com dashboard, filtros, mapa, gráficos e upload de Excel
