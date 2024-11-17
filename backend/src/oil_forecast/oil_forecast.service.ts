import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import OpenAI from 'openai';
import * as fs from 'fs';
import * as Papa from 'papaparse';

@Injectable()
export class OilForecastService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async parseCsv(filePath: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      try {
        const csvContent = fs.readFileSync(filePath, 'utf-8');
        const parsed = Papa.parse(csvContent, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          delimiter: ',',
        });

        if (parsed.errors.length > 0) {
          reject(
            new Error('Error parsing CSV file: Malformed or unexpected format'),
          );
        }

        resolve(parsed.data);
      } catch (error) {
        reject(new Error('Error parsing CSV file: ' + error.message));
      }
    });
  }

  async generateForecast(filePath: string): Promise<string> {
    const csvData = await this.parseCsv(filePath);
    const sampleData = csvData.slice(0, 50);

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `
            На основе предоставленных данных составь прогноз на следующий год по дням (всего должно быть 365 дней): 
            увеличится или сократится добыча нефти, в данных прогноза в виде таблицы должны быть указаны:
            date_fact: Дата 
            debit: Добыча нефти 
            ee_consume: Потребление энергии 
            pump_operating: Часы работы скважины
            well: Идентификатор скважины
            expenses: Расходы
            Учитывайте следующие параметры: дата, добыча нефти (debit), потребление энергии (ee_consume), часы работы скважины 
            (pump_operating), расходы (expenses), в ответе отдай только данные в виде json, не используй 
            какие либо слова в ответе
            `,
          },
          {
            role: 'user',
            content: `Данные для анализа:\n\n${Papa.unparse(sampleData)}.`,
          },
        ],
        max_tokens: 2000,
      });

      const forecastCSV = completion.choices[0].message?.content;
      if (!forecastCSV) {
        throw new Error('No response from ChatGPT');
      }

      return forecastCSV;
    } catch (error) {
      throw new HttpException(
        `Error generating forecast: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async csvToJson(csvContent: string): Promise<any[]> {
    const parsed = Papa.parse(csvContent, {
      header: true,
      dynamicTyping: true,
    });

    if (parsed.errors.length > 0) {
      throw new Error('Error parsing forecast CSV to JSON');
    }

    return parsed.data;
  }
}
