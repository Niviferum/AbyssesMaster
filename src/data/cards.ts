import { CardOption } from '../types/interfaces.js';

export const CARD_OPTIONS = {
    blue: [
        { id: 0, name: 'Zone Littorale', image: 'assets/cards/blue_littorale.png' },
        { id: 1, name: 'Zone Mésale', image: 'assets/cards/blue_mesale.png' },
        { id: 2, name: 'Zone Bathyale', image: 'assets/cards/blue_bathyale.png' },
        { id: 3, name: 'Zone Abyssale', image: 'assets/cards/blue_abyssale.png' },
    ] as CardOption[],
    
    yellow: [
        { id: 0, name: 'Paléozoique', image: 'assets/cards/yellow_paleo.png' },
        { id: 1, name: 'Mésozoïque', image: 'assets/cards/yellow_meso.png' },
        { id: 2, name: 'Cénozoïque', image: 'assets/cards/yellow_ceno.png' }
    ] as CardOption[],
    
    red: [
        { id: 0, name: 'Vertebré', image: 'assets/cards/red_vertebre.png' },
        { id: 1, name: 'Mollusque', image: 'assets/cards/red_mollusque.png' },
        { id: 2, name: 'Arthropode', image: 'assets/cards/red_arthropode.png' }
    ] as CardOption[]
};

export const CARD_LABELS = {
    blue: 'Profondeur',
    yellow: 'Période Evolutive',
    red: 'Morphologie'
};