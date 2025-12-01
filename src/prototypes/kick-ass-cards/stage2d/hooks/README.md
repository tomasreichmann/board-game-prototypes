# Stage2D Layout System

This folder contains the core logic for managing 2D layouts of components (like cards) on a virtual stage. It is designed to be flexible, performant, and easy to extend with new layout types.

The system works by calculating `transform` properties (`panX`, `panY`, `rotateZ`, etc.) for items based on their assigned layout, without wrapping them in additional DOM elements. This is crucial for enabling smooth animations (e.g., with `framer-motion`) between different layouts.

## Folder Structure

-   `./hooks/`: Contains React hooks that provide an interface to the layout system.
-   `./types.ts`: Defines the TypeScript types and interfaces for layouts (e.g., `GridLayoutProps`, `LayoutsMap`).
-   `./utils/`: Contains pure utility functions that perform the actual transform calculations for each layout type (e.g., `getGridCardTransform`).

## Core Concepts

### `useLayoutManager` Hook

This is the primary hook for using the layout system.

-   **Input**: It takes a `LayoutsMap` object, which is a dictionary where keys are unique layout IDs and values are layout definition objects (e.g., `{ type: 'grid', ... }`).
-   **Output**: It returns an object containing a `getCardTransform` function.

### `getCardTransform` Function

This function is the workhorse for positioning individual items.

-   **Input**: It takes a `layoutId` (string) and a `cardIndex` (number).
-   **Output**: It returns a partial `Frame2dProps` object with the calculated transform properties (e.g., `{ panX: 100, panY: 250 }`).

## How to Use

1.  **Define Layouts**: In your component, create a `LayoutsMap` object defining all possible layouts (e.g., player hands, draw pile, discard pile). It's recommended to memoize this object with `useMemo`.
2.  **Instantiate Hook**: Call `useLayoutManager` with your layouts map to get the `getCardTransform` function.
3.  **Assign Transforms**: In your render logic, map over your items (cards). For each item, call `getCardTransform` with the item's assigned `layoutId` and its index within that layout.
4.  **Apply Props**: Spread the returned transform props onto a `Frame2d` component that wraps your item.

This architecture keeps layout logic decoupled from rendering components, making the system scalable and easy to maintain.
