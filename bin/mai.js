#!/usr/bin/env node

import { program } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { setupProject } from '../lib/setup.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

program
  .version('1.0.0')
  .description('MAI Agents - Autonomous Digital Workforce CLI');

program
  .command('init')
  .description('Initialize a new MAI Agents project')
  .action(async () => {
    console.log(chalk.blue.bold('🤖 Welcome to MAI Agents Setup'));

    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'deploymentTarget',
        message: 'Where do you want to deploy your agents?',
        choices: [
          'Create New Project (Folder)',
          'Integrate into Current Project (Here)'
        ],
        default: 'Create New Project (Folder)'
      },
      {
        type: 'input',
        name: 'projectName',
        message: 'What is the name of your project?',
        default: 'my-ai-agents',
        when: (answers) => answers.deploymentTarget === 'Create New Project (Folder)'
      },
      {
        type: 'list',
        name: 'language',
        message: 'Select Default Language:',
        choices: ['TR (Turkish)', 'EN (English)'],
        default: 'TR (Turkish)'
      },
      {
        type: 'list',
        name: 'scale',
        message: 'Select Project Scale:',
        choices: [
          'Startup (MVP Focus, Speed)',
          'Enterprise (Strict Standards, Full Docs)'
        ],
        default: 'Startup (MVP Focus, Speed)'
      }
    ]);

    await setupProject(answers);
  });

program
  .command('status')
  .description('Check MAI Memory status')
  .action(() => {
    // Logic to read MAI_MEMORY.md and print status
    console.log(chalk.green('Checking MAI Status...'));
    const memoryPath = path.join(process.cwd(), 'MAI_MEMORY.md');
    if (fs.existsSync(memoryPath)) {
      const content = fs.readFileSync(memoryPath, 'utf8');
      console.log(content); // Simplified for MVP
    } else {
      console.log(chalk.red('❌ MAI_MEMORY.md not found. Run `mai init` first.'));
    }
  });

program
  .command('help')
  .description('List all available agents and workflows')
  .action(() => {
    console.log(chalk.yellow.bold('\n🤖 MAI Agents Help Center\n'));
    console.log(chalk.white('Available Workflows:'));
    console.log('  mai brainstorm [topic] --lang=[TR/EN]');
    console.log('  mai party [task]');
    console.log('  mai debug [error]');
    console.log('  mai test [scope]');
    console.log('  mai scenario [event]');
    console.log('  mai develop [feature]');
    console.log('\n');
  });

// --- INTERACTIVE WORKFLOW COMMANDS ---

import { WorkflowRunner } from '../lib/workflow-runner.js';
const runner = new WorkflowRunner();

program
  .command('brainstorm [topic]')
  .description('Round-table discussion with C-Suite')
  .option('-l, --lang, --language <lang>', 'Language (TR/EN)', 'TR')
  .action(async (topic, options) => {
    await runner.run('mai-brainstorm', {
      topic,
      language: options.language
    });
  });

program
  .command('party [task]')
  .description('Rapid development cycle (Plan -> Code -> Test)')
  .action(async (task) => {
    await runner.run('mai-party', { task });
  });

program
  .command('debug [error]')
  .description('Analyze and fix errors')
  .action(async (error) => {
    await runner.run('mai-debug', { error });
  });

program
  .command('test [scope]')
  .description('Run QA & Security tests')
  .action(async (scope) => {
    await runner.run('mai-test', { scope });
  });

program
  .command('scenario [event]')
  .description('Simulate crisis or event')
  .action(async (event) => {
    await runner.run('mai-scenario', { event });
  });

program
  .command('develop [feature]')
  .description('End-to-end feature development')
  .action(async (feature) => {
    await runner.run('mai-develop', { feature });
  });

program.parse(process.argv);
