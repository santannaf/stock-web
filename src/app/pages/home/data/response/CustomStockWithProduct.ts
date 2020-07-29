import { ClassificationResult } from './ClassificationResult';

export interface CustomStockWithProducts {
  id: Number;
  name: String;
  items: number;
  valueStock: Number;
  classification: ClassificationResult;
  rateConsumer: number;
}
