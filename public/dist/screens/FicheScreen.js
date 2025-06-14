import { EventBinder } from '../utils/EventBinder.js';
export class FicheScreen {
    constructor(appElement, gameState, screenManager) {
        this.appElement = appElement;
        this.gameState = gameState;
        this.screenManager = screenManager;
        this.eventBinder = EventBinder.getInstance();
        this.render();
        this.bindEvents();
    }
    render() {
        if (!this.gameState.currentAnimal)
            return;
        const animal = this.gameState.currentAnimal;
        this.appElement.innerHTML = `
            <div id="fiche" class="screen fiche-screen">
                <div class="fiche-navigation">
                    <div class="nav-icon" id="back-to-species-btn" title="Retour à l'espèce">←</div>
                    <div class="nav-icon" id="back-btn" title="Accueil">🏠</div>
                    <div class="nav-icon" id="grid-btn" title="Grille">⊞</div>
                    <div class="nav-icon" id="scroll-btn" title="Timeline">〜</div>
                </div>
                
                <img src="${animal.fichePath}" alt="${animal.name}" class="fiche-image">
            </div>
        `;
    }
    bindEvents() {
        this.eventBinder.bindEvents('fiche', [
            {
                selector: '#back-to-species-btn',
                event: 'click',
                handler: () => this.screenManager.navigateToScreen('species')
            },
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
                selector: '#scroll-btn',
                event: 'click',
                handler: () => this.goToScroll()
            }
        ]);
    }
    goToScroll() {
        if (this.gameState.currentAnimal) {
            this.gameState.currentPeriod = this.gameState.currentAnimal.period;
        }
        this.screenManager.navigateToScreen('scroll');
    }
}
//# sourceMappingURL=FicheScreen.js.map