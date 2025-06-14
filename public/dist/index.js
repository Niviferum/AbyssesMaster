import { ScreenManager } from './utils/ScreenManager.js';
import { ANIMALS_DATA } from './data/animals.js';
class EvolutionApp {
    constructor() {
        this.initializeGameState();
        this.initializeApp();
    }
    initializeGameState() {
        this.gameState = {
            currentScreen: 'loading',
            selectedCards: { blue: 0, yellow: 0, red: 0 },
            currentAnimal: null,
            currentPeriod: 'E1',
            showSpeciesInfo: false,
            discoveredAnimals: new Set()
        };
    }
    initializeApp() {
        const appElement = document.getElementById('app');
        if (!appElement) {
            throw new Error('App element not found');
        }
        this.screenManager = new ScreenManager(appElement, this.gameState);
        this.loadAssets().then(() => {
            this.screenManager.showScreen('loading');
        });
    }
    async loadAssets() {
        console.log('Chargement des assets...');
        console.log(`${ANIMALS_DATA.length} animaux chargés`);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new EvolutionApp();
});
//# sourceMappingURL=index.js.map