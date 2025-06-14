import { EventBinder } from '../utils/EventBinder.js';
import { CARD_OPTIONS, CARD_LABELS } from '../data/cards.js';
import { findAnimalByCombination } from '../data/animals.js';
export class HomeScreen {
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
            <div id="home" class="screen home-screen">
                <div class="navigation">
                    <div class="nav-icon" id="grid-btn" title="Grille">⊞</div>
                    <div class="nav-icon" id="scroll-btn" title="Timeline">〜</div>
                </div>
                <h1 class="main-title">Combinatoire Évolutive</h1>
                <div class="cards-container">
                    ${this.renderCardSlot('blue')}
                    ${this.renderCardSlot('yellow')}
                    ${this.renderCardSlot('red')}
                </div>

                <button class="validate-btn" id="validate-btn">Rechercher</button>
            </div>
        `;
    }
    renderCardSlot(color) {
        const currentCard = CARD_OPTIONS[color][this.gameState.selectedCards[color]];
        return `
            <div class="card-slot-container">
                <div class="card-slot ${color}" data-color="${color}">
                    <img src="${currentCard.image}" alt="${currentCard.name}" class="card-image" />
                </div>
                <div class="card-info">
                    <div class="card-label">${CARD_LABELS[color]}</div>
                    <div class="card-name" id="${color}-card">${currentCard.name}</div>
                </div>
            </div>
        `;
    }
    bindEvents() {
        this.eventBinder.bindEvents('home', [
            {
                selector: '.card-slot',
                event: 'click',
                handler: (e) => {
                    const color = e.currentTarget.dataset.color;
                    this.cycleCard(color);
                }
            },
            {
                selector: '#validate-btn',
                event: 'click',
                handler: () => this.validateCombination()
            },
            {
                selector: '#grid-btn',
                event: 'click',
                handler: () => this.screenManager.navigateToScreen('grid')
            },
            {
                selector: '#scroll-btn',
                event: 'click',
                handler: () => this.screenManager.navigateToScreen('scroll')
            }
        ]);
    }
    cycleCard(color) {
        const maxIndex = CARD_OPTIONS[color].length - 1;
        this.gameState.selectedCards[color] =
            this.gameState.selectedCards[color] >= maxIndex ? 0 : this.gameState.selectedCards[color] + 1;
        const currentCard = CARD_OPTIONS[color][this.gameState.selectedCards[color]];
        // Mettre à jour l'image
        const cardSlot = document.querySelector(`.card-slot[data-color="${color}"]`);
        const cardImage = cardSlot?.querySelector('.card-image');
        if (cardImage) {
            cardImage.src = currentCard.image;
            cardImage.alt = currentCard.name;
        }
        // Mettre à jour le nom
        const cardElement = document.getElementById(`${color}-card`);
        cardElement.textContent = currentCard.name;
    }
    validateCombination() {
        const combination = {
            blue: this.gameState.selectedCards.blue + 1,
            yellow: this.gameState.selectedCards.yellow + 1,
            red: this.gameState.selectedCards.red + 1
        };
        const foundAnimal = findAnimalByCombination(combination);
        if (foundAnimal) {
            foundAnimal.discovered = true;
            this.gameState.discoveredAnimals.add(foundAnimal.id);
            this.gameState.currentAnimal = foundAnimal;
            this.screenManager.navigateToScreen('species');
        }
        else {
            console.log('Aucun animal trouvé pour cette combinaison:', combination);
        }
    }
}
//# sourceMappingURL=HomeScreen.js.map