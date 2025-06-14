import { EventBinder } from '../utils/EventBinder.js';
import { getAnimalsByPeriod, getAnimalById } from '../data/animals.js';
export class ScrollScreen {
    constructor(appElement, gameState, screenManager) {
        this.appElement = appElement;
        this.gameState = gameState;
        this.screenManager = screenManager;
        this.eventBinder = EventBinder.getInstance();
        this.render();
        this.bindEvents();
    }
    render() {
        this.appElement.innerHTML = `
            <div id="scroll" class="screen scroll-screen">
                <div class="scroll-navigation">
                    <div class="nav-icon" id="back-btn" title="Retour">←</div>
                    <div class="nav-icon" id="grid-btn" title="Grille">⊞</div>
                </div>
                <div class="scroll-container">
                    <div class="parallax-background" 
                         style="background-image: url('assets/decors/${this.gameState.currentPeriod}_bg.jpg')">
                    </div>
                    <div class="animals-layer" id="animals-layer">
                        ${this.renderAnimals()}
                    </div>
                </div>
                <div class="period-indicator">
                    <h2>Période ${this.gameState.currentPeriod}</h2>
                </div>
            </div>
        `;
    }
    renderAnimals() {
        const periodAnimals = getAnimalsByPeriod(this.gameState.currentPeriod)
            .filter(animal => this.gameState.discoveredAnimals.has(animal.id));
        return periodAnimals.map(animal => `
            <div class="scroll-animal" 
                 data-animal-id="${animal.id}"
                 style="left: ${animal.scrollPosition.x}px; top: ${animal.scrollPosition.y}px;">
                <img src="${animal.imagePath}" alt="${animal.name}" class="animal-image">
                <div class="animal-name">${animal.name}</div>
            </div>
        `).join('');
    }
    bindEvents() {
        this.eventBinder.bindEvents('scroll', [
            {
                selector: '#back-btn',
                event: 'click',
                handler: () => this.goBack()
            },
            {
                selector: '#grid-btn',
                event: 'click',
                handler: () => this.screenManager.navigateToScreen('grid')
            },
            {
                selector: '.scroll-animal',
                event: 'click',
                handler: (e) => this.selectAnimal(e)
            }
        ]);
        this.setupParallaxEffect();
    }
    goBack() {
        if (this.gameState.currentAnimal) {
            this.screenManager.navigateToScreen('species');
        }
        else {
            this.screenManager.navigateToScreen('home');
        }
    }
    selectAnimal(e) {
        const animalId = e.currentTarget.dataset.animalId;
        if (animalId) {
            const animal = getAnimalById(animalId);
            if (animal && this.gameState.discoveredAnimals.has(animal.id)) {
                this.gameState.currentAnimal = animal;
                this.screenManager.navigateToScreen('species');
            }
        }
    }
    setupParallaxEffect() {
        const scrollContainer = document.querySelector('.scroll-container');
        const background = document.querySelector('.parallax-background');
        if (scrollContainer && background) {
            scrollContainer.addEventListener('scroll', () => {
                const scrollTop = scrollContainer.scrollTop;
                background.style.transform = `translateY(${scrollTop * 0.5}px)`;
            });
        }
    }
}
//# sourceMappingURL=ScrollScreen.js.map