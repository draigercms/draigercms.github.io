import path from "path";
import { fileURLToPath } from "url";
import {
  IdAttributePlugin,
  InputPathToUrlTransformPlugin,
  HtmlBasePlugin,
} from "@11ty/eleventy";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

import pluginFilters from "./src/_config/filters.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function (eleventyConfig) {
  // Drafts, see also _data/eleventyDataSchema.js
  eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
    if (data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
      return false;
    }
  });

  // Copy the contents of the `public` folder to the output folder
  // For example, `./public/css/` ends up in `_site/css/`
  eleventyConfig.addPassthroughCopy({
    "./public/": "/",
  });

  // Run Eleventy when these files change:
  // https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

  eleventyConfig.addWatchTarget("./src/css/");

  // Watch content images for the image pipeline.
  eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpeg}");

  // Official plugins
  eleventyConfig.addPlugin(pluginSyntaxHighlight, {
    preAttributes: { tabindex: 0 },
  });
  eleventyConfig.addPlugin(HtmlBasePlugin);
  eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);

  // Image optimization: https://www.11ty.dev/docs/plugins/image/#eleventy-transform
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    // File extensions to process in _site folder
    extensions: "html",

    // Output formats for each image.
    formats: ["avif", "webp", "auto"],

    // widths: ["auto"],

    defaultAttributes: {
      // e.g. <img loading decoding> assigned on the HTML tag will override these values.
      loading: "lazy",
      decoding: "async",
    },
  });

  // Filters
  eleventyConfig.addPlugin(pluginFilters);

  eleventyConfig.addPlugin(IdAttributePlugin, {
    // by default we use Eleventy’s built-in `slugify` filter:
    // slugify: eleventyConfig.getFilter("slugify"),
    // selector: "h1,h2,h3,h4,h5,h6", // default
  });

  // Features to make your build faster (when you need them)

  // If your passthrough copy gets heavy and cumbersome, add this line
  // to emulate the file copy on the dev server. Learn more:
  // https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve

  //eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

  eleventyConfig.addGlobalData("siteConfigFilePath", () => {
    const jsonFileAbsolutePath = path.resolve("src/_data/metadata.json");

    // Calculate the relative path from the project directory
    const relativePath = path.relative(process.cwd(), jsonFileAbsolutePath);

    return relativePath; // Return the relative path
  });
}

export const config = {
  // Control which files Eleventy will process
  // e.g.: *.md, *.njk, *.html, *.liquid
  templateFormats: ["md", "njk", "html", "liquid", "11ty.js"],

  // Pre-process *.md files with: (default: `liquid`)
  markdownTemplateEngine: "njk",

  // Pre-process *.html files with: (default: `liquid`)
  htmlTemplateEngine: "njk",

  // These are all optional:
  dir: {
    input: "./src/content", // default: "."
    includes: "../_includes", // default: "_includes" (`input` relative)
    data: "../_data", // default: "_data" (`input` relative)
    output: "_site",
  },
};
