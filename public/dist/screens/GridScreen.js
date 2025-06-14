import { EventBinder } from '../utils/EventBinder.js';
import { getAnimalsByPeriod, getAnimalById } from '../data/animals.js';
export class GridScreen {
    constructor(appElement, gameState, screenManager) {
        // Configuration de la grille : 3 colonnes × 4 lignes = 12 cellules par période
        this.GRID_COLS = 3;
        this.GRID_ROWS = 4;
        this.CELLS_PER_PERIOD = this.GRID_COLS * this.GRID_ROWS;
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
                        ${this.renderPeriodColumn('E1', 'Paléozoïque')}
                        ${this.renderPeriodColumn('E2', 'Mésozoïque')}
                        ${this.renderPeriodColumn('E3', 'Cénozoïque')}
                    </div>
                </div>
            </div>
        `;
    }
    renderPeriodColumn(period, title) {
        const animals = getAnimalsByPeriod(period);
        return `
            <div class="period-column">
                <h2 class="period-title">${title}</h2>
                <div class="period-grid" data-period="${period}">
                    ${this.renderGridCells(animals)}
                </div>
            </div>
        `;
    }
    renderGridCells(animals) {
        let cellsHtml = '';
        // Génère exactement 12 cellules (3×4) pour chaque période
        for (let i = 0; i < this.CELLS_PER_PERIOD; i++) {
            const animal = animals[i]; // undefined si pas assez d'animaux
            if (animal) {
                const isDiscovered = this.gameState.discoveredAnimals.has(animal.id);
                cellsHtml += this.renderAnimalCell(animal, isDiscovered);
            }
            else {
                // Cellule vide pour maintenir la structure de la grille
                cellsHtml += `<div class="grid-cell empty"></div>`;
            }
        }
        return cellsHtml;
    }
    renderAnimalCell(animal, isDiscovered) {
        if (isDiscovered) {
            return `
            <div class="grid-cell discovered" data-animal-id="${animal.id}">
                <img src="${animal.imagePath}" alt="${animal.name}" class="grid-cell-image">
            </div>
        `;
        }
        else {
            // Utilise l'image de lock dédiée au lieu du cadenas et de la silhouette
            return `
            <div class="grid-cell locked" data-animal-id="${animal.id}">
                <img src="${animal.lockImagePath}" alt="Animal verrouillé" class="grid-cell-image">
            </div>
        `;
        }
    }
    bindEvents() {
        this.eventBinder.bindEvents('grid', [
            {
                selector: '#back-btn',
                event: 'click',
                handler: () => this.screenManager.navigateToScreen('home')
            },
            {
                selector: '.period-grid',
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
        const target = e.target;
        // Vérifie si le clic est sur la grille elle-même (pas sur une cellule)
        if (target.classList.contains('period-grid')) {
            const period = target.dataset.period;
            if (period) {
                this.gameState.currentPeriod = period;
                this.screenManager.navigateToScreen('scroll');
            }
        }
    }
    selectAnimal(e) {
        e.stopPropagation(); // Empêche la propagation vers le selectPeriod
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