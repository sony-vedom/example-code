/**
 * Configuration options for tooltips.
 */
type TooltipDefaultsTypes = {
    /**
     * The margin between the tooltip and the trigger element
     */
    margin: number;
    /**
     * The maximum tooltip width to be applied
     */
    maxWidth: number;
    /**
     * The delay in ms before the tooltip appears after hovering
     */
    appearingDelay: number;
    /**
     * The duration of the appearing animation in ms
     */
    transitionDuration: number;
    /**
     * Will tooltips be visible or won't
     */
    hideTooltips: boolean;
};

/**
 * Default configuration options for tooltips.
 * @constant
 * @type {Readonly<TooltipDefaultsTypes>}
 * @default
 */
export const TooltipDefaults: Readonly<TooltipDefaultsTypes> = {
    margin: 5,
    maxWidth: 200,
    appearingDelay: 50,
    transitionDuration: 300,
    hideTooltips: false,
};
