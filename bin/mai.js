#!/usr/bin/env node

import { program } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { setupProject } from '../lib/setup.js';
import { scanProject, formatContext, saveContext } from '../lib/project-scanner.js';
import { listSessions, loadSession, formatSessionList, formatSessionReplay } from '../lib/session-manager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

program
  .version('1.1.0')
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
    await setupProject(answers);
  });

import { updateProject } from '../lib/update.js';

program
  .command('update')
  .description('Update project workflows and docs to latest version')
  .action(async () => {
    await updateProject(process.cwd());
  });

// --- PROJECT SCANNER ---
program
  .command('scan')
  .description('Scan project and generate context for agents')
  .option('-d, --dir <path>', 'Target directory', '.')
  .action(async (options) => {
    const targetDir = path.resolve(options.dir);
    console.log(chalk.blue.bold('\n🔍 MAI SCAN: Analyzing Project...\n'));

    try {
      const ctx = await scanProject(targetDir);
      await saveContext(targetDir, ctx);

      console.log(formatContext(ctx));
      console.log(chalk.green('✔ Context saved to .mai/context.json'));
      console.log(chalk.gray('  This context will be auto-injected into every workflow.\n'));
    } catch (error) {
      console.error(chalk.red(`❌ Scan Error: ${error.message}`));
    }
  });

// --- SESSION MEMORY ---
program
  .command('history')
  .description('List all saved workflow sessions')
  .action(async () => {
    const sessions = await listSessions(process.cwd());
    console.log(formatSessionList(sessions));
  });

program
  .command('replay <sessionId>')
  .description('Replay a saved workflow session')
  .action(async (sessionId) => {
    const session = await loadSession(process.cwd(), sessionId);
    if (session) {
      console.log(formatSessionReplay(session));
    } else {
      console.log(chalk.red(`❌ Session not found: ${sessionId}`));
      console.log(chalk.gray('Run `mai history` to see available sessions.'));
    }
  });

program
  .command('status')
  .description('Check MAI Memory status')
  .action(() => {
    console.log(chalk.green('Checking MAI Status...'));
    const memoryPath = path.join(process.cwd(), 'MAI_MEMORY.md');
    if (fs.existsSync(memoryPath)) {
      const content = fs.readFileSync(memoryPath, 'utf8');
      console.log(content);
    } else {
      console.log(chalk.red('❌ MAI_MEMORY.md not found. Run `mai init` first.'));
    }
  });

program
  .command('help')
  .description('List all available agents and workflows')
  .action(() => {
    console.log(chalk.yellow.bold('\n🤖 MAI Agents Help Center\n'));
    console.log(chalk.white('Core Commands:'));
    console.log('  mai init                    Initialize project');
    console.log('  mai update                  Update workflows & docs');
    console.log('  mai scan                    Scan & cache project context');
    console.log('  mai status                  Check MAI Memory');
    console.log('  mai history                 List saved sessions');
    console.log('  mai replay <#>              Replay a session');
    console.log('');
    console.log(chalk.white('Workflow Commands:'));
    console.log('  mai brainstorm [topic]      Round-table discussion');
    console.log('  mai party [task]            Rapid dev cycle');
    console.log('  mai debug [error]           Error resolution');
    console.log('  mai test [scope]            QA & Security tests');
    console.log('  mai scenario [event]        Crisis simulation');
    console.log('  mai develop [feature]       End-to-end development');
    console.log('\n');
  });

// --- INTERACTIVE WORKFLOW COMMANDS ---

import { WorkflowRunner } from '../lib/workflow-runner.js';
const runner = new WorkflowRunner();

program
  .command('brainstorm [topic...]')
  .description('Round-table discussion with C-Suite')
  .option('-l, --lang, --language <lang>', 'Language (TR/EN)', 'TR')
  .action(async (topicParts, options) => {
    const topic = topicParts.join(' ');
    await runner.run('mai-brainstorm', {
      topic,
      language: options.language
    });
  });

program
  .command('party [task...]')
  .description('Rapid development cycle (Plan -> Code -> Test)')
  .action(async (taskParts) => {
    const task = taskParts.join(' ');
    await runner.run('mai-party', { task });
  });

program
  .command('debug [error...]')
  .description('Analyze and fix errors')
  .action(async (errorParts) => {
    const error = errorParts.join(' ');
    await runner.run('mai-debug', { error });
  });

program
  .command('test [scope...]')
  .description('Run QA & Security tests')
  .action(async (scopeParts) => {
    const scope = scopeParts.join(' ');
    await runner.run('mai-test', { scope });
  });

program
  .command('scenario [event...]')
  .description('Simulate crisis or event')
  .action(async (eventParts) => {
    const event = eventParts.join(' ');
    await runner.run('mai-scenario', { event });
  });

program
  .command('develop [feature...]')
  .description('End-to-end feature development')
  .action(async (featureParts) => {
    const feature = featureParts.join(' ');
    await runner.run('mai-develop', { feature });
  });

program.parse(process.argv);

