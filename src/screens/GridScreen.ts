import { GameState, Period } from '../types/interfaces.js';
import { ScreenManager } from '../utils/ScreenManager.js';
import { EventBinder } from '../utils/EventBinder.js';
import { getAnimalsByPeriod, getAnimalById } from '../data/animals.js'; 
import { getGridPosition } from './IpadGridPositions.js'; 

export class GridScreen {
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
            <div id="grid" class="screen" 
                 style="display: flex; justify-content: center; align-items: center; width: 100vw; height: 100vh;">
                <div class="grid-screen" style="width: 85%; aspect-ratio: 16/9;">
                    <div class="grid-navigation">
                        <div class="nav-icon" id="back-btn" title="Retour">←</div>
                    </div>
                    <div class="grid-container">
                        <div class="periods-layout">

                            ${this.renderClickZones()}
                            ${this.renderAllDiscoveredAnimals()}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    private renderPeriodTitles(): string {
        return `
            <div class="period-title paleozoique">Paléozoïque</div>
            <div class="period-title mesozoique">Mésozoïque</div>
            <div class="period-title cenozoique">Cénozoïque</div>
        `;
    }

    private renderClickZones(): string {
        return `
            <div class="period-clickzone paleozoique" data-period="E1"></div>
            <div class="period-clickzone mesozoique" data-period="E2"></div>
            <div class="period-clickzone cenozoique" data-period="E3"></div>
        `;
    }

    private renderAllDiscoveredAnimals(): string {
        let animalsHtml = '';
        
        // Rendu pour toutes les périodes
        animalsHtml += this.renderPeriodAnimals('E1');
        animalsHtml += this.renderPeriodAnimals('E2');
        animalsHtml += this.renderPeriodAnimals('E3');
        
        return animalsHtml;
    }

    private renderPeriodAnimals(period: Period): string {
        const animals = getAnimalsByPeriod(period);
        let cellsHtml = '';
        
        animals.forEach((animal, index) => {
            if (this.gameState.discoveredAnimals.has(animal.id)) {
                // Calculer la position basée sur l'index de l'animal dans la période
                const row = Math.floor(index / 3) + 1; // 1-4
                const col = (index % 3) + 1; // 1-3
                const pos = getGridPosition(period, row, col);
                
                if (pos) {
                    cellsHtml += `
                        <div class="grid-cell discovered" 
                             data-animal-id="${animal.id}"
                             data-period="${period}"
                             style="left: ${pos.left}px; 
                                    top: ${pos.top}px; 
                                    width: ${pos.width}px; 
                                    height: ${pos.height}px;">
                            <img src="${animal.imagePath}" 
                                 alt="${animal.name}" 
                                 class="grid-cell-image">
                        </div>
                    `;
                }
            }
        });
        
        return cellsHtml;
    }

    // Version alternative si vos animaux ont déjà gridPosition défini
    private renderPeriodAnimalsWithStoredPositions(period: Period): string {
        const animals = getAnimalsByPeriod(period);
        let cellsHtml = '';
        
        animals.forEach((animal) => {
            if (this.gameState.discoveredAnimals.has(animal.id) && animal.gridPosition) {
                const pos = animal.gridPosition;
                
                cellsHtml += `
                    <div class="grid-cell discovered" 
                         data-animal-id="${animal.id}"
                         data-period="${period}"
                         style="left: ${pos.left}px; 
                                top: ${pos.top}px; 
                                width: ${pos.width}px; 
                                height: ${pos.height}px;">
                        <img src="${animal.imagePath}" 
                             alt="${animal.name}" 
                             class="grid-cell-image">
                    </div>
                `;
            }
        });
        
        return cellsHtml;
    }

    private bindEvents(): void {
        this.eventBinder.bindEvents('grid', [
            {
                selector: '#back-btn',
                event: 'click',
                handler: () => this.screenManager.navigateToScreen('home')
            },
            {
                selector: '.period-clickzone',
                event: 'click',
                handler: (e: Event) => this.selectPeriod(e)
            },
            {
                selector: '.grid-cell.discovered',
                event: 'click',
                handler: (e: Event) => this.selectAnimal(e)
            }
        ]);
    }

    private selectPeriod(e: Event): void {
        const period = (e.currentTarget as HTMLElement).dataset.period as Period;
        if (period) {
            this.gameState.currentPeriod = period;
            this.screenManager.navigateToScreen('scroll');
        }
    }

    private selectAnimal(e: Event): void {
        e.stopPropagation(); // Empêche la propagation vers la zone cliquable
        
        const animalId = (e.currentTarget as HTMLElement).dataset.animalId;
        if (animalId) {
            const animal = getAnimalById(animalId);
            if (animal && this.gameState.discoveredAnimals.has(animal.id)) {
                this.gameState.currentAnimal = animal;
                this.screenManager.navigateToScreen('species');
            }
        }
    }
}