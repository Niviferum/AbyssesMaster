import { EventBinder } from '../utils/EventBinder.js';
import { getAnimalsByPeriod, getAnimalById } from '../data/animals.js';
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
            <div id="grid" class="screen grid-screen">
                <div class="grid-navigation">
                    <div class="nav-icon" id="back-btn" title="Retour">←</div>
                </div>
                <div class="grid-container">
                    <div class="periods-layout">
                        ${this.renderPeriodCells('E1', 'paleozoique')}
                        ${this.renderPeriodCells('E2', 'mesozoique')}
                        ${this.renderPeriodCells('E3', 'cenozoique')}
                        ${this.renderClickZones()}
                    </div>
                </div>
            </div>
        `;
    }
    renderPeriodCells(period, periodClass) {
        const animals = getAnimalsByPeriod(period);
        let cellsHtml = '';
        // Génère uniquement les cellules pour les animaux découverts
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
                             class="grid-cell-image"
                             style="width: 100%; height: 100%; object-fit: contain;">
                    </div>
                `;
            }
        });
        return cellsHtml;
    }
    renderClickZones() {
        return `
            <div class="period-clickzone paleozoique" data-period="E1"></div>
            <div class="period-clickzone mesozoique" data-period="E2"></div>
            <div class="period-clickzone cenozoique" data-period="E3"></div>
        `;
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
                selector: '.grid-cell',
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