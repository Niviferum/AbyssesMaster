import { Screen, GameState } from '../types/interfaces.js';
export declare class ScreenManager {
    private appElement;
    private gameState;
    constructor(appElement: HTMLElement, gameState: GameState);
    showScreen(screen: Screen): void;
    navigateToScreen(screen: Screen): void;
}
