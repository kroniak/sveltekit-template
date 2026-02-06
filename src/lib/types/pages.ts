import type { Icon } from "@tabler/icons-svelte";
import type { PartialRecord } from "$lib/types/common";

export type PathParametersType = "query";

/**
 * Represents the metadata and configuration for a specific page in an application.
 *
 * This type is used to define the properties of a page, including its path,
 * title, optional description, and optional icon representation.
 *
 * All properties of this type are immutable.
 *
 * Properties:
 * - `pathTemplate`: A string defining the URL path template for the page, typically used for routing.
 * - `title`: A string specifying the title of the page, which may be displayed in headers or tabs.
 * - `description`: An optional string providing additional information about the page.
 * - `icon`: An optional `Icon` representing a visual indicator or logo for the page.
 */
export type PageDescription = Readonly<{
  pathTemplate: string;
  title: string;
  description?: string;
  hidePageHeader?: boolean;
  icon?: Icon;
  parent?: PageDescription;
}>;

/**
 * Represents a structure to define feature-specific routes for a web application.
 * This includes both page routes and API endpoints.
 *
 * @template T - A string literal type indicating the keys for page routes.
 *
 * @property {Record<T, PageDescription>} pages - A mapping of keys to page route configurations.
 */
export type FeatureDescription<T extends string> = Readonly<{
  pages: Record<T, PageDescription>;
}>;

/**
 * Represents a record type where the keys are of a specified `PathMatchesSegmentType`
 * and the values can be strings, undefined, or null. This type is defined as a
 * partial record, meaning that not all possible keys need to be present in an object
 * of this type, and the properties are optional.
 *
 * Used to map specific path match segments to their corresponding string values or
 * denote the absence of a value (via undefined or null).
 */
export type PathMatchesRecord = PartialRecord<
  PathParametersType,
  string | undefined | null | PartialRecord<string, string>
>;

/**
 * Represents a Page interface that extends the PageDescription. This interface
 * provides localization and path management for a specific page.
 *
 * The Page includes a mapping of localization keys to their corresponding values
 * and a method to retrieve the path of the page, optionally based on provided parameters.
 *
 * @interface
 * @extends PageDescription
 *
 * @method path
 * Retrieves the complete path for the page. The method can optionally take a
 * parameter to match and interpolate segments into the path.
 *
 * @param {PathMatchesRecord} [matches]
 * An optional parameter that contains the values to be interpolated into the page's path.
 *
 * @returns {string}
 * Returns the constructed path for the page.
 */
export interface Page extends PageDescription {
  readonly path: (matches?: PathMatchesRecord) => string;
}

/**
 * Interface representing a structure for feature routes that extends the FeatureRoutesDescription.
 *
 * @template T - A string type parameter representing the keys of feature routes.
 *
 * @extends FeatureDescription<T>
 *
 * @property {Record<T, Page>} pages - A mapping of route keys to their corresponding PageRoute definitions.
 */
export interface Feature<T extends string> extends Omit<FeatureDescription<T>, "pages"> {
  readonly pages: Record<T, Page>;
}
