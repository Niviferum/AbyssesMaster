import { EventBinder } from '../utils/EventBinder.js';
export class ScrollScreen {
    constructor(appElement, gameState, screenManager) {
        this.jqueryLoaded = false;
        this.appElement = appElement;
        this.gameState = gameState;
        this.screenManager = screenManager;
        this.eventBinder = EventBinder.getInstance();
        this.loadParallaxHTML();
    }
    async loadParallaxHTML() {
        try {
            await this.loadJQuery();
            const periodMapping = this.getPeriodMapping();
            const htmlFileName = periodMapping[this.gameState.currentPeriod] || '1-paleozoique.html';
            const htmlPath = `./assets/parallaxe/${htmlFileName}`;
            console.log('Chargement de:', htmlPath);
            const response = await fetch(htmlPath);
            if (!response.ok) {
                throw new Error(`Impossible de charger ${htmlPath} - Status: ${response.status}`);
            }
            const htmlContent = await response.text();
            await this.integrateParallaxHTML(htmlContent);
            this.bindEvents();
        }
        catch (error) {
            console.error('Erreur lors du chargement du parallaxe:', error);
            this.renderFallback();
            this.bindEvents();
        }
    }
    async loadJQuery() {
        if (this.jqueryLoaded || window.jQuery) {
            return;
        }
        return new Promise((resolve, reject) => {
            const jqueryScript = document.createElement('script');
            jqueryScript.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
            jqueryScript.onload = async () => {
                console.log('jQuery chargé');
                try {
                    await this.loadLocalParallaxPlugin();
                    this.jqueryLoaded = true;
                    console.log('Plugin Parallax local chargé');
                    resolve();
                }
                catch (error) {
                    console.error('Erreur chargement plugin local:', error);
                    reject(error);
                }
            };
            jqueryScript.onerror = () => reject(new Error('Impossible de charger jQuery'));
            document.head.appendChild(jqueryScript);
        });
    }
    async loadLocalParallaxPlugin() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = './assets/parallaxe/global/jquery.parallax.js';
            script.onload = () => {
                console.log('Plugin Parallax local chargé depuis:', script.src);
                resolve();
            };
            script.onerror = (error) => {
                console.error('Impossible de charger le plugin local depuis:', script.src);
                reject(error);
            };
            script.setAttribute('data-parallax-script', 'true');
            document.head.appendChild(script);
        });
    }
    getPeriodMapping() {
        return {
            'E1': '1-paleozoique.html',
            'E2': '2-mesozoique.html',
            'E3': '3-cenozoique.html',
            'paleozoic': '1-paleozoique.html',
            'mesozoic': '2-mesozoique.html',
            'cenozoic': '3-cenozoique.html'
        };
    }
    async integrateParallaxHTML(htmlContent) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        const bodyContent = doc.body.innerHTML;
        this.appElement.innerHTML = `
            <div id="scroll" class="screen scroll-screen">
                <div class="scroll-navigation">
                    <div class="nav-icon" id="back-btn" title="Retour">
                        <img src="./assets/buttons/retour1.png" alt="Retour">
                    </div>
                    <div class="nav-icon" id="grid-btn" title="Grille">⊞</div>
                </div>
                
                <div class="parallax-content">
                    ${this.fixAssetPaths(bodyContent)}
                </div>
            </div>
            
            <style>
                /* Navigation */
                .scroll-navigation {
                    position: fixed !important;
                    top: 20px !important;
                    left: 20px !important;
                    z-index: 10000 !important;
                    display: flex !important;
                    gap: 10px !important;
                }
                
                .nav-icon {
                    width: 50px !important;
                    height: 50px !important;
                    background: rgba(0, 0, 0, 0.5) !important;
                    border-radius: 25px !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    cursor: pointer !important;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.3) !important;
                    transition: transform 0.2s !important;
                }
                
                .nav-icon:hover {
                    transform: scale(1.1) !important;
                    background: rgb(0, 0, 0) !important;
                }
                
                .nav-icon img {
                    width: 30px !important;
                    height: 30px !important;
                }
                
                #conteneur-nord {
                    z-index: 1000 !important;
                }
                
                .scroll-screen {
                    position: relative !important;
                    width: 100% !important;
                    height: 100vh !important;
                    overflow: hidden !important;
                }
                
                .parallax-content {
                    width: 100% !important;
                    height: 100% !important;
                    overflow: auto !important;
                }
            </style>
        `;
        this.exposeNavigationFunctions();
        await this.loadParallaxStyles(doc);
        // IMPORTANT : Appliquer les fixes iOS après le chargement du contenu
        setTimeout(() => {
            this.executeParallaxScripts(doc);
            this.fixiOSVideos(); // ← FIX AJOUTÉ ICI
        }, 100);
    }
    exposeNavigationFunctions() {
        window.navigateToSpecies = () => {
            console.log('Navigation vers Species depuis le parallaxe');
            this.screenManager.navigateToScreen('species');
        };
        window.navigateToGrid = () => {
            console.log('Navigation vers Grid depuis le parallaxe');
            this.screenManager.navigateToScreen('grid');
        };
        window.navigateToHome = () => {
            console.log('Navigation vers Home depuis le parallaxe');
            this.screenManager.navigateToScreen('home');
        };
        window.setCurrentAnimal = (animalId) => {
            console.log('Animal sélectionné depuis le parallaxe:', animalId);
        };
    }
    fixAssetPaths(htmlContent) {
        return htmlContent
            .replace(/src="([^"]*\.(?:png|jpg|jpeg|gif|webp))"/g, 'src="./assets/parallaxe/$1"')
            .replace(/src="([^"]*\.(?:webm|mp4|mov))"/g, 'src="./assets/parallaxe/$1"')
            .replace(/url\(([^)]*\.(?:png|jpg|jpeg|gif|webp))\)/g, 'url(./assets/parallaxe/$1)');
    }
    async loadParallaxStyles(doc) {
        // Ajouter le CSS iOS-spécifique en premier
        const iOSStyle = document.createElement('style');
        iOSStyle.textContent = this.getIOSVideoCSS();
        iOSStyle.setAttribute('data-parallax-style', 'true');
        document.head.appendChild(iOSStyle);
        // Charger les styles du document
        const styleElements = doc.querySelectorAll('style');
        styleElements.forEach(styleEl => {
            const newStyle = document.createElement('style');
            let cssContent = styleEl.textContent || '';
            cssContent = cssContent.replace(/url\(['"]?([^'"]*\.(?:png|jpg|jpeg|gif|webp))['"]?\)/g, 'url("./assets/parallaxe/$1")');
            newStyle.textContent = cssContent;
            newStyle.setAttribute('data-parallax-style', 'true');
            document.head.appendChild(newStyle);
        });
        // Charger les CSS externes
        const linkElements = doc.querySelectorAll('link[rel="stylesheet"]');
        for (const link of linkElements) {
            try {
                const href = link.href;
                const adaptedHref = href.replace(/global\//, './assets/parallaxe/global/');
                const response = await fetch(adaptedHref);
                if (response.ok) {
                    const cssText = await response.text();
                    const newStyle = document.createElement('style');
                    newStyle.textContent = cssText;
                    newStyle.setAttribute('data-parallax-style', 'true');
                    document.head.appendChild(newStyle);
                }
            }
            catch (error) {
                console.warn('Impossible de charger le CSS:', error);
            }
        }
    }
    getIOSVideoCSS() {
        return `
        /* iOS Video Fixes */
        .videoAnim video {
            -webkit-playsinline: true !important;
            playsinline: true !important;
            -webkit-disablePictureInPicture: true !important;
            -webkit-video-presentationmode: inline !important;
            -webkit-appearance: none !important;
            -moz-appearance: none !important;
            appearance: none !important;
            outline: none !important;
            border: none !important;
            background: transparent !important;
            -webkit-touch-callout: none !important;
            -webkit-user-select: none !important;
            user-select: none !important;
            touch-action: manipulation !important;
            -webkit-touch-action: manipulation !important;
            -webkit-overflow-scrolling: touch !important;
            -webkit-transform: translate3d(0,0,0) !important;
            transform: translate3d(0,0,0) !important;
            -webkit-backface-visibility: hidden !important;
            backface-visibility: hidden !important;
        }

        /* === SUPPRESSION FOND NOIR VIDÉOS === */
        .videoAnim {
            /* Conteneur sans fond */
            background: transparent !important;
            overflow: hidden !important;
        }

        .videoAnim video {
            /* Suppression fond noir */
            background: transparent !important;
            
            /* Mode de fusion pour supprimer le noir */
            mix-blend-mode: screen !important;
            
            /* Alternative : utiliser un filtre pour augmenter la luminosité des zones sombres */
            filter: contrast(1.2) brightness(1.1) !important;
            
            /* Masquer les pixels noirs/très sombres */
            -webkit-mask: 
                linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%),
                radial-gradient(ellipse at center, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%) !important;
            mask: 
                linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%),
                radial-gradient(ellipse at center, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%) !important;
            
            /* Composition du masque */
            -webkit-mask-composite: intersect !important;
            mask-composite: intersect !important;
        }

        /* Méthode alternative : CSS Filter pour chroma key */
        .videoAnim.chroma-key video {
            /* Supprimer le noir via filtres CSS */
            filter: 
                contrast(1.3) 
                brightness(1.2) 
                saturate(1.1) 
                hue-rotate(0deg) !important;
            
            /* Mix blend mode pour fusionner avec l'arrière-plan */
            mix-blend-mode: multiply !important;
            
            /* Isolation du conteneur */
            isolation: isolate !important;
        }

        /* Méthode 3 : Clip-path dynamique */
        .videoAnim.auto-crop video {
            /* Rogner automatiquement les bords noirs */
            clip-path: inset(5% 5% 5% 5%) !important;
            
            /* Agrandir légèrement pour compenser */
            transform: scale(1.1) !important;
            
            /* Centrer */
            object-position: center center !important;
        }

        .videoAnim video::-webkit-media-controls,
        .videoAnim video::-webkit-media-controls-panel,
        .videoAnim video::-webkit-media-controls-play-button,
        .videoAnim video::-webkit-media-controls-start-playback-button,
        .videoAnim video::-webkit-media-controls-overlay-play-button,
        .videoAnim video::-webkit-media-controls-fullscreen-button,
        .videoAnim video::-webkit-media-controls-wireless-playback-picker-button,
        .videoAnim video::-webkit-media-controls-picture-in-picture-button,
        .videoAnim video::-webkit-full-page-media::-webkit-media-controls-panel {
            display: none !important;
            opacity: 0 !important;
            visibility: hidden !important;
        }

        /* iOS Spécifique */
        @supports (-webkit-touch-callout: none) {
            .videoAnim video {
                -webkit-playsinline: true !important;
                playsinline: true !important;
                -webkit-video-presentationmode: inline !important;
                pointer-events: none !important;
            }
            
            .videoAnim {
                pointer-events: auto !important;
                overflow: hidden !important;
                -webkit-mask-image: -webkit-radial-gradient(white, black) !important;
                -webkit-transform: translateZ(0) !important;
                transform: translateZ(0) !important;
                background: transparent !important;
            }
        }
        `;
    }
    executeParallaxScripts(doc) {
        const scripts = doc.querySelectorAll('script');
        scripts.forEach(script => {
            if (script.src) {
                if (script.src.includes('jquery')) {
                    console.log('Script jQuery ignoré:', script.src);
                    return;
                }
                const newScript = document.createElement('script');
                newScript.src = script.src.replace(/global\//, './assets/parallaxe/global/');
                newScript.setAttribute('data-parallax-script', 'true');
                console.log('Chargement script externe:', newScript.src);
                document.head.appendChild(newScript);
            }
            else if (script.textContent) {
                console.log('Script inline trouvé, exécution dans 1.5s...');
                setTimeout(() => {
                    try {
                        if (typeof window.$ !== 'undefined' && window.$.fn.parallax) {
                            console.log('jQuery et plugin parallax disponibles, exécution du script...');
                            const func = new Function(script.textContent || '');
                            func();
                        }
                        else {
                            console.error('jQuery ou plugin parallax non disponible:', {
                                jQuery: typeof window.$,
                                parallax: window.$ ? typeof window.$.fn.parallax : 'undefined'
                            });
                        }
                    }
                    catch (error) {
                        console.error('Erreur lors de l\'exécution du script:', error);
                    }
                }, 1500);
            }
        });
    }
    fixiOSVideos() {
        console.log('Application des fixes iOS...');
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        if (isIOS) {
            console.log('iOS détecté, application des fixes vidéo...');
            // Attendre que les vidéos soient chargées
            setTimeout(() => {
                const videos = document.querySelectorAll('.videoAnim video');
                console.log(`${videos.length} vidéos trouvées pour fix iOS`);
                videos.forEach((video, index) => {
                    console.log(`Fix iOS pour vidéo ${index + 1}:`, video.src);
                    // Attributs iOS critiques
                    video.setAttribute('playsinline', 'true');
                    video.setAttribute('webkit-playsinline', 'true');
                    video.setAttribute('disablePictureInPicture', 'true');
                    video.setAttribute('x-webkit-airplay', 'deny');
                    video.setAttribute('controlslist', 'nodownload nofullscreen noremoteplayback');
                    video.controls = false;
                    // Empêcher tous les événements tactiles iOS
                    video.addEventListener('touchstart', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }, { passive: false });
                    video.addEventListener('touchmove', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }, { passive: false });
                    video.addEventListener('touchend', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }, { passive: false });
                    // Empêcher fullscreen iOS
                    video.addEventListener('webkitbeginfullscreen', (e) => {
                        console.log('Tentative fullscreen bloquée pour vidéo:', video.src);
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    });
                    // Empêcher les gestes de présentation
                    video.addEventListener('webkitpresentationmodechanged', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    });
                    // Force la lecture immédiate sur iOS
                    video.addEventListener('loadeddata', () => {
                        console.log('Vidéo chargée, tentative de lecture:', video.src);
                        video.play().catch((error) => {
                            console.log('Autoplay bloqué, attente interaction utilisateur:', error);
                            // Si autoplay bloqué, retry après interaction utilisateur
                            const playOnTouch = () => {
                                video.play();
                                document.removeEventListener('touchstart', playOnTouch);
                            };
                            document.addEventListener('touchstart', playOnTouch, { once: true });
                        });
                    });
                    // Empêcher menu contextuel
                    video.addEventListener('contextmenu', (e) => {
                        e.preventDefault();
                        return false;
                    });
                });
            }, 500); // Délai pour s'assurer que le DOM est prêt
        }
        else {
            console.log('Non-iOS détecté, pas de fix spécifique nécessaire');
        }
    }
    renderFallback() {
        this.appElement.innerHTML = `
            <div id="scroll" class="screen scroll-screen">
                <div class="scroll-navigation">
                    <div class="nav-icon" id="back-btn" title="Retour">
                        <img src="./assets/buttons/retour1.png" alt="Retour">
                    </div>
                    <div class="nav-icon" id="grid-btn" title="Grille">⊞</div>
                </div>
                
                <div class="error-message">
                    <h2>Mode parallaxe indisponible</h2>
                    <p>Impossible de charger le contenu de la période ${this.gameState.currentPeriod}</p>
                    <p>Vérifiez que les fichiers sont dans assets/parallaxe/</p>
                </div>
            </div>
        `;
    }
    bindEvents() {
        this.eventBinder.bindEvents('scroll', [
            {
                selector: '#back-btn',
                event: 'click',
                handler: () => this.goBack()
            },
            {
                selector: '#grid-btn',
                event: 'click',
                handler: () => this.screenManager.navigateToScreen('grid')
            }
        ]);
        setTimeout(() => {
            this.bindParallaxEvents();
        }, 500);
    }
    bindParallaxEvents() {
        const animalElements = this.appElement.querySelectorAll('[data-animal-id], .clickable-animal, .animal-zone, .videoAnim');
        animalElements.forEach(element => {
            element.addEventListener('click', (e) => this.selectAnimalFromParallax(e));
        });
    }
    selectAnimalFromParallax(e) {
        const target = e.currentTarget;
        const animalId = target.dataset.animalId || target.getAttribute('data-animal') || target.id;
        if (animalId) {
            console.log('Animal sélectionné dans le parallaxe:', animalId);
            // Ici mapper vers vos données d'animaux
        }
    }
    goBack() {
        if (this.gameState.currentAnimal) {
            this.screenManager.navigateToScreen('species');
        }
        else {
            this.screenManager.navigateToScreen('home');
        }
    }
    cleanup() {
        const parallaxStyles = document.querySelectorAll('[data-parallax-style]');
        const parallaxScripts = document.querySelectorAll('[data-parallax-script]');
        parallaxStyles.forEach(style => style.remove());
        parallaxScripts.forEach(script => script.remove());
        delete window.navigateToSpecies;
        delete window.navigateToGrid;
        delete window.navigateToHome;
        delete window.setCurrentAnimal;
    }
}
//# sourceMappingURL=ScrollScreen.js.map