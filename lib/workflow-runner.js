import fs from 'fs-extra';
import path from 'path';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { AGENT_REGISTRY, WORKFLOW_DEFAULTS, WORKFLOW_CHAIN } from './agent-registry.js';
import { loadContext, formatContext } from './project-scanner.js';
import { saveSession } from './session-manager.js';

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
     * Smart Agent Selection Logic
     * Scans input for keywords and suggests a roster.
     * @param {string} workflowName 
     * @param {string} contextInput (e.g. topic, task)
     */
    async selectAgents(workflowName, contextInput = '') {
        const defaultAgents = WORKFLOW_DEFAULTS[workflowName] || ['CEO', 'CTO'];
        const inputLower = contextInput.toLowerCase();

        // 1. Identify Recommended Agents based on Keywords
        const recommended = new Set(defaultAgents);

        for (const [agentCode, data] of Object.entries(AGENT_REGISTRY)) {
            if (data.keywords.some(k => inputLower.includes(k))) {
                recommended.add(agentCode);
            }
        }

        // 2. Prepare Checkbox Choices
        const choices = Object.keys(AGENT_REGISTRY).map(agentCode => {
            const agent = AGENT_REGISTRY[agentCode];
            const isRecommended = recommended.has(agentCode);
            return {
                name: `${chalk.bold(agentCode)} - ${agent.role} ${isRecommended ? chalk.green('(Recommended)') : ''}`,
                value: agentCode,
                checked: isRecommended,
                short: agentCode
            };
        });

        // 3. Prompt User
        console.log(chalk.cyan(`\n👥 Assembling Digital Workforce...`));
        const { selectedAgents } = await inquirer.prompt([
            {
                type: 'checkbox',
                name: 'selectedAgents',
                message: 'Select agents for this session:',
                choices: choices,
                validate: (answer) => {
                    if (answer.length < 1) {
                        return 'You must choose at least one agent.';
                    }
                    return true;
                }
            }
        ]);

        // 4. Return Formatted String for LLM Context
        return selectedAgents.map(code => {
            const a = AGENT_REGISTRY[code];
            return `- **[${code}]** (${a.role}): ${a.description}`;
        }).join('\n');
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
                .filter(v => !answers[v] && v !== 'agents_list')
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

            // --- SMART AGENT SELECTION ---
            // Determine the "Context Input" (topic, task, error, etc.)
            const contextKeys = ['topic', 'task', 'error', 'scope', 'event', 'feature'];
            const contextInput = contextKeys.map(k => answers[k]).filter(Boolean).join(' ');

            if (variables.includes('agents_list')) {
                answers['agents_list'] = await this.selectAgents(workflowName, contextInput);
            }
            // -----------------------------

            // Simulate Agent Connection
            await this.simulateThinking('Connecting to Selected Agents...', 1500);
            await this.simulateThinking('Analysing Project Context...', 1200);

            // Replace variables in content
            let finalContent = content;
            for (const [key, value] of Object.entries(answers)) {
                finalContent = finalContent.replace(new RegExp(`\{\{${key}\}\}`, 'g'), value);
            }

            // --- CONTEXT INJECTION ---
            const cachedContext = await loadContext(this.projectRoot);
            let contextBlock = '';
            if (cachedContext) {
                contextBlock = formatContext(cachedContext);
                finalContent = contextBlock + '\n---\n\n' + finalContent;
                await this.simulateThinking('Project context injected...', 800);
            }
            // -------------------------

            // Output the Result
            console.log(chalk.gray('\n' + '─'.repeat(50)));
            console.log(chalk.yellow.bold('⚡ GENERATED CONTEXT FOR LLM'));
            console.log(chalk.gray('─'.repeat(50) + '\n'));

            console.log(finalContent);

            console.log(chalk.gray('\n' + '─'.repeat(50)));
            console.log(chalk.green('✔ Protocol Complete. Copy the above text to your LLM.'));

            // --- SESSION AUTO-SAVE ---
            try {
                const sessionId = await saveSession(this.projectRoot, workflowName, answers, finalContent);
                console.log(chalk.gray(`📝 Session saved: ${sessionId}`));
            } catch {
                // Silently fail on session save errors
            }

            // --- WORKFLOW CHAINING ---
            const chain = WORKFLOW_CHAIN[workflowName];
            if (chain) {
                console.log('\n');
                const { proceed } = await inquirer.prompt([
                    {
                        type: 'confirm',
                        name: 'proceed',
                        message: chain.message,
                        default: true
                    }
                ]);

                if (proceed) {
                    // Pass the same args for context continuity, though variables might differ
                    await this.run(chain.next, initialArgs);
                }
            }

        } catch (error) {
            console.error(chalk.red(`❌ Workflow Error: ${error.message}`));
        }
    }
}
