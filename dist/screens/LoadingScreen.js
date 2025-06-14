export class LoadingScreen {
    constructor(appElement, gameState, screenManager) {
        this.appElement = appElement;
        this.gameState = gameState;
        this.screenManager = screenManager;
        this.render();
        this.bindEvents();
    }
    render() {
        this.appElement.innerHTML = `
            <div id="loading" class="screen loading-screen">
                <video autoplay muted class="loading-video" id="loading-video">
                    <source src="videos/ecran_attente.mp4" type="video/mp4">
                </video>
            </div>
        `;
    }
    bindEvents() {
        const video = document.getElementById('loading-video');
        if (video) {
            // Attendre que la vidéo se termine avant de passer à l'écran suivant
            video.addEventListener('ended', () => {
                this.screenManager.navigateToScreen('home');
            });
            // Fallback : si la vidéo ne se charge pas, passer à l'écran suivant après 5 secondes
            video.addEventListener('error', () => {
                console.log('Erreur de chargement vidéo, passage à l\'écran suivant');
                setTimeout(() => {
                    this.screenManager.navigateToScreen('home');
                }, 2000);
            });
            // Fallback : durée maximale de 10 secondes au cas où
            setTimeout(() => {
                if (this.gameState.currentScreen === 'loading') {
                    this.screenManager.navigateToScreen('home');
                }
            }, 15000);
        }
        else {
            // Si pas de vidéo, attendre 3 secondes
            setTimeout(() => {
                this.screenManager.navigateToScreen('home');
            }, 3000);
        }
    }
}
