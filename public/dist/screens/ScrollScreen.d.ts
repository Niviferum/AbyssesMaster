import { GameState } from '../types/interfaces.js';
import { ScreenManager } from '../utils/ScreenManager.js';
declare global {
    interface Window {
        jQuery: any;
        $: any;
    }
}
export declare class ScrollScreen {
    private appElement;
    private gameState;
    private screenManager;
    private eventBinder;
    private jqueryLoaded;
    constructor(appElement: HTMLElement, gameState: GameState, screenManager: ScreenManager);
    private loadParallaxHTML;
    private loadJQuery;
    private loadLocalParallaxPlugin;
    private getPeriodMapping;
    private integrateParallaxHTML;
    private exposeNavigationFunctions;
    private fixAssetPaths;
    private loadParallaxStyles;
    private executeParallaxScripts;
    private renderFallback;
    private bindEvents;
    private bindParallaxEvents;
    private selectAnimalFromParallax;
    private goBack;
    cleanup(): void;
}
