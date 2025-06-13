import { Screen, GameState } from '../types/interfaces.js';
import { LoadingScreen } from '../screens/LoadingScreen.js';
import { HomeScreen } from '../screens/HomeScreen.js';
import { SpeciesScreen } from '../screens/SpeciesScreen.js';
import { ScrollScreen } from '../screens/ScrollScreen.js';
import { GridScreen } from '../screens/GridScreen.js';

export class ScreenManager {
    private appElement: HTMLElement;
    private gameState: GameState;

    constructor(appElement: HTMLElement, gameState: GameState) {
        this.appElement = appElement;
        this.gameState = gameState;
    }

    showScreen(screen: Screen): void {
        this.gameState.currentScreen = screen;
        
        switch (screen) {
            case 'loading':
                new LoadingScreen(this.appElement, this.gameState, this);
                break;
            case 'home':
                new HomeScreen(this.appElement, this.gameState, this);
                break;
            case 'species':
                new SpeciesScreen(this.appElement, this.gameState, this);
                break;
            case 'scroll':
                new ScrollScreen(this.appElement, this.gameState, this);
                break;
            case 'grid':
                new GridScreen(this.appElement, this.gameState, this);
                break;
        }
    }

    navigateToScreen(screen: Screen): void {
        this.showScreen(screen);
    }
}