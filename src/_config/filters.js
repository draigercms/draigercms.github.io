import { DateTime } from "luxon";
import markdownit from "markdown-it";

export default function (eleventyConfig) {
  eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
    // Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
    return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(
      format || "dd LLLL yyyy"
    );
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    // dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  // Return the smallest number argument
  eleventyConfig.addFilter("min", (...numbers) => {
    return Math.min.apply(null, numbers);
  });

  // Remove leading './' from the path
  eleventyConfig.addFilter("sbObjectId", (inputPath) => {
    return inputPath.replace(/^\.\/+/, "");
  });

  // Parse markdown
  const md = new markdownit({
    html: true, // Allow HTML tags in Markdown content
  });
  eleventyConfig.addFilter("markdown", (markdownString) => {
    return md.render(markdownString);
  });

  // Remove trailing slash
  eleventyConfig.addFilter("trimTrailingSlash", function (url) {
    return url.replace(/\/+$/, "");
  });
}
