import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Updates the local project with the latest templates and definitions from the global package.
 * @param {string} projectRoot 
 */
export async function updateProject(projectRoot) {
    console.log(chalk.cyan(`\n🔄 Updating MAI Agents in ${projectRoot}...`));

    try {
        const templateDir = path.resolve(__dirname, '../templates/base');
        const docsSrc = path.resolve(__dirname, '../docs');

        // 1. Update .agent directory (workflows, agents, skills)
        const agentSrc = path.join(templateDir, '.agent');
        const agentDest = path.join(projectRoot, '.agent');

        if (fs.existsSync(agentSrc)) {
            await fs.copy(agentSrc, agentDest, { overwrite: true });
            console.log(chalk.green('✔ Agents, Workflows & Skills updated.'));
        }

        // 2. Update Docs
        const docsDest = path.join(projectRoot, 'docs');
        if (fs.existsSync(docsSrc)) {
            await fs.copy(docsSrc, docsDest, { overwrite: true });
            console.log(chalk.green('✔ Documentation updated.'));
        }

        console.log(chalk.green.bold('\n✅ Project successfully updated to latest version.'));
        console.log(chalk.gray('Your MAI_MEMORY.md and other configs were preserved.'));

    } catch (error) {
        console.error(chalk.red('❌ Update failed:'), error);
    }
}
