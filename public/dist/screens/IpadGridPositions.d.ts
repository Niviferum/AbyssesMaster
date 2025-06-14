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
declare const IPAD_GRID_POSITIONS: GridPositions;
declare function getGridPosition(period: 'E1' | 'E2' | 'E3', row: number, col: number): Position | undefined;
declare function getGridPositionSafe(period: 'E1' | 'E2' | 'E3', row: number, col: number): Position | null;
declare const ANIMAL_POSITIONS_IPAD: Record<string, Position>;
declare const IPAD_REFERENCE: {
    readonly screenWidth: 1366;
    readonly screenHeight: 1024;
    readonly gridStartX: 150;
    readonly gridStartY: 190;
    readonly cellWidth: 105;
    readonly cellHeight: 105;
    readonly cellBorder: 13;
    readonly cellStep: 118;
    readonly gridSpacing: 80;
    readonly gridWidth: 341;
    readonly totalGridSpacing: 421;
};
export { IPAD_GRID_POSITIONS, getGridPosition, getGridPositionSafe, ANIMAL_POSITIONS_IPAD, IPAD_REFERENCE, type Position, type GridPositions, type PeriodGrid };
