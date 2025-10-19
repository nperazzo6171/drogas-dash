# 🚀 GUIA DE DEPLOY - Dashboard Drogas Apreendidas

## ⚠️ PROBLEMA IDENTIFICADO

O banco de **produção está VAZIO** porque:
1. O arquivo Excel (`attached_assets/...`) **NÃO existe no servidor de produção**
2. A importação automática falha silenciosamente
3. Por isso o dashboard aparece vazio após o login

## ✅ SOLUÇÃO: Popular o Banco Manualmente

### Opção 1: Script Manual de Seed (RECOMENDADO)

1. **Faça o deploy normalmente**

2. **Abra o Shell do Replit** (botão "Shell" no painel)

3. **Execute o comando**:
   ```bash
   npx tsx server/seed-production.ts
   ```

4. **Aguarde a importação** (~30 segundos):
   ```
   🌱 Starting production seed...
   📂 Reading Excel file...
   📊 Processing 13910 rows...
   📥 Inserting 10836 records in batches...
      ✓ 500 / 10836
      ✓ 1000 / 10836
      ...
      ✓ 10836 / 10836
   ✅ Successfully imported 10836 records!
   ```

5. **Recarregue o dashboard** - Agora deve aparecer os dados!

### Opção 2: Upload Manual via Interface

1. **Faça login** com admin / PCBA@2025!Secure

2. **Clique em "Upload Excel"**

3. **Selecione o arquivo**: `APREENSÃO DROGAS COMPILADO dash_1760700427240.xlsx`

4. **Aguarde o processamento**

5. **Recarregue a página**

## 🔍 VERIFICAÇÃO

Após popular o banco, verifique:

```bash
# No Shell do Replit:
npx tsx -e "import {db} from './server/db.js'; import {sql} from 'drizzle-orm'; db.execute(sql\`SELECT COUNT(*) FROM drug_seizures\`).then(r => console.log('Registros:', r.rows[0]))"
```

Deve retornar: `Registros: { count: '10836' }`

## 📝 LOGS IMPORTANTES

### Logs do Primeiro Boot (com arquivo Excel)
```
🔧 Initializing database...
📂 Importing seizure data from Excel...
📊 Processing 13910 rows...
📥 Inserting 10836 records...
✅ Successfully imported 10836 records!
```

### Logs do Primeiro Boot (SEM arquivo Excel)
```
🔧 Initializing database...
📂 Importing seizure data from Excel...
❌ Excel file not found: attached_assets/...
⚠️  Skipping data import - file not available
```
👆 **Se vir isso, use o script manual!**

## 🐛 TROUBLESHOOTING

### Dashboard vazio após login?
→ Execute: `npx tsx server/seed-production.ts`

### Erro no upload?
→ Verifique se o arquivo é .xlsx ou .xls válido
→ Veja os logs do servidor para detalhes

### Usuário admin não existe?
→ Reinicie o servidor - ele cria automaticamente

### Como resetar tudo?
```bash
# CUIDADO: Apaga todos os dados!
npx tsx -e "import {db} from './server/db.js'; import {drugSeizures} from './shared/schema.js'; db.delete(drugSeizures).then(() => console.log('Deletado!'))"

# Depois re-importe:
npx tsx server/seed-production.ts
```

## ✅ CHECKLIST DE DEPLOY

- [ ] 1. Fazer deploy no Replit
- [ ] 2. Aguardar servidor iniciar
- [ ] 3. Verificar logs: "✅ Admin user created"
- [ ] 4. Abrir Shell e executar: `npx tsx server/seed-production.ts`
- [ ] 5. Aguardar importação completa
- [ ] 6. Fazer login: admin / PCBA@2025!Secure
- [ ] 7. Verificar dashboard com 10.836 registros
- [ ] 8. Testar upload de Excel
- [ ] 9. Testar logout e re-login
- [ ] 10. ✅ DEPLOY COMPLETO!

## 📞 SUPORTE

Se ainda houver problemas:
1. **Copie os logs** completos do servidor
2. **Tire um print** do erro
3. **Descreva** o que fez passo a passo
