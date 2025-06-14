// Types pour les positions
interface Position {
    left: number;
    top: number;
    width: number;
    height: number;
}

interface PeriodGrid {
    [key: string]: Position;
}

interface GridPositions {
    paleozoique: PeriodGrid;
    mesozoique: PeriodGrid;
    cenozoique: PeriodGrid;
}

// Points d'ancrage corrigés pour iPad Pro 1366x1024
// Cellule 105x105px, bordure 13px, espacement grilles 80px
const IPAD_GRID_POSITIONS: GridPositions = {
    // Grille Paléozoïque (gauche) - Point de référence: 150x190
    paleozoique: {
        // Rangée 1
        cell_1_1: { left: 50, top: 65, width: 93, height: 92 },   // ✅ Parfait
        cell_1_2: { left: 147, top: 65, width: 93, height: 92 },  // ✅ Parfait  
        cell_1_3: { left: 244, top: 65, width: 93, height: 92 },  // Calculé: 145 + 95 = 240
        
        // Rangée 2 (votre position corrigée + calculs)
        cell_2_1: { left: 50, top: 163, width: 93, height: 92 },  // ✅ Parfait
        cell_2_2: { left: 147, top: 163, width: 93, height: 92 }, // Calculé: même colonne que 1_2
        cell_2_3: { left: 244, top: 163, width: 93, height: 92 }, // Calculé: même colonne que 1_3
        
        // Rangée 3 (espacement normal: 97px)
        cell_3_1: { left: 50, top: 261, width: 93, height: 92 },  // Calculé: 162 + 97 = 259
        cell_3_2: { left: 147, top: 261, width: 93, height: 92 },
        cell_3_3: { left: 244, top: 261, width: 93, height: 92 },
        
        // Rangée 4 (avec bordure spéciale de 50px: 259 + 92 + 50 = 401)
        cell_4_1: { left: 50, top: 359, width: 93, height: 92 },  // ⭐ Animal 10
        cell_4_2: { left: 147, top: 359, width: 93, height: 92 },
        cell_4_3: { left: 244, top: 359, width: 93, height: 92 }
    },
    
    // Grille Mésozoïque (centre) - Décalage: 3×105 + 2×13 + 80 = 421px
    mesozoique: {
        // Rangée 1
        cell_1_1: { left: 385, top: 65, width: 93, height: 92 },
        cell_1_2: { left: 482, top: 65, width: 93, height: 92 },
        cell_1_3: { left: 579, top: 65, width: 93, height: 92 },
        
        // Rangée 2
        cell_2_1: { left: 385, top: 163, width: 93, height: 92 },
        cell_2_2: { left: 482, top: 163, width: 93, height: 92 },
        cell_2_3: { left: 579, top: 163, width: 93, height: 92 },
        
        // Rangée 3
        cell_3_1: { left: 385, top: 261, width: 93, height: 92 },
        cell_3_2: { left: 482, top: 261, width: 93, height: 92 },
        cell_3_3: { left: 579, top: 261, width: 93, height: 92 },
        
        // Rangée 4
        cell_4_1: { left: 385, top: 359, width: 93, height: 92 },
        cell_4_2: { left: 482, top: 359, width: 93, height: 92 },
        cell_4_3: { left: 579, top: 359, width: 93, height: 92 }
    },
    
    // Grille Cénozoïque (droite) - Décalage: 2×421 = 842px depuis le début
    cenozoique: {
        // Rangée 1
        cell_1_1: { left: 720, top: 65, width: 93, height: 92 },
        cell_1_2: { left: 817, top: 65, width: 93, height: 92 },
        cell_1_3: { left: 914, top: 65, width: 93, height: 92 },
        
        // Rangée 2
        cell_2_1: { left: 720, top: 163, width: 93, height: 92 },
        cell_2_2: { left: 817, top: 163, width: 93, height: 92 },
        cell_2_3: { left: 914, top: 163, width: 93, height: 92 },
        
        // Rangée 3
        cell_3_1: { left: 720, top: 261, width: 93, height: 92 },
        cell_3_2: { left: 817, top: 261, width: 93, height: 92 },
        cell_3_3: { left: 914, top: 261, width: 93, height: 92 },
        
        // Rangée 4
        cell_4_1: { left: 720, top: 359, width: 93, height: 92 },
        cell_4_2: { left: 817, top: 359, width: 93, height: 92 },
        cell_4_3: { left: 914, top: 359, width: 93, height: 92 }
    }
};

// Fonction helper typée pour récupérer une position
function getGridPosition(period: 'E1' | 'E2' | 'E3', row: number, col: number): Position | undefined {
    const periodKey = period === 'E1' ? 'paleozoique' : 
                     period === 'E2' ? 'mesozoique' : 'cenozoique';
    const cellKey = `cell_${row}_${col}`;
    
    return IPAD_GRID_POSITIONS[periodKey][cellKey];
}

// Version plus sûre avec vérification
function getGridPositionSafe(period: 'E1' | 'E2' | 'E3', row: number, col: number): Position | null {
    try {
        const periodKey = period === 'E1' ? 'paleozoique' : 
                         period === 'E2' ? 'mesozoique' : 'cenozoique';
        const cellKey = `cell_${row}_${col}`;
        
        const position = IPAD_GRID_POSITIONS[periodKey][cellKey];
        return position || null;
    } catch (error) {
        console.warn(`Position not found for period ${period}, row ${row}, col ${col}`);
        return null;
    }
}

// Mapping direct par ID d'animal (typé)
const ANIMAL_POSITIONS_IPAD: Record<string, Position> = {
    'placoderme': { left: 47, top: 149, width: 113, height: 96 },
    'ammonite': { left: 161, top: 149, width: 113, height: 96 },
    'trilobite': { left: 275, top: 149, width: 113, height: 96 },
    // ... continuer pour tous vos animaux
};

// Configuration de référence corrigée avec mesures précises
const IPAD_REFERENCE = {
    screenWidth: 1366,
    screenHeight: 1024,
    gridStartX: 150,        // Point de départ première grille
    gridStartY: 190,        // Point de départ première grille
    cellWidth: 105,         // Cellules carrées 105x105
    cellHeight: 105,
    cellBorder: 13,         // Bordure entre cellules
    cellStep: 118,          // 105 + 13 = pas de cellule
    gridSpacing: 80,        // Espacement entre grilles
    gridWidth: 341,         // Largeur d'une grille: 3×105 + 2×13 = 341
    totalGridSpacing: 421   // gridWidth + gridSpacing = 421
} as const;

export { 
    IPAD_GRID_POSITIONS, 
    getGridPosition, 
    getGridPositionSafe,
    ANIMAL_POSITIONS_IPAD, 
    IPAD_REFERENCE,
    type Position,
    type GridPositions,
    type PeriodGrid
};