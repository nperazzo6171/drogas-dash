import XLSX from 'xlsx';

const wb = XLSX.readFile('attached_assets/APREENSÃO DROGAS COMPILADO dash_1760700427240.xlsx');
const ws = wb.Sheets[wb.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[];

console.log('📊 COLUNAS DO EXCEL:');
console.log(data[0]);

console.log('\n📋 Primeiras 5 linhas de dados:');
for (let i = 1; i <= 5; i++) {
  if (data[i]) {
    console.log(`\nLinha ${i}:`);
    const headers = data[0] as string[];
    const row = data[i] as any[];
    headers.forEach((header, idx) => {
      if (row[idx]) {
        console.log(`  ${header}: ${row[idx]}`);
      }
    });
  }
}
