import { GameState } from './types/interfaces.js';
import { ScreenManager } from './utils/ScreenManager.js';
import { ANIMALS_DATA } from './data/animals.js';

class EvolutionApp {
    private gameState!: GameState;
    private screenManager!: ScreenManager;

    constructor() {
        this.initializeGameState();
        this.initializeApp();
    }

    private initializeGameState(): void {
        this.gameState = {
            currentScreen: 'loading',
            selectedCards: { blue: 0, yellow: 0, red: 0 },
            currentAnimal: null,
            currentPeriod: 'E1',
            showSpeciesInfo: false,
            discoveredAnimals: new Set<string>()
        };
    }

    private initializeApp(): void {
        const appElement = document.getElementById('app');
        if (!appElement) {
            throw new Error('App element not found');
        }

        this.screenManager = new ScreenManager(appElement, this.gameState);
        this.loadAssets().then(() => {
            this.screenManager.showScreen('loading');
        });
    }

    private async loadAssets(): Promise<void> {
        console.log('Chargement des assets...');
        console.log(`${ANIMALS_DATA.length} animaux chargés`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new EvolutionApp();
});