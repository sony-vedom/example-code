import { ReactNode } from "react";
import { fireEvent, render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { Button } from "./Button";

const renderButton = (node: ReactNode) => {
    const { getByText } = render(node);
    const btn = getByText((_, el) => el.tagName === "BUTTON");
    return btn;
};

describe("Button component", () => {
    test("renders children", () => {
        const { getByText } = render(<Button>Click me</Button>);
        expect(getByText("Click me")).toBeInTheDocument();
    });

    test("renders with disabled state", () => {
        const btn = renderButton(<Button disabled>Click me</Button>);
        expect(btn).toBeDisabled();
    });

    test("renders with loading state", () => {
        const { getByText } = render(<Button isLoading>Click me</Button>);
        const preloader = getByText((_, element) => {
            return element.getAttribute("data-component") === "preloader";
        });

        expect(preloader).toBeInTheDocument();
    });

    test("calls onClick handler", () => {
        const onClick = vi.fn();
        const btn = renderButton(<Button onClick={onClick}>Click me</Button>);
        fireEvent.click(btn);
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    test("renders with custom className", () => {
        const btn = renderButton(<Button className="custom-class">Click me</Button>);
        expect(btn).toHaveClass("custom-class");
    });

    test("renders with type attribute", () => {
        const btn = renderButton(<Button type="submit">Click me</Button>);
        expect(btn).toHaveAttribute("type", "submit");
    });

    test("renders with default data-component attribute", () => {
        const btn = renderButton(<Button>Click me</Button>);
        expect(btn).toHaveAttribute("data-component", "button");
    });

    test("renders with custom data-component attribute", () => {
        const btn = renderButton(<Button data-component="custom-component">Click me</Button>);
        expect(btn).toHaveAttribute("data-component", "custom-component");
    });
});
