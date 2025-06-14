export class EventBinder {
    constructor() {
        this.eventListeners = new Map();
    }
    static getInstance() {
        if (!EventBinder.instance) {
            EventBinder.instance = new EventBinder();
        }
        return EventBinder.instance;
    }
    bindEvent(screenId, element, event, handler) {
        if (!this.eventListeners.has(screenId)) {
            this.eventListeners.set(screenId, []);
        }
        element.addEventListener(event, handler);
        this.eventListeners.get(screenId).push({ element, event, handler });
    }
    bindEvents(screenId, bindings) {
        bindings.forEach(({ selector, event, handler }) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                this.bindEvent(screenId, element, event, handler);
            });
        });
    }
    cleanupScreen(screenId) {
        const listeners = this.eventListeners.get(screenId);
        if (listeners) {
            listeners.forEach(({ element, event, handler }) => {
                element.removeEventListener(event, handler);
            });
            this.eventListeners.delete(screenId);
        }
    }
    cleanupAll() {
        this.eventListeners.forEach((listeners, screenId) => {
            this.cleanupScreen(screenId);
        });
    }
}
