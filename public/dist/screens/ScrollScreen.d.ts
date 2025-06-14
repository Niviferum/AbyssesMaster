import { GameState } from '../types/interfaces.js';
import { ScreenManager } from '../utils/ScreenManager.js';
export declare class ScrollScreen {
    private appElement;
    private gameState;
    private screenManager;
    private eventBinder;
    constructor(appElement: HTMLElement, gameState: GameState, screenManager: ScreenManager);
    private render;
    private renderAnimals;
    private bindEvents;
    private goBack;
    private selectAnimal;
    private setupParallaxEffect;
}
