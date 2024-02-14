/**
 * Represents an input with a title and description.
 * @typedef {Object} Input
 * @property {string} title - The title of the input.
 * @property {string} description - The description of the input.
 */

/**
 * Represents a checkbox item with a label and a value indicating whether it's checked.
 * @typedef {Object} CheckBoxItem
 * @property {string} label - The label of the checkbox.
 * @property {boolean} value - The checked state of the checkbox.
 */

/**
 * Represents a radial option with a name and rating.
 * @typedef {Object} Radial
 * @property {string} name - The name of the radial option.
 * @property {number} rating - The rating value of the radial option.
 */

/**
 * Represents the state of a form, including arrays of inputs, checkboxes, and radials.
 * @typedef {Object} FormState
 * @property {Input[]} input - An array of inputs.
 * @property {CheckBoxItem[]} checkbox - An array of checkbox items.
 * @property {Radial[]} radial - An array of radials.
 */
