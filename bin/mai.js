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
        type: 'input',
        name: 'projectName',
        message: 'What is the name of your project?',
        default: 'my-ai-agents'
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
    console.log('  /brainstorm [topic] --lang=[TR/EN]');
    console.log('  /party [task]');
    console.log('  /debug [error]');
    console.log('  /test [scope]');
    console.log('  /scenario [event]');
    console.log('  /develop [feature]');
    console.log('\n');
  });

program.parse(process.argv);
