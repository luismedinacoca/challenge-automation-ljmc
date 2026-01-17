import * as XLSX from 'xlsx';
import { PokemonTestData } from '../types/pokemon';

export class ExcelReader {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  readPokemonData(): PokemonTestData[] {
    try {
      const workbook = XLSX.readFile(this.filePath);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convert to JSON, exclude headers
      const data = XLSX.utils.sheet_to_json<PokemonTestData>(worksheet);
      //console.log("📊 data", data)

      // Validate that the data has the expected format
      return data.map(row => ({
        id: Number(row.id),
        name: String(row.name).toLowerCase(),
        abilities: String(row.abilities)
      }));
    } catch (error) {
      console.error('Error leyendo archivo Excel:', error);
      throw error;
    }
  }

}