export interface Animal {
    id: string;
    name: string;
    period: Period;
    discovered: boolean;
    videoPath: string;
    imagePath: string;
    fichePath: string;
    scrollPosition: Position;
    combination: Combination;
    gridPosition?: GridPosition; // Ajouté pour les positions dans la grille
}

export interface CardOption {
    id: number;
    name: string;
    image: string;
}

export interface Position {
    x: number;
    y: number;
}

export interface GridPosition {
    left: number;
    top: number;
    width: number;
    height: number;
}

export interface Combination {
    blue: number;
    yellow: number;
    red: number;
}

export type Period = 'E1' | 'E2' | 'E3';
export type Screen = 'loading' | 'home' | 'species' | 'scroll' | 'grid';
export type CardColor = 'blue' | 'yellow' | 'red';

export interface GameState {
    currentScreen: Screen;
    selectedCards: Combination;
    currentAnimal: Animal | null;
    currentPeriod: Period;
    showSpeciesInfo: boolean;
    discoveredAnimals: Set<string>;
}