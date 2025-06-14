import { GameState } from '../types/interfaces.js';
import { ScreenManager } from '../utils/ScreenManager.js';
export declare class HomeScreen {
    private appElement;
    private gameState;
    private screenManager;
    private eventBinder;
    constructor(appElement: HTMLElement, gameState: GameState, screenManager: ScreenManager);
    private render;
    private renderCardSlot;
    private bindEvents;
    private cycleCard;
    private validateCombination;
}
