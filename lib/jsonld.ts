// Serialise structured data for a <script type="application/ld+json"> tag.
// Escaping "<" stops any value from closing the script tag early (XSS-safe even if content later comes from a CMS).
export const jsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
