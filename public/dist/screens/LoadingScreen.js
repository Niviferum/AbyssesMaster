export class LoadingScreen {
    constructor(appElement, gameState, screenManager) {
        this.appElement = appElement;
        this.gameState = gameState;
        this.screenManager = screenManager;
        this.keyboardListener = this.handleKeyPress.bind(this);
        this.render();
        this.bindEvents();
    }
    render() {
        this.appElement.innerHTML = `
            <div id="loading" class="screen loading-screen">
                <video autoplay muted class="loading-video" id="loading-video">
                    <source src="videos/ecran_attente.mp4" type="video/mp4">
                </video>
                
                <!-- Bouton skip discret -->
                <div class="skip-button" id="skip-btn" title="Passer l'animation (Ctrl+A)">
                    <span class="skip-icon">⏭</span>
                </div>
            </div>
            
            <style>
                .loading-screen {
                    position: relative;
                    width: 100%;
                    height: 100vh;
                    overflow: hidden;
                }
                
                .loading-video {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                
                .skip-button {
                    position: absolute;
                    bottom: 30px;
                    right: 30px;
                    width: 50px;
                    height: 50px;
                    background: rgba(0, 0, 0, 0.5);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    opacity: 0.7;
                    transition: all 0.3s ease;
                    z-index: 1000;
                    backdrop-filter: blur(5px);
                    border: 2px solid rgba(255, 255, 255, 0.2);
                }
                
                .skip-button:hover {
                    opacity: 1;
                    transform: scale(1.1);
                    background: rgba(0, 0, 0, 0.7);
                    border-color: rgba(255, 255, 255, 0.4);
                }
                
                .skip-icon {
                    color: white;
                    font-size: 20px;
                    line-height: 1;
                    user-select: none;
                }
                
                /* Animation d'apparition discrète */
                .skip-button {
                    animation: fadeInDiscrete 2s ease-in-out;
                }
                
                @keyframes fadeInDiscrete {
                    0% { 
                        opacity: 0; 
                        transform: translateY(20px) scale(0.8); 
                    }
                    70% { 
                        opacity: 0; 
                    }
                    100% { 
                        opacity: 0.7; 
                        transform: translateY(0) scale(1); 
                    }
                }
            </style>
        `;
    }
    bindEvents() {
        const video = document.getElementById('loading-video');
        const skipBtn = document.getElementById('skip-btn');
        // Ajouter l'écouteur de clavier pour skip
        document.addEventListener('keydown', this.keyboardListener);
        // Ajouter l'écouteur de clic sur le bouton skip
        if (skipBtn) {
            skipBtn.addEventListener('click', () => {
                console.log('Skip vidéo avec bouton');
                this.skipVideo();
            });
        }
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
        }
        else {
            // Si pas de vidéo, attendre 3 secondes
            setTimeout(() => {
                this.cleanup();
                this.screenManager.navigateToScreen('home');
            }, 3000);
        }
    }
    handleKeyPress(e) {
        // Vérifier si Ctrl+A est pressé
        if (e.ctrlKey && e.key.toLowerCase() === 'a') {
            e.preventDefault(); // Empêche la sélection de tout le texte
            console.log('Skip vidéo avec Ctrl+A');
            this.skipVideo();
        }
    }
    skipVideo() {
        // Ne skip que si on est encore sur l'écran de loading
        if (this.gameState.currentScreen === 'loading') {
            const video = document.getElementById('loading-video');
            if (video) {
                video.pause(); // Arrête la vidéo
            }
            this.cleanup();
            this.screenManager.navigateToScreen('home');
        }
    }
    cleanup() {
        // Nettoyer l'écouteur de clavier pour éviter les fuites mémoire
        document.removeEventListener('keydown', this.keyboardListener);
    }
}
//# sourceMappingURL=LoadingScreen.js.map