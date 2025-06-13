import { GameState } from '../types/interfaces.js';
import { ScreenManager } from '../utils/ScreenManager.js';
import { EventBinder } from '../utils/EventBinder.js';
import { getAnimalsByPeriod, getAnimalById } from '../data/animals.js';

export class ScrollScreen {
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

    private renderAnimals(): string {
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

    private bindEvents(): void {
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
                handler: (e: Event) => this.selectAnimal(e)
            }
        ]);

        this.setupParallaxEffect();
    }

    private goBack(): void {
        if (this.gameState.currentAnimal) {
            this.screenManager.navigateToScreen('species');
        } else {
            this.screenManager.navigateToScreen('home');
        }
    }

    private selectAnimal(e: Event): void {
        const animalId = (e.currentTarget as HTMLElement).dataset.animalId;
        if (animalId) {
            const animal = getAnimalById(animalId);
            if (animal && this.gameState.discoveredAnimals.has(animal.id)) {
                this.gameState.currentAnimal = animal;
                this.screenManager.navigateToScreen('species');
            }
        }
    }

    private setupParallaxEffect(): void {
        const scrollContainer = document.querySelector('.scroll-container') as HTMLElement;
        const background = document.querySelector('.parallax-background') as HTMLElement;
        
        if (scrollContainer && background) {
            scrollContainer.addEventListener('scroll', () => {
                const scrollTop = scrollContainer.scrollTop;
                background.style.transform = `translateY(${scrollTop * 0.5}px)`;
            });
        }
    }
}