import React from "react";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Preloader } from "./Preloader";

describe("Preloader component", () => {
    it("renders with custom className", () => {
        const { container } = render(<Preloader className="custom-class" />);
        expect(container.querySelector(".custom-class")).toBeInTheDocument();
    });

    it("has correct data-component attribute", () => {
        const { container } = render(<Preloader />);
        expect(container.querySelector('[data-component="preloader"]')).toBeInTheDocument();
    });
});
