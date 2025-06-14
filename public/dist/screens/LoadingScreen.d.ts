import { GameState } from '../types/interfaces.js';
import { ScreenManager } from '../utils/ScreenManager.js';
export declare class LoadingScreen {
    private appElement;
    private gameState;
    private screenManager;
    private keyboardListener;
    constructor(appElement: HTMLElement, gameState: GameState, screenManager: ScreenManager);
    private render;
    private bindEvents;
    private handleKeyPress;
    private skipVideo;
    private cleanup;
}
