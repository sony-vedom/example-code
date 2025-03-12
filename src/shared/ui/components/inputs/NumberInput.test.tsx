import { ReactNode } from "react";
import { render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { NumberInput } from "./NumberInput";

const renderComponent = (node: ReactNode) => {
    const { getByText } = render(node);
    const component = getByText((_, el) => el.tagName === "INPUT");
    return component;
};

describe("NumberInput component", () => {
    test("renders children", () => {
        const { getByText } = render(<NumberInput>Click me</NumberInput>);
        expect(getByText("Click me")).toBeInTheDocument();
    });

    test("renders with disabled state", () => {
        const component = renderComponent(<NumberInput disabled />);
        expect(component).toBeDisabled();
    });
    test("entering numbers", async () => {
        const component = renderComponent(<NumberInput />);
        await userEvent.type(component, "123");
        expect(component).toHaveValue("123");
    });
    test("entering non-numbers", async () => {
        const handleError = vi.fn();
        const component = renderComponent(<NumberInput onError={handleError} />);

        await userEvent.type(component, "abc");

        expect(handleError).toHaveBeenCalled();
        expect(handleError).toHaveBeenCalledWith("Значение не является числом");
    });
    test("entering numbers and non-numbers", async () => {
        const component = renderComponent(<NumberInput />);
        await userEvent.type(component, "123abc");
        expect(component).toHaveValue("123");
    });
    test("entering a negative number", async () => {
        const component = renderComponent(<NumberInput />);
        await userEvent.type(component, "-123");
        expect(component).toHaveDisplayValue("-123");
    });
    test("entering a decimal number without enabling their support", async () => {
        const component = renderComponent(<NumberInput />);
        await userEvent.type(component, "-12.3");
        expect(component).toHaveValue("-123");
    });
    test("entering a decimal number with their support enabled", async () => {
        const component = renderComponent(<NumberInput numberType="float" />);
        await userEvent.type(component, "12.3");
        expect(component).toHaveValue("12.3");
    });
});
