import { render, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Info } from "./Info";

describe("Info component", () => {
    it("renders title correctly", () => {
        const title = "Test Title";
        const { getByText } = render(<Info>{title}</Info>);
        expect(getByText(title)).toBeInTheDocument();
    });

    it("renders tag correctly", () => {
        const tag = "output";
        const { getByText } = render(<Info tag={tag}>Test Title</Info>);

        const component = getByText("Test Title");
        expect(component).toBeInTheDocument();
        expect(component.tagName).toBe("OUTPUT");
    });

    it("displays message for a specified duration", async () => {
        const displayDuration = 1000;
        const { getByText, queryByText } = render(<Info displayDuration={displayDuration}>Test Title</Info>);
        await new Promise((resolve) => setTimeout(resolve, displayDuration));
        expect(getByText("Test Title")).toBeInTheDocument();
        await waitFor(() => expect(queryByText("Test Title")).not.toBeInTheDocument(), {
            timeout: displayDuration + 100,
        });
    });

    it("default attribute data-component", async () => {
        const { getByText } = render(<Info>Test Title</Info>);
        const component = getByText("Test Title");
        expect(component).toBeInTheDocument();
        expect(component.getAttribute("data-component")).toBe("Info");
    });

    it("specific attribute data-component", async () => {
        const { getByText } = render(<Info data-component="Test">Test Title</Info>);
        const component = getByText("Test Title");
        expect(component).toBeInTheDocument();
        expect(component.getAttribute("data-component")).toBe("Test");
    });
});
