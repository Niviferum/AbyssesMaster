import { EventBinder } from '../utils/EventBinder.js';
import { getAnimalsByPeriod, getAnimalById } from '../data/animals.js';
import { getGridPosition } from './IpadGridPositions.js';
export class GridScreen {
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
    renderPeriodTitles() {
        return `
            <div class="period-title paleozoique">Paléozoïque</div>
            <div class="period-title mesozoique">Mésozoïque</div>
            <div class="period-title cenozoique">Cénozoïque</div>
        `;
    }
    renderClickZones() {
        return `
            <div class="period-clickzone paleozoique" data-period="E1"></div>
            <div class="period-clickzone mesozoique" data-period="E2"></div>
            <div class="period-clickzone cenozoique" data-period="E3"></div>
        `;
    }
    renderAllDiscoveredAnimals() {
        let animalsHtml = '';
        // Rendu pour toutes les périodes
        animalsHtml += this.renderPeriodAnimals('E1');
        animalsHtml += this.renderPeriodAnimals('E2');
        animalsHtml += this.renderPeriodAnimals('E3');
        return animalsHtml;
    }
    renderPeriodAnimals(period) {
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
    renderPeriodAnimalsWithStoredPositions(period) {
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
    bindEvents() {
        this.eventBinder.bindEvents('grid', [
            {
                selector: '#back-btn',
                event: 'click',
                handler: () => this.screenManager.navigateToScreen('home')
            },
            {
                selector: '.period-clickzone',
                event: 'click',
                handler: (e) => this.selectPeriod(e)
            },
            {
                selector: '.grid-cell.discovered',
                event: 'click',
                handler: (e) => this.selectAnimal(e)
            }
        ]);
    }
    selectPeriod(e) {
        const period = e.currentTarget.dataset.period;
        if (period) {
            this.gameState.currentPeriod = period;
            this.screenManager.navigateToScreen('scroll');
        }
    }
    selectAnimal(e) {
        e.stopPropagation(); // Empêche la propagation vers la zone cliquable
        const animalId = e.currentTarget.dataset.animalId;
        if (animalId) {
            const animal = getAnimalById(animalId);
            if (animal && this.gameState.discoveredAnimals.has(animal.id)) {
                this.gameState.currentAnimal = animal;
                this.screenManager.navigateToScreen('species');
            }
        }
    }
}
//# sourceMappingURL=GridScreen.js.map