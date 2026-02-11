import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

/**
 * Project Scanner Module
 * Scans project directory and generates a structured context summary.
 * 
 * Proje Tarayıcı Modülü
 * Proje dizinini tarar ve yapılandırılmış bağlam özeti oluşturur.
 * 
 * @module ProjectScanner
 */

/** Directories to always ignore during scanning */
const IGNORE_DIRS = [
    'node_modules', '.git', '.next', 'dist', 'build', '.cache',
    '.mai', '__pycache__', '.vscode', '.idea', 'coverage', '.nuxt'
];

/** Known framework detection rules: dependency name → framework label */
const FRAMEWORK_MAP = {
    'next': 'Next.js',
    'react': 'React',
    'vue': 'Vue.js',
    'nuxt': 'Nuxt.js',
    'angular': 'Angular',
    'svelte': 'Svelte',
    'express': 'Express.js',
    'fastify': 'Fastify',
    'nestjs': 'NestJS',
    '@nestjs/core': 'NestJS',
    'hono': 'Hono',
    'django': 'Django',
    'flask': 'Flask',
    'laravel': 'Laravel',
    'tailwindcss': 'TailwindCSS',
    '@chakra-ui/react': 'Chakra UI',
    'prisma': 'Prisma ORM',
    'drizzle-orm': 'Drizzle ORM',
    'mongoose': 'Mongoose',
    'supabase': 'Supabase',
    '@supabase/supabase-js': 'Supabase',
    'firebase': 'Firebase',
    'commander': 'Commander.js (CLI)',
    'inquirer': 'Inquirer.js (Interactive)',
    'typescript': 'TypeScript',
};

/**
 * Scans the target directory and returns a ProjectContext object.
 * @param {string} targetDir - The root directory to scan.
 * @returns {Promise<object>} ProjectContext
 */
export async function scanProject(targetDir) {
    const context = {
        name: path.basename(targetDir),
        path: targetDir,
        scannedAt: new Date().toISOString(),
        packageManager: null,
        language: null,
        frameworks: [],
        dependencies: [],
        devDependencies: [],
        scripts: {},
        fileTree: [],
        stats: { files: 0, directories: 0 }
    };

    // --- 1. Detect Package Manager & Read package.json ---
    const pkgPath = path.join(targetDir, 'package.json');
    if (await fs.pathExists(pkgPath)) {
        const pkg = await fs.readJson(pkgPath);
        context.name = pkg.name || context.name;
        context.packageManager = 'npm';
        context.language = 'JavaScript/Node.js';
        context.scripts = pkg.scripts || {};

        // Detect lock files for package manager
        if (await fs.pathExists(path.join(targetDir, 'pnpm-lock.yaml'))) {
            context.packageManager = 'pnpm';
        } else if (await fs.pathExists(path.join(targetDir, 'yarn.lock'))) {
            context.packageManager = 'yarn';
        } else if (await fs.pathExists(path.join(targetDir, 'bun.lockb'))) {
            context.packageManager = 'bun';
        }

        // Collect dependencies
        const deps = Object.keys(pkg.dependencies || {});
        const devDeps = Object.keys(pkg.devDependencies || {});
        context.dependencies = deps;
        context.devDependencies = devDeps;

        // Detect TypeScript
        if (devDeps.includes('typescript') || deps.includes('typescript')) {
            context.language = 'TypeScript/Node.js';
        }

        // Detect Frameworks
        const allDeps = [...deps, ...devDeps];
        for (const dep of allDeps) {
            if (FRAMEWORK_MAP[dep]) {
                context.frameworks.push(FRAMEWORK_MAP[dep]);
            }
        }
        // Deduplicate
        context.frameworks = [...new Set(context.frameworks)];
    }

    // --- 2. Check for Python ---
    if (await fs.pathExists(path.join(targetDir, 'requirements.txt'))) {
        context.language = context.language || 'Python';
    }
    if (await fs.pathExists(path.join(targetDir, 'pyproject.toml'))) {
        context.language = context.language || 'Python';
    }

    // --- 3. Build File Tree (max 3 levels) ---
    context.fileTree = await buildFileTree(targetDir, 0, 3);

    // --- 4. Count Stats ---
    countStats(context.fileTree, context.stats);

    return context;
}

/**
 * Recursively builds a file tree array.
 * @param {string} dir 
 * @param {number} depth 
 * @param {number} maxDepth 
 */
async function buildFileTree(dir, depth, maxDepth) {
    if (depth >= maxDepth) return [];

    const entries = await fs.readdir(dir, { withFileTypes: true });
    const tree = [];

    for (const entry of entries) {
        if (IGNORE_DIRS.includes(entry.name)) continue;
        if (entry.name.startsWith('.') && depth === 0 && entry.name !== '.env.example') continue;

        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            const children = await buildFileTree(fullPath, depth + 1, maxDepth);
            tree.push({ name: entry.name, type: 'dir', children });
        } else {
            tree.push({ name: entry.name, type: 'file' });
        }
    }

    return tree;
}

/**
 * Counts files and directories recursively.
 */
function countStats(tree, stats) {
    for (const item of tree) {
        if (item.type === 'dir') {
            stats.directories++;
            if (item.children) countStats(item.children, stats);
        } else {
            stats.files++;
        }
    }
}

/**
 * Formats ProjectContext into a concise markdown string for LLM injection.
 * @param {object} ctx - ProjectContext object
 * @returns {string} Markdown summary
 */
export function formatContext(ctx) {
    let md = `## 🔍 Project Context (Auto-Generated)\n\n`;
    md += `| Field | Value |\n|-------|-------|\n`;
    md += `| **Project** | ${ctx.name} |\n`;
    md += `| **Language** | ${ctx.language || 'Unknown'} |\n`;
    md += `| **Package Manager** | ${ctx.packageManager || 'N/A'} |\n`;
    md += `| **Frameworks** | ${ctx.frameworks.length > 0 ? ctx.frameworks.join(', ') : 'None detected'} |\n`;
    md += `| **Files** | ${ctx.stats.files} files, ${ctx.stats.directories} dirs |\n`;

    if (Object.keys(ctx.scripts).length > 0) {
        md += `\n### Available Scripts\n`;
        for (const [name, cmd] of Object.entries(ctx.scripts)) {
            md += `- \`${name}\`: \`${cmd}\`\n`;
        }
    }

    md += `\n### File Structure\n\`\`\`\n`;
    md += renderTree(ctx.fileTree, '');
    md += `\`\`\`\n`;

    return md;
}

/**
 * Renders the file tree as an indented text string.
 */
function renderTree(tree, indent) {
    let result = '';
    for (const item of tree) {
        if (item.type === 'dir') {
            result += `${indent}📁 ${item.name}/\n`;
            if (item.children) {
                result += renderTree(item.children, indent + '  ');
            }
        } else {
            result += `${indent}📄 ${item.name}\n`;
        }
    }
    return result;
}

/**
 * Saves the context to .mai/context.json for caching.
 * @param {string} targetDir 
 * @param {object} ctx 
 */
export async function saveContext(targetDir, ctx) {
    const maiDir = path.join(targetDir, '.mai');
    await fs.ensureDir(maiDir);
    await fs.writeJson(path.join(maiDir, 'context.json'), ctx, { spaces: 2 });
}

/**
 * Loads cached context if available.
 * @param {string} targetDir 
 * @returns {object|null}
 */
export async function loadContext(targetDir) {
    const contextPath = path.join(targetDir, '.mai', 'context.json');
    if (await fs.pathExists(contextPath)) {
        return fs.readJson(contextPath);
    }
    return null;
}
