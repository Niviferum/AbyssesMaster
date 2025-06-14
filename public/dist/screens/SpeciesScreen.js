import { EventBinder } from '../utils/EventBinder.js';
export class SpeciesScreen {
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
            <div id="species" class="screen species-screen">
                <video class="species-video" autoplay muted loop>
                    <source src="${animal.videoPath}" type="video/mp4">
                </video>
                
                <div class="navigation">
                    <div class="nav-icon" id="back-btn" title="Retour">
                        <img src="../../assets/buttons/retour1.png">
                    </div>
                    <div class="nav-icon" id="grid-btn" title="Grille">⊞</div>
                    <div class="nav-icon" id="info-btn" title="Fiche espèce">
                        <img src="../../assets/buttons/show1.png">
                    </div>
                    <div class="nav-icon" id="scroll-btn" title="Timeline">〜</div>
                </div>
                
            </div>
        `;
    }
    bindEvents() {
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
    goToScroll() {
        if (this.gameState.currentAnimal) {
            this.gameState.currentPeriod = this.gameState.currentAnimal.period;
        }
        this.screenManager.navigateToScreen('scroll');
    }
}
//# sourceMappingURL=SpeciesScreen.js.map