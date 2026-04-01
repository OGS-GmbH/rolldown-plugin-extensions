/**
 * Mapping of file extensions to a different file extension.
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 * @category Types
 */
type Extensions = Record<string, string>;

/**
 * Options for the extensions plugin.
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 * @category Types
 */
type Options = {
  /**
   * Mapping of file extensions. See {@link Extensions}.
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  extensions?: Extensions;
  /**
   * Default extension to add to imports without an extension. Defaults to `.js`.
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  defaultExtension?: string;
};

export type { Extensions, Options };
