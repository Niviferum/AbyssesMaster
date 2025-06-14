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
            // Charger jQuery en premier
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
            // Charger jQuery d'abord
            const jqueryScript = document.createElement('script');
            jqueryScript.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
            jqueryScript.onload = async () => {
                console.log('jQuery chargé');
                // Charger votre plugin Parallax local après jQuery
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
            // Mapping des époques vers les fichiers HTML
            'E1': '1-paleozoique.html',
            'E2': '2-mesozoique.html',
            'E3': '3-cenozoique.html',
            // Fallback pour les anciens noms si nécessaire
            'paleozoic': '1-paleozoique.html',
            'mesozoic': '2-mesozoique.html',
            'cenozoic': '3-cenozoique.html'
        };
    }
    async integrateParallaxHTML(htmlContent) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        // Extraire le contenu du body
        const bodyContent = doc.body.innerHTML;
        // Créer le HTML avec navigation
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
                /* Correction CSS pour les boutons de navigation */
                .scroll-navigation {
                    position: fixed !important;
                    top: 20px !important;
                    left: 20px !important;
                    z-index: 10000 !important; /* Plus élevé que le conteneur-nord */
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
                
                /* Ajustement du conteneur parallax si nécessaire */
                #conteneur-nord {
                    /* Réduire le z-index pour qu'il soit sous les boutons */
                    z-index: 1000 !important;
                }
                
                /* S'assurer que le scroll-screen ne masque rien */
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
        // Exposer les fonctions de navigation globalement pour vos HTML
        this.exposeNavigationFunctions();
        // Charger les styles (en adaptant les chemins)
        await this.loadParallaxStyles(doc);
        // Exécuter les scripts (après jQuery)
        setTimeout(() => {
            this.executeParallaxScripts(doc);
        }, 100);
    }
    exposeNavigationFunctions() {
        // Exposer les fonctions de navigation dans l'objet window
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
            // Ici vous pouvez mapper l'ID vers votre système d'animaux
            // const animal = getAnimalById(animalId);
            // if (animal) {
            //     this.gameState.currentAnimal = animal;
            // }
        };
    }
    fixAssetPaths(htmlContent) {
        // Corriger les chemins des assets pour qu'ils pointent vers votre structure
        return htmlContent
            // Corriger les chemins des images
            .replace(/src="([^"]*\.(?:png|jpg|jpeg|gif|webp))"/g, 'src="./assets/parallaxe/$1"')
            // Corriger les chemins des vidéos
            .replace(/src="([^"]*\.(?:webm|mp4|mov))"/g, 'src="./assets/parallaxe/$1"')
            // Corriger les chemins dans les styles inline
            .replace(/url\(([^)]*\.(?:png|jpg|jpeg|gif|webp))\)/g, 'url(./assets/parallaxe/$1)');
    }
    async loadParallaxStyles(doc) {
        const styleElements = doc.querySelectorAll('style');
        styleElements.forEach(styleEl => {
            const newStyle = document.createElement('style');
            // Corriger les chemins dans le CSS
            let cssContent = styleEl.textContent || '';
            cssContent = cssContent.replace(/url\(['"]?([^'"]*\.(?:png|jpg|jpeg|gif|webp))['"]?\)/g, 'url("./assets/parallaxe/$1")');
            newStyle.textContent = cssContent;
            newStyle.setAttribute('data-parallax-style', 'true');
            document.head.appendChild(newStyle);
        });
        // Essayer de charger les CSS externes (si elles existent)
        const linkElements = doc.querySelectorAll('link[rel="stylesheet"]');
        for (const link of linkElements) {
            try {
                const href = link.href;
                // Adapter le chemin si nécessaire
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
    executeParallaxScripts(doc) {
        const scripts = doc.querySelectorAll('script');
        scripts.forEach(script => {
            if (script.src) {
                // Ignorer complètement les scripts jQuery (on les a déjà chargés)
                if (script.src.includes('jquery')) {
                    console.log('Script jQuery ignoré:', script.src);
                    return;
                }
                // Charger les autres scripts externes
                const newScript = document.createElement('script');
                newScript.src = script.src.replace(/global\//, './assets/parallaxe/global/');
                newScript.setAttribute('data-parallax-script', 'true');
                console.log('Chargement script externe:', newScript.src);
                document.head.appendChild(newScript);
            }
            else if (script.textContent) {
                // Exécuter les scripts inline avec un délai suffisant
                console.log('Script inline trouvé, exécution dans 1.5s...');
                setTimeout(() => {
                    try {
                        // Vérifier que jQuery et le plugin sont disponibles avant exécution
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
                }, 1500); // Délai augmenté pour s'assurer du chargement complet
            }
        });
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
        // Lier les événements de parallaxe après un délai
        setTimeout(() => {
            this.bindParallaxEvents();
        }, 500);
    }
    bindParallaxEvents() {
        // Chercher les éléments cliquables dans le parallaxe
        const animalElements = this.appElement.querySelectorAll('[data-animal-id], .clickable-animal, .animal-zone');
        animalElements.forEach(element => {
            element.addEventListener('click', (e) => this.selectAnimalFromParallax(e));
        });
    }
    selectAnimalFromParallax(e) {
        const target = e.currentTarget;
        const animalId = target.dataset.animalId || target.getAttribute('data-animal') || target.id;
        if (animalId) {
            // Ici vous pourrez mapper vos IDs d'animaux du parallaxe vers vos données
            console.log('Animal sélectionné dans le parallaxe:', animalId);
            // this.gameState.currentAnimal = getAnimalById(animalId);
            // this.screenManager.navigateToScreen('species');
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
        // Nettoyer les styles et scripts ajoutés
        const parallaxStyles = document.querySelectorAll('[data-parallax-style]');
        const parallaxScripts = document.querySelectorAll('[data-parallax-script]');
        parallaxStyles.forEach(style => style.remove());
        parallaxScripts.forEach(script => script.remove());
        // Nettoyer les fonctions globales exposées
        delete window.navigateToSpecies;
        delete window.navigateToGrid;
        delete window.navigateToHome;
        delete window.setCurrentAnimal;
    }
}
//# sourceMappingURL=ScrollScreen.js.map