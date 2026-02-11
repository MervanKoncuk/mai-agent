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

        // 1. Update Workflows (Overwrite is necessary to get fixes)
        const workflowsSrc = path.join(templateDir, 'workflows');
        const workflowsDest = path.join(projectRoot, 'workflows');

        if (fs.existsSync(workflowsSrc)) {
            await fs.copy(workflowsSrc, workflowsDest, { overwrite: true });
            console.log(chalk.green('✔ Workflows updated (bug fixes applied).'));
        }

        // 2. Update Docs
        const docsDest = path.join(projectRoot, 'docs');
        if (fs.existsSync(docsSrc)) {
            await fs.copy(docsSrc, docsDest, { overwrite: true });
            console.log(chalk.green('✔ Documentation updated.'));
        }

        // 3. Update Skills (Optional, but good for new capabilities)
        const skillsSrc = path.join(templateDir, 'skills');
        const skillsDest = path.join(projectRoot, 'skills');
        if (fs.existsSync(skillsSrc)) {
            await fs.copy(skillsSrc, skillsDest, { overwrite: false }); // Don't overwrite user changes in skills
            console.log(chalk.green('✔ Skills folder refreshed (new skills added).'));
        }

        console.log(chalk.green.bold('\n✅ Project successfully updated to latest version.'));
        console.log(chalk.gray('Your MAI_MEMORY.md and other configs were preserved.'));

    } catch (error) {
        console.error(chalk.red('❌ Update failed:'), error);
    }
}
