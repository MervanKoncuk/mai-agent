import fs from 'fs-extra';
import path from 'path';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Parses and executes MAI Workflow Markdown files.
 * @class WorkflowRunner
 */
export class WorkflowRunner {
    constructor() {
        this.projectRoot = process.cwd();
        this.workflowsDir = path.join(this.projectRoot, 'workflows');
        // Fallback to internal workflows if local ones don't exist
        this.internalWorkflowsDir = path.resolve(__dirname, '../workflows');
    }

    /**
     * Loads a workflow file by name (e.g., 'mai-brainstorm').
     * @param {string} workflowName 
     */
    async loadWorkflow(workflowName) {
        let workflowPath = path.join(this.workflowsDir, `${workflowName}.md`);
        
        if (!fs.existsSync(workflowPath)) {
            // Try internal fallback
            workflowPath = path.join(this.internalWorkflowsDir, `${workflowName}.md`);
        }

        if (!fs.existsSync(workflowPath)) {
            throw new Error(`Workflow ${workflowName} not found.`);
        }

        return fs.readFileSync(workflowPath, 'utf8');
    }

    /**
     * Parses the workflow content to find variables like {{topic}}.
     * @param {string} content 
     */
    parseVariables(content) {
        const regex = /\{\{([^}]+)\}\}/g;
        const variables = new Set();
        let match;
        while ((match = regex.exec(content)) !== null) {
            variables.add(match[1].trim());
        }
        return Array.from(variables);
    }

    /**
     * Simulates "Thinking" process for Neuro-Marketing effect.
     * @param {string} message 
     */
    async simulateThinking(message, duration = 1000) {
        process.stdout.write(chalk.cyan(message));
        const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
        let i = 0;
        return new Promise(resolve => {
            const interval = setInterval(() => {
                process.stdout.write(`\r${chalk.cyan(frames[i])} ${message}`);
                i = (i + 1) % frames.length;
            }, 80);

            setTimeout(() => {
                clearInterval(interval);
                process.stdout.write(`\r${chalk.green('✔')} ${message}\n`);
                resolve();
            }, duration);
        });
    }

    /**
     * Runs the workflow: Prompts user -> Fills template -> Outputs Result.
     * @param {string} workflowName 
     * @param {object} initialArgs - Arguments passed from CLI directly
     */
    async run(workflowName, initialArgs = {}) {
        try {
            console.log(chalk.bold.blue(`\n🤖 MAI AGENTS: ${workflowName.toUpperCase()} PROTOCOL INITIATED\n`));

            const content = await this.loadWorkflow(workflowName);
            const variables = this.parseVariables(content);
            const answers = { ...initialArgs };

            // Prompt for missing variables
            const questions = variables
                .filter(v => !answers[v])
                .map(v => ({
                    type: 'input',
                    name: v,
                    message: `Enter ${v}:`,
                    validate: input => input.length > 0 || 'Input is required.'
                }));

            if (questions.length > 0) {
                const promptAnswers = await inquirer.prompt(questions);
                Object.assign(answers, promptAnswers);
            }

            // Simulate Agent Connection
            await this.simulateThinking('Connecting to Executive Board...', 1500);
            await this.simulateThinking('Analysing Project Context...', 1200);
            
            // Replace variables in content
            let finalContent = content;
            for (const [key, value] of Object.entries(answers)) {
                finalContent = finalContent.replace(new RegExp(`\{\{${key}\}\}`, 'g'), value);
            }

            // Output the Result
            console.log(chalk.gray('\n' + '─'.repeat(50)));
            console.log(chalk.yellow.bold('⚡ GENERATED CONTEXT FOR LLM'));
            console.log(chalk.gray('─'.repeat(50) + '\n'));
            
            console.log(finalContent);

            console.log(chalk.gray('\n' + '─'.repeat(50)));
            console.log(chalk.green('✔ Protocol Complete. Copy the above text to your LLM.'));

        } catch (error) {
            console.error(chalk.red(`❌ Workflow Error: ${error.message}`));
        }
    }
}
