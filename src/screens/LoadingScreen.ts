import { GameState } from '../types/interfaces.js';
import { ScreenManager } from '../utils/ScreenManager.js';

export class LoadingScreen {
    private appElement: HTMLElement;
    private gameState: GameState;
    private screenManager: ScreenManager;
    private keyboardListener: (e: KeyboardEvent) => void;

    constructor(appElement: HTMLElement, gameState: GameState, screenManager: ScreenManager) {
        this.appElement = appElement;
        this.gameState = gameState;
        this.screenManager = screenManager;
        this.keyboardListener = this.handleKeyPress.bind(this);
        this.render();
        this.bindEvents();
    }

    private render(): void {
        this.appElement.innerHTML = `
            <div id="loading" class="screen loading-screen">
                <video autoplay muted class="loading-video" id="loading-video">
                    <source src="videos/ecran_attente.mp4" type="video/mp4">
                </video>
            </div>
        `;
    }

    private bindEvents(): void {
        const video = document.getElementById('loading-video') as HTMLVideoElement;
        
        // Ajouter l'écouteur de clavier pour skip
        document.addEventListener('keydown', this.keyboardListener);
        
        if (video) {
            // Attendre que la vidéo se termine avant de passer à l'écran suivant
            video.addEventListener('ended', () => {
                this.cleanup();
                this.screenManager.navigateToScreen('home');
            });

            // Fallback : si la vidéo ne se charge pas, passer à l'écran suivant après 5 secondes
            video.addEventListener('error', () => {
                console.log('Erreur de chargement vidéo, passage à l\'écran suivant');
                setTimeout(() => {
                    this.cleanup();
                    this.screenManager.navigateToScreen('home');
                }, 2000);
            });

            // Fallback : durée maximale de 15 secondes au cas où
            setTimeout(() => {
                if (this.gameState.currentScreen === 'loading') {
                    this.cleanup();
                    this.screenManager.navigateToScreen('home');
                }
            }, 15000);
        } else {
            // Si pas de vidéo, attendre 3 secondes
            setTimeout(() => {
                this.cleanup();
                this.screenManager.navigateToScreen('home');
            }, 3000);
        }
    }

    private handleKeyPress(e: KeyboardEvent): void {
        // Vérifier si Ctrl+A est pressé
        if (e.ctrlKey && e.key.toLowerCase() === 'a') {
            e.preventDefault(); // Empêche la sélection de tout le texte
            console.log('Skip vidéo avec Ctrl+A');
            this.skipVideo();
        }
    }

    private skipVideo(): void {
        // Ne skip que si on est encore sur l'écran de loading
        if (this.gameState.currentScreen === 'loading') {
            const video = document.getElementById('loading-video') as HTMLVideoElement;
            if (video) {
                video.pause(); // Arrête la vidéo
            }
            this.cleanup();
            this.screenManager.navigateToScreen('home');
        }
    }

    private cleanup(): void {
        // Nettoyer l'écouteur de clavier pour éviter les fuites mémoire
        document.removeEventListener('keydown', this.keyboardListener);
    }
}