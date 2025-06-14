export declare class EventBinder {
    private static instance;
    private eventListeners;
    static getInstance(): EventBinder;
    bindEvent(screenId: string, element: Element, event: string, handler: EventListener): void;
    bindEvents(screenId: string, bindings: Array<{
        selector: string;
        event: string;
        handler: EventListener;
    }>): void;
    cleanupScreen(screenId: string): void;
    cleanupAll(): void;
}
