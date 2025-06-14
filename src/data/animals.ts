import { Animal } from '../types/interfaces.js';

export const ANIMALS_DATA: Animal[] = [
    // P1 - Zone littorale
    {
        id: 'placoderme',
        name: 'Placoderme (Placodermi)',
        period: 'E1',
        discovered: false,
        videoPath: 'assets/videos/P1E1M1-placoderme.mp4',
        imagePath: 'assets/images/P1E1M1.png',
        lockImagePath: 'assets/images/P1E1M1_lock.png',
        fichePath: 'assets/fiches/P1E1M1.png',
        scrollPosition: { x: 200, y: 300 },
        combination: { blue: 1, yellow: 1, red: 1 }
    },
    {
        id: 'pleurotomaire_p1e1',
        name: 'Pleurotomaire (Pleurotomaria)',
        period: 'E1',
        discovered: false,
        videoPath: 'assets/videos/P1E1M2-pleurotomaire.mp4',
        imagePath: 'assets/images/P1E1M2.png',
        lockImagePath: 'assets/images/P1E1M2_lock.png',
        fichePath: 'assets/fiches/P1E1M2.png',
        scrollPosition: { x: 150, y: 350 },
        combination: { blue: 1, yellow: 1, red: 2 }
    },
    {
        id: 'limule',
        name: 'Limule (Limulus)',
        period: 'E1',
        discovered: false,
        videoPath: 'assets/videos/P1E1M3-limule.mp4',
        imagePath: 'assets/images/P1E1M3.png',
        lockImagePath: 'assets/images/P1E1M3_lock.png',
        fichePath: 'assets/fiches/P1E1M3.png',
        scrollPosition: { x: 300, y: 280 },
        combination: { blue: 1, yellow: 1, red: 3 }
    },
    {
        id: 'plesiosaure',
        name: 'Plésiosaure (Pleisosaurus)',
        period: 'E2',
        discovered: false,
        videoPath: 'assets/videos/P1E2M1-plesiosaure.mp4',
        imagePath: 'assets/images/P1E2M1.png',
        lockImagePath: 'assets/images/P1E2M1_lock.png',
        fichePath: 'assets/fiches/P1E2M1.png',
        scrollPosition: { x: 250, y: 320 },
        combination: { blue: 1, yellow: 2, red: 1 }
    },
    {
        id: 'argonaute',
        name: 'Argonaute (Argonauta)',
        period: 'E2',
        discovered: false,
        videoPath: 'assets/videos/P1E2M2-argonaute.mp4',
        imagePath: 'assets/images/P1E2M2.png',
        lockImagePath: 'assets/images/P1E2M2_lock.png',
        fichePath: 'assets/fiches/P1E2M2.png',
        scrollPosition: { x: 350, y: 380 },
        combination: { blue: 1, yellow: 2, red: 2 }
    },
    {
        id: 'neoglyphea',
        name: 'Neoglyphea Inopinata (Neoglyphea)',
        period: 'E2',
        discovered: false,
        videoPath: 'assets/videos/P1E2M3-galathea.mp4',
        imagePath: 'assets/images/P1E2M3.png',
        lockImagePath: 'assets/images/P1E2M3_lock.png',
        fichePath: 'assets/fiches/P1E2M3.png',
        scrollPosition: { x: 180, y: 420 },
        combination: { blue: 1, yellow: 2, red: 3 }
    },
    {
        id: 'nothotenia',
        name: 'Nothotenia (Notothenia)',
        period: 'E3',
        discovered: false,
        videoPath: 'assets/videos/P1E3M1-nothotenia.mp4',
        imagePath: 'assets/images/P1E3M1.png',
        lockImagePath: 'assets/images/P1E3M1_lock.png',
        fichePath: 'assets/fiches/P1E3M1.png',
        scrollPosition: { x: 220, y: 450 },
        combination: { blue: 1, yellow: 3, red: 1 }
    },
    {
        id: 'pieuvre_anneaux_bleus',
        name: 'Pieuvre à Anneaux Bleus (Hapalochlaena)',
        period: 'E3',
        discovered: false,
        videoPath: 'assets/videos/P1E3M2-pieuvre.mp4',
        imagePath: 'assets/images/P1E3M2.png',
        lockImagePath: 'assets/images/P1E3M2_lock.png',
        fichePath: 'assets/fiches/P1E3M2.png',
        scrollPosition: { x: 380, y: 480 },
        combination: { blue: 1, yellow: 3, red: 2 }
    },
    {
        id: 'triops',
        name: 'Triops (Triops)',
        period: 'E3',
        discovered: false,
        videoPath: 'assets/videos/P1E3M3-triops.mp4',
        imagePath: 'assets/images/P1E3M3.png',
        lockImagePath: 'assets/images/P1E3M3_lock.png',
        fichePath: 'assets/fiches/P1E3M3.png',
        scrollPosition: { x: 320, y: 520 },
        combination: { blue: 1, yellow: 3, red: 3 }
    },

    // P2 - Zone mésale
    {
        id: 'coelacanthe_p2e1',
        name: 'Coelacanthe (Latimeria Chalumnae)',
        period: 'E1',
        discovered: false,
        videoPath: 'assets/videos/P2E1M1-coelacanthe1.mp4',
        imagePath: 'assets/images/P2E1M1.png',
        lockImagePath: 'assets/images/P2E1M1_lock.png',
        fichePath: 'assets/fiches/P2E1M1.png',
        scrollPosition: { x: 200, y: 350 },
        combination: { blue: 2, yellow: 1, red: 1 }
    },
    {
        id: 'orthocone',
        name: 'Orthocône (Orthoceras)',
        period: 'E1',
        discovered: false,
        videoPath: 'assets/videos/P2E1M2-orthocone.mp4',
        imagePath: 'assets/images/P2E1M2.png',
        lockImagePath: 'assets/images/P2E1M2_lock.png',
        fichePath: 'assets/fiches/P2E1M2.png',
        scrollPosition: { x: 280, y: 380 },
        combination: { blue: 2, yellow: 1, red: 2 }
    },
    {
        id: 'anomalocaris',
        name: 'Anomalocaris (Anomalocaris)',
        period: 'E1',
        discovered: false,
        videoPath: 'assets/videos/P2E1M3-anomalocaris.mp4',
        imagePath: 'assets/images/P2E1M3.png',
        lockImagePath: 'assets/images/P2E1M3_lock.png',
        fichePath: 'assets/fiches/P2E1M3.png',
        scrollPosition: { x: 350, y: 320 },
        combination: { blue: 2, yellow: 1, red: 3 }
    },
    {
        id: 'coelacanthe_foreyia',
        name: 'Coelacanthe (Foreyia)',
        period: 'E2',
        discovered: false,
        videoPath: 'assets/videos/P2E2M1-coelacanthe2.mp4',
        imagePath: 'assets/images/P2E2M1.png',
        lockImagePath: 'assets/images/P2E2M1_lock.png',
        fichePath: 'assets/fiches/P2E2M1.png',
        scrollPosition: { x: 180, y: 420 },
        combination: { blue: 2, yellow: 2, red: 1 }
    },
    {
        id: 'nautile_pleurotomaire',
        name: 'Nautile / Pleurotomaire (Nautilus/Pleurotomaria)',
        period: 'E2',
        discovered: false,
        videoPath: 'assets/videos/P2E2M2-nautile.mp4',
        imagePath: 'assets/images/P2E2M2.png',
        lockImagePath: 'assets/images/P2E2M2_lock.png',
        fichePath: 'assets/fiches/P2E2M2.png',
        scrollPosition: { x: 320, y: 450 },
        combination: { blue: 2, yellow: 2, red: 2 }
    },
    {
        id: 'eurypteride',
        name: 'Euryptéride (Euryptéridus)',
        period: 'E2',
        discovered: false,
        videoPath: 'assets/videos/P2E2M3-eurypteride.mp4',
        imagePath: 'assets/images/P2E2M3.png',
        lockImagePath: 'assets/images/P2E2M3_lock.png',
        fichePath: 'assets/fiches/P2E2M3.png',
        scrollPosition: { x: 400, y: 380 },
        combination: { blue: 2, yellow: 2, red: 3 }
    },
    {
        id: 'coelacanthe_p2e3',
        name: 'Coelacanthe (Latimeria Chalumnae)',
        period: 'E3',
        discovered: false,
        videoPath: 'assets/videos/P2E3M1-coelacanthe3.mp4',
        imagePath: 'assets/images/P2E3M1.png',
        lockImagePath: 'assets/images/P2E3M1_lock.png',
        fichePath: 'assets/fiches/P2E3M1.png',
        scrollPosition: { x: 250, y: 480 },
        combination: { blue: 2, yellow: 3, red: 1 }
    },
    {
        id: 'calmar_commun',
        name: 'Calmar Commun (Loligo Vulgaris)',
        period: 'E3',
        discovered: false,
        videoPath: 'assets/videos/P2E3M2-calmar.mp4',
        imagePath: 'assets/images/P2E3M2.png',
        lockImagePath: 'assets/images/P2E3M2_lock.png',
        fichePath: 'assets/fiches/P2E3M2.png',
        scrollPosition: { x: 380, y: 520 },
        combination: { blue: 2, yellow: 3, red: 2 }
    },
    {
        id: 'galathea_strigosa',
        name: 'Galathea Strigosa (Galathea)',
        period: 'E3',
        discovered: false,
        videoPath: 'assets/videos/P2E3M3-neoglyphea.mp4',
        imagePath: 'assets/images/P2E3M3.png',
        lockImagePath: 'assets/images/P2E3M3_lock.png',
        fichePath: 'assets/fiches/P2E3M3.png',
        scrollPosition: { x: 150, y: 550 },
        combination: { blue: 2, yellow: 3, red: 3 }
    },

    // P3 - Zone bathyale
    {
        id: 'conodont_p3e1',
        name: 'Conodont (Promissum)',
        period: 'E1',
        discovered: false,
        videoPath: 'assets/videos/P3E1M1-conodont.mp4',
        imagePath: 'assets/images/P3E1M1.png',
        lockImagePath: 'assets/images/P3E1M1_lock.png',
        fichePath: 'assets/fiches/P3E1M1.png',
        scrollPosition: { x: 200, y: 400 },
        combination: { blue: 3, yellow: 1, red: 1 }
    },
    {
        id: 'nipponites',
        name: 'Nipponites',
        period: 'E1',
        discovered: false,
        videoPath: 'assets/videos/P3E1M2-nipponites.mp4',
        imagePath: 'assets/images/P3E1M2.png',
        lockImagePath: 'assets/images/P3E1M2_lock.png',
        fichePath: 'assets/fiches/P3E1M2.png',
        scrollPosition: { x: 300, y: 430 },
        combination: { blue: 3, yellow: 1, red: 2 }
    },
    {
        id: 'glypheoidea',
        name: 'Glypheoidea (Eryma)',
        period: 'E1',
        discovered: false,
        videoPath: 'assets/videos/P3E1M3-glypheoidea.mp4',
        imagePath: 'assets/images/P3E1M3.png',
        lockImagePath: 'assets/images/P3E1M3_lock.png',
        fichePath: 'assets/fiches/P3E1M3.png',
        scrollPosition: { x: 380, y: 380 },
        combination: { blue: 3, yellow: 1, red: 3 }
    },
    {
        id: 'requin_lutin',
        name: 'Requin Lutin (Mitsukurina)',
        period: 'E2',
        discovered: false,
        videoPath: 'assets/videos/P3E2M1-requin-lutin.mp4',
        imagePath: 'assets/images/P3E2M1.png',
        lockImagePath: 'assets/images/P3E2M1_lock.png',
        fichePath: 'assets/fiches/P3E2M1.png',
        scrollPosition: { x: 180, y: 480 },
        combination: { blue: 3, yellow: 2, red: 1 }
    },
    {
        id: 'vampire_des_abysses',
        name: 'Vampire des Abysses (Vampyrotheutis)',
        period: 'E2',
        discovered: false,
        videoPath: 'assets/videos/P3E2M2-vampire.mp4',
        imagePath: 'assets/images/P3E2M2.png',
        lockImagePath: 'assets/images/P3E2M2_lock.png',
        fichePath: 'assets/fiches/P3E2M2.png',
        scrollPosition: { x: 320, y: 520 },
        combination: { blue: 3, yellow: 2, red: 2 }
    },
    {
        id: 'pycnogonide_p3e2',
        name: 'Pycnogonide (Pycnogonida)',
        period: 'E2',
        discovered: false,
        videoPath: 'assets/videos/P3E2M3-pycnogonide1.mp4',
        imagePath: 'assets/images/P3E2M3.png',
        lockImagePath: 'assets/images/P3E2M3_lock.png',
        fichePath: 'assets/fiches/P3E2M3.png',
        scrollPosition: { x: 420, y: 450 },
        combination: { blue: 3, yellow: 2, red: 3 }
    },
    {
        id: 'whalefish',
        name: 'Whalefish (Barbourisia)',
        period: 'E3',
        discovered: false,
        videoPath: 'assets/videos/P3E3M1-whalefish.mp4',
        imagePath: 'assets/images/P3E3M1.png',
        lockImagePath: 'assets/images/P3E3M1_lock.png',
        fichePath: 'assets/fiches/P3E3M1.png',
        scrollPosition: { x: 250, y: 550 },
        combination: { blue: 3, yellow: 3, red: 1 }
    },
    {
        id: 'scalyfoot_pleurotomaire',
        name: 'Scalyfoot Gasteropod/Pleurotomaire (Chrysomallon/Pleurotomaria)',
        period: 'E3',
        discovered: false,
        videoPath: 'assets/videos/P3E3M2-scalyfoot.mp4',
        imagePath: 'assets/images/P3E3M2.png',
        lockImagePath: 'assets/images/P3E3M2_lock.png',
        fichePath: 'assets/fiches/P3E3M2.png',
        scrollPosition: { x: 350, y: 580 },
        combination: { blue: 3, yellow: 3, red: 2 }
    },
    {
        id: 'bathynome_geant',
        name: 'Bathynome Géant (Bathynomus)',
        period: 'E3',
        discovered: false,
        videoPath: 'assets/videos/P3E3M3-bathynome.mp4',
        imagePath: 'assets/images/P3E3M3.png',
        lockImagePath: 'assets/images/P3E3M3_lock.png',
        fichePath: 'assets/fiches/P3E3M3.png',
        scrollPosition: { x: 150, y: 600 },
        combination: { blue: 3, yellow: 3, red: 3 }
    },

    // P4 - Zone abyssale
    {
        id: 'conodont_p4e1',
        name: 'Conodont (Promissum)',
        period: 'E1',
        discovered: false,
        videoPath: 'assets/videos/P4E1M1-conodont2.mp4',
        imagePath: 'assets/images/P4E1M1.png',
        lockImagePath: 'assets/images/P4E1M1_lock.png',
        fichePath: 'assets/fiches/P4E1M1.png',
        scrollPosition: { x: 200, y: 450 },
        combination: { blue: 4, yellow: 1, red: 1 }
    },
    {
        id: 'chitons',
        name: 'Chitons',
        period: 'E1',
        discovered: false,
        videoPath: 'assets/videos/P4E1M2-chiton1.mp4',
        imagePath: 'assets/images/P4E1M2.png',
        lockImagePath: 'assets/images/P4E1M2_lock.png',
        fichePath: 'assets/fiches/P4E1M2.png',
        scrollPosition: { x: 320, y: 480 },
        combination: { blue: 4, yellow: 1, red: 2 }
    },
    {
        id: 'pycnogonide_cambropycnogon',
        name: 'Pycnogonide Cambropycnogon Klausmuelleri (Pycnogonida)',
        period: 'E1',
        discovered: false,
        videoPath: 'assets/videos/P4E1M3-pycnogonide2.mp4',
        imagePath: 'assets/images/P4E1M3.png',
        lockImagePath: 'assets/images/P4E1M3_lock.png',
        fichePath: 'assets/fiches/P4E1M3.png',
        scrollPosition: { x: 400, y: 420 },
        combination: { blue: 4, yellow: 1, red: 3 }
    },
    {
        id: 'liparid',
        name: 'Liparid (Liparis)',
        period: 'E2',
        discovered: false,
        videoPath: 'assets/videos/P4E2M1-liparid1.mp4',
        imagePath: 'assets/images/P4E2M1.png',
        lockImagePath: 'assets/images/P4E2M1_lock.png',
        fichePath: 'assets/fiches/P4E2M1.png',
        scrollPosition: { x: 280, y: 520 },
        combination: { blue: 4, yellow: 2, red: 1 }
    },
    {
        id: 'chiton_p4e2m2',
        name: 'Chiton',
        period: 'E2',
        discovered: false,
        videoPath: 'assets/videos/P4E2M2-chiton2.mp4',
        imagePath: 'assets/images/P4E2M2.png',
        lockImagePath: 'assets/images/P4E2M2_lock.png',
        fichePath: 'assets/fiches/P4E2M2.png',
        scrollPosition: { x: 350, y: 550 },
        combination: { blue: 4, yellow: 2, red: 2 }
    },
    {
        id: 'coleia_p4e2m3',
        name: 'Coleia',
        period: 'E2',
        discovered: false,
        videoPath: 'assets/videos/P4E2M3-coleia.mp4',
        imagePath: 'assets/images/P4E2M3.png',
        lockImagePath: 'assets/images/P4E2M3_lock.png',
        fichePath: 'assets/fiches/P4E2M3.png',
        scrollPosition: { x: 180, y: 580 },
        combination: { blue: 4, yellow: 2, red: 3 }
    },
    {
        id: 'liparid_p4e3m1',
        name: 'Liparid',
        period: 'E3',
        discovered: false,
        videoPath: 'assets/videos/P4E3M1-liparid1.mp4',
        imagePath: 'assets/images/P4E3M1.png',
        lockImagePath: 'assets/images/P4E3M1_lock.png',
        fichePath: 'assets/fiches/P4E3M1.png',
        scrollPosition: { x: 420, y: 480 },
        combination: { blue: 4, yellow: 3, red: 1 }
    },
    {
        id: 'bathymodiolinae_p4e3m2',
        name: 'Bathymodiolinæ',
        period: 'E3',
        discovered: false,
        videoPath: 'assets/videos/P4E3M2-bathymodiolinae.mp4',
        imagePath: 'assets/images/P4E3M2.png',
        lockImagePath: 'assets/images/P4E3M2_lock.png',
        fichePath: 'assets/fiches/P4E3M2.png',
        scrollPosition: { x: 250, y: 620 },
        combination: { blue: 4, yellow: 3, red: 2 }
    },
    {
        id: 'hirondelle_p4e3m3',
        name: 'Hirondelle',
        period: 'E3',
        discovered: false,
        videoPath: 'assets/videos/P4E3M3-hirondella.mp4',
        imagePath: 'assets/images/P4E3M3.png',
        lockImagePath: 'assets/images/P4E3M3_lock.png',
        fichePath: 'assets/fiches/P4E3M3.png',
        scrollPosition: { x: 380, y: 650 },
        combination: { blue: 4, yellow: 3, red: 3 }
    }
];

export function getAnimalsByPeriod(period: string): Animal[] {
    return ANIMALS_DATA.filter(animal => animal.period === period);
}

export function getAnimalById(id: string): Animal | undefined {
    return ANIMALS_DATA.find(animal => animal.id === id);
}

export function findAnimalByCombination(combination: any): Animal | undefined {
    return ANIMALS_DATA.find(animal => 
        !animal.discovered &&
        animal.combination.blue === combination.blue &&
        animal.combination.yellow === combination.yellow &&
        animal.combination.red === combination.red
    );
}