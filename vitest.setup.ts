import "vitest-dom/extend-expect";
import "@testing-library/jest-dom";
import { vi } from "vitest";

/* @ts-ignore */
HTMLCanvasElement.prototype.getContext = () => {
    return {
        fillStyle: "",
        fillRect: vi.fn(),
    };
};
