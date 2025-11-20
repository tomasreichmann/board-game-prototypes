import fs from "fs";
import path from "path";
import { globSync } from "glob";
import matter from "gray-matter";
import { fileURLToPath } from "url";

// Helper to get the directory of the current script
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const encountersDir = path.resolve(__dirname);

console.log(`🔍 Scanning for MDX files in: ${encountersDir}`);

const globPattern = `${encountersDir.replace(/\\/g, "/")}/**/*.mdx`;
console.log(` glob pattern: ${globPattern}`);

const mdxFiles = globSync(globPattern, {
    ignore: `**/${path.basename(__filename)}`,
});

console.log(`🔎 Found ${mdxFiles.length} MDX file(s) to process.`);
if (mdxFiles.length > 0) {
    console.log(mdxFiles.map((f) => `  - ${path.relative(encountersDir, f)}`).join("\n"));
}

let filesUpdated = 0;

mdxFiles.forEach((file) => {
    const fileContent = fs.readFileSync(file, "utf8");
    const { data: frontmatter, content } = matter(fileContent);

    if (frontmatter.title && frontmatter.title.trim() !== "") {
        console.log(`⏩ Skipping ${path.basename(file)}, title already exists: "${frontmatter.title}"`);
        return;
    }

    // Find the first H1 heading in the content
    const headingMatch = content.match(/^#\s+(.*)/m);
    if (!headingMatch || !headingMatch[1]) {
        console.warn(`⚠️ No H1 heading found in ${path.basename(file)}, skipping.`);
        return;
    }

    const newTitle = headingMatch[1].trim();
    frontmatter.title = newTitle.replace(/"/g, '\\"'); // Escape double quotes

    // Re-assemble the file with the new frontmatter
    const newFileContent = matter.stringify(content, frontmatter);

    fs.writeFileSync(file, newFileContent, "utf8");
    console.log(`✅ Added title "${newTitle}" to ${path.basename(file)}`);
    filesUpdated++;
});

console.log(`\n✨ Done. Updated ${filesUpdated} file(s).`);
