export class EventBinder {
    private static instance: EventBinder;
    private eventListeners: Map<string, Array<{ element: Element, event: string, handler: EventListener }>> = new Map();

    static getInstance(): EventBinder {
        if (!EventBinder.instance) {
            EventBinder.instance = new EventBinder();
        }
        return EventBinder.instance;
    }

    bindEvent(screenId: string, element: Element, event: string, handler: EventListener): void {
        if (!this.eventListeners.has(screenId)) {
            this.eventListeners.set(screenId, []);
        }
        
        element.addEventListener(event, handler);
        this.eventListeners.get(screenId)!.push({ element, event, handler });
    }

    bindEvents(screenId: string, bindings: Array<{ selector: string, event: string, handler: EventListener }>): void {
        bindings.forEach(({ selector, event, handler }) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                this.bindEvent(screenId, element, event, handler);
            });
        });
    }

    cleanupScreen(screenId: string): void {
        const listeners = this.eventListeners.get(screenId);
        if (listeners) {
            listeners.forEach(({ element, event, handler }) => {
                element.removeEventListener(event, handler);
            });
            this.eventListeners.delete(screenId);
        }
    }

    cleanupAll(): void {
        this.eventListeners.forEach((listeners, screenId) => {
            this.cleanupScreen(screenId);
        });
    }
}