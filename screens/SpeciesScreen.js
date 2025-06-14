import { EventBinder } from '../utils/EventBinder.js';
export class SpeciesScreen {
    constructor(appElement, gameState, screenManager) {
        this.sonarEnabled = true;
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
                
                <div class="sonar-overlay ${this.sonarEnabled ? 'active' : 'hidden'}" id="sonar-overlay">
                    <div class="sonar-grid"></div>
                    <div class="sonar-circle sonar-circle-1"></div>
                    <div class="sonar-circle sonar-circle-2"></div>
                    <div class="sonar-circle sonar-circle-3"></div>
                    <div class="sonar-sweep"></div>
                    <div class="sonar-crosshair"></div>
                </div>
                
                <div class="navigation">
                    <div class="nav-icon" id="sonar-toggle" title="Toggle Sonar">📡</div>
                    <div class="nav-icon" id="back-btn" title="Retour">←</div>
                    <div class="nav-icon" id="grid-btn" title="Grille">⊞</div>
                    <div class="nav-icon" id="info-btn" title="Informations">👁</div>
                    <div class="nav-icon" id="scroll-btn" title="Timeline">〜</div>
                </div>
                
                ${this.renderSpeciesInfo(animal)}
            </div>
        `;
    }
    renderSpeciesInfo(animal) {
        return `
            <div id="species-info" class="species-info ${this.gameState.showSpeciesInfo ? '' : 'hidden'}">
                <div class="species-info-content">
                    <h2>${animal.name}</h2>
                    <img src="${animal.fichePath}" alt="${animal.name}" class="species-fiche">
                    <button class="close-btn" id="close-info-btn">Fermer</button>
                </div>
            </div>
        `;
    }
    bindEvents() {
        this.eventBinder.bindEvents('species', [
            {
                selector: '#sonar-toggle',
                event: 'click',
                handler: () => this.toggleSonar()
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
                selector: '#info-btn',
                event: 'click',
                handler: () => this.toggleSpeciesInfo()
            },
            {
                selector: '#scroll-btn',
                event: 'click',
                handler: () => this.goToScroll()
            },
            {
                selector: '#close-info-btn',
                event: 'click',
                handler: () => this.hideSpeciesInfo()
            }
        ]);
    }
    toggleSonar() {
        this.sonarEnabled = !this.sonarEnabled;
        const sonarOverlay = document.getElementById('sonar-overlay');
        const sonarToggle = document.getElementById('sonar-toggle');
        if (sonarOverlay && sonarToggle) {
            if (this.sonarEnabled) {
                sonarOverlay.classList.remove('hidden');
                sonarOverlay.classList.add('active');
                sonarToggle.style.opacity = '1';
            }
            else {
                sonarOverlay.classList.remove('active');
                sonarOverlay.classList.add('hidden');
                sonarToggle.style.opacity = '0.5';
            }
        }
    }
    toggleSpeciesInfo() {
        this.gameState.showSpeciesInfo = !this.gameState.showSpeciesInfo;
        const infoDiv = document.getElementById('species-info');
        infoDiv.classList.toggle('hidden');
    }
    hideSpeciesInfo() {
        this.gameState.showSpeciesInfo = false;
        const infoDiv = document.getElementById('species-info');
        infoDiv.classList.add('hidden');
    }
    goToScroll() {
        if (this.gameState.currentAnimal) {
            this.gameState.currentPeriod = this.gameState.currentAnimal.period;
        }
        this.screenManager.navigateToScreen('scroll');
    }
}
