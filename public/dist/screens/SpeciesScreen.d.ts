import { GameState } from '../types/interfaces.js';
import { ScreenManager } from '../utils/ScreenManager.js';
export declare class SpeciesScreen {
    private appElement;
    private gameState;
    private screenManager;
    private eventBinder;
    private sonarEnabled;
    constructor(appElement: HTMLElement, gameState: GameState, screenManager: ScreenManager);
    private render;
    private renderSpeciesInfo;
    private bindEvents;
    private toggleSonar;
    private toggleSpeciesInfo;
    private hideSpeciesInfo;
    private goToScroll;
}
