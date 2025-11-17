/**
 * Convert a kebab-case (or snake_case) string into Title Case.
 *
 * Examples:
 *  - "foo-bar-baz" -> "Foo Bar Baz"
 *  - "hello_world"  -> "Hello World"
 *  - "--lead--dash" -> "Lead Dash"
 *
 * Returns an empty string for falsy input.
 */
export default function kebabCaseToTitleCase(input: string | null | undefined): string {
    if (!input) return "";

    // Split on one or more dashes/underscores/spaces, filter out empty segments
    const parts = input
        .trim()
        .split(/[-_\s]+/)
        .filter(Boolean);

    return parts
        .map((part) => {
            const lower = part.toLowerCase();
            return lower.charAt(0).toUpperCase() + lower.slice(1);
        })
        .join(" ");
}
