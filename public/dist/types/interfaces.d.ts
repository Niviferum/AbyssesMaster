export interface Animal {
    id: string;
    name: string;
    period: Period;
    discovered: boolean;
    videoPath: string;
    imagePath: string;
    lockImagePath: string;
    fichePath: string;
    scrollPosition: {
        x: number;
        y: number;
    };
    combination: {
        blue: number;
        yellow: number;
        red: number;
    };
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
export type Screen = 'loading' | 'home' | 'species' | 'scroll' | 'grid' | 'fiche';
export type CardColor = 'blue' | 'yellow' | 'red';
export interface GameState {
    currentScreen: Screen;
    selectedCards: Combination;
    currentAnimal: Animal | null;
    currentPeriod: Period;
    showSpeciesInfo: boolean;
    discoveredAnimals: Set<string>;
}
