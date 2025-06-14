import { GameState } from '../types/interfaces.js';
import { ScreenManager } from '../utils/ScreenManager.js';
import { EventBinder } from '../utils/EventBinder.js';

export class SpeciesScreen {
    private appElement: HTMLElement;
    private gameState: GameState;
    private screenManager: ScreenManager;
    private eventBinder: EventBinder;

    constructor(appElement: HTMLElement, gameState: GameState, screenManager: ScreenManager) {
        this.appElement = appElement;
        this.gameState = gameState;
        this.screenManager = screenManager;
        this.eventBinder = EventBinder.getInstance();
        this.render();
        this.bindEvents();
    }

    private render(): void {
        if (!this.gameState.currentAnimal) return;

        const animal = this.gameState.currentAnimal;
        this.appElement.innerHTML = `
            <div id="species" class="screen species-screen">
                <video class="species-video" autoplay muted loop>
                    <source src="${animal.videoPath}" type="video/mp4">
                </video>
                
                <div class="navigation">
                    <div class="nav-icon" id="back-btn" title="Retour">←</div>
                    <div class="nav-icon" id="grid-btn" title="Grille">⊞</div>
                    <div class="nav-icon" id="info-btn" title="Fiche espèce">📋</div>
                    <div class="nav-icon" id="scroll-btn" title="Timeline">〜</div>
                </div>
            </div>
        `;
    }

    private bindEvents(): void {
        this.eventBinder.bindEvents('species', [
            {
                selector: '#back-btn',
                event: 'click',
                handler: () => this.screenManager.navigateToScreen('home')
            },
            {
                selector: '#grid-btn',
                event: 'click',
                handler: () => this.screenManager.navigateToScreen('grid')
            },
            {
                selector: '#info-btn',
                event: 'click',
                handler: () => this.screenManager.navigateToScreen('fiche')
            },
            {
                selector: '#scroll-btn',
                event: 'click',
                handler: () => this.goToScroll()
            }
        ]);
    }

    private goToScroll(): void {
        if (this.gameState.currentAnimal) {
            this.gameState.currentPeriod = this.gameState.currentAnimal.period;
        }
        this.screenManager.navigateToScreen('scroll');
    }
}