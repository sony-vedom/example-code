import { createPortal } from "react-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { cn, useToastStore } from "shared/libs";
import { Toast } from "./Toast";

export const Toasts = () => {
    const toasts = useToastStore((state) => state.toasts);

    return createPortal(
        <TransitionGroup
            appear
            component="ol"
            className={cn(
                toasts.length > 0
                    ? "scrollbar-hidden fixed right-0 top-0 z-50 grid max-h-dvh content-start justify-items-end gap-0 overflow-x-scroll pb-10 pl-10 pr-6 pt-3"
                    : "hidden"
            )}
        >
            {toasts.map((toast) => (
                <CSSTransition
                    appear
                    key={toast.id}
                    timeout={{
                        enter: 500,
                        exit: 500,
                    }}
                    classNames="transition-toast"
                >
                    <li key={toast.id}>
                        <Toast
                            id={toast.id}
                            type={toast.type}
                        >
                            {toast.content}
                        </Toast>
                    </li>
                </CSSTransition>
            ))}
        </TransitionGroup>,
        document.getElementById("portal-toast")
    );
};
