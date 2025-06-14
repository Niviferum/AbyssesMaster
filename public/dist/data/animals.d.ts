import { Animal } from '../types/interfaces.js';
export declare const ANIMALS_DATA: Animal[];
export declare function getAnimalsByPeriod(period: string): Animal[];
export declare function getAnimalById(id: string): Animal | undefined;
export declare function findAnimalByCombination(combination: any): Animal | undefined;
