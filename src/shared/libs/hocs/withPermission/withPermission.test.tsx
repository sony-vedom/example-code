import React, { ReactNode } from "react";
import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { withPermission } from "./withPermission";

const TestComponent: React.FC<{ content: string }> = ({ content }) => <div>{content}</div>;

const renderWithPermission = (isAccessAllowed: boolean, fallback: ReactNode, content: string) => {
    const ComponentWithPermission = withPermission(TestComponent, fallback);
    return render(
        <ComponentWithPermission
            isAccessAllowed={isAccessAllowed}
            content={content}
        />
    );
};

describe("withPermission HOC", () => {
    test("renders the wrapped component when access is allowed", () => {
        const { getByText } = renderWithPermission(true, null, "Accessible Content");
        expect(getByText("Accessible Content")).toBeInTheDocument();
    });

    test("renders the fallback when access is not allowed and fallback is provided", () => {
        const { getByText } = renderWithPermission(false, <div>Access Denied</div>, "Restricted Content");
        expect(getByText("Access Denied")).toBeInTheDocument();
        expect(() => getByText("Restricted Content")).toThrow();
    });

    test("renders nothing when access is not allowed and no fallback is provided", () => {
        const { container } = renderWithPermission(false, null, "Hidden Content");
        expect(container.firstChild).toBeNull();
    });

    test("renders multiple elements when access is allowed", () => {
        const MultiChildComponent: React.FC = () => (
            <>
                <div>Child One</div>
                <div>Child Two</div>
            </>
        );

        const MultiChildComponentWithPermission = withPermission(MultiChildComponent, null);

        const { getByText } = render(<MultiChildComponentWithPermission isAccessAllowed={true} />);

        expect(getByText("Child One")).toBeInTheDocument();
        expect(getByText("Child Two")).toBeInTheDocument();
    });
});
