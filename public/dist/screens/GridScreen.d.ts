import { GameState } from '../types/interfaces.js';
import { ScreenManager } from '../utils/ScreenManager.js';
export declare class GridScreen {
    private appElement;
    private gameState;
    private screenManager;
    private eventBinder;
    constructor(appElement: HTMLElement, gameState: GameState, screenManager: ScreenManager);
    private render;
    private renderPeriodTitles;
    private renderClickZones;
    private renderAllDiscoveredAnimals;
    private renderPeriodAnimals;
    private renderPeriodAnimalsWithStoredPositions;
    private bindEvents;
    private selectPeriod;
    private selectAnimal;
}
