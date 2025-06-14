import { GameState } from '../types/interfaces.js';
import { ScreenManager } from '../utils/ScreenManager.js';
export declare class SpeciesScreen {
    private appElement;
    private gameState;
    private screenManager;
    private eventBinder;
    constructor(appElement: HTMLElement, gameState: GameState, screenManager: ScreenManager);
    private render;
    private bindEvents;
    private goToScroll;
}
