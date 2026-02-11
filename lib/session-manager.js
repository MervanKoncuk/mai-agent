import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

/**
 * Session Manager Module
 * Manages persistent storage of workflow outputs for replay.
 * 
 * Oturum Yöneticisi Modülü
 * Workflow çıktılarını kalıcı olarak saklar ve tekrar oynatmayı sağlar.
 * 
 * @module SessionManager
 */

const SESSIONS_DIR = '.mai/sessions';

/**
 * Saves a workflow session to disk.
 * @param {string} projectDir - Root project directory
 * @param {string} workflowName - Name of the workflow (e.g., 'mai-brainstorm')
 * @param {object} answers - Variables/answers used in the workflow
 * @param {string} output - The final rendered output
 * @returns {Promise<string>} The session ID
 */
export async function saveSession(projectDir, workflowName, answers, output) {
    const sessionsPath = path.join(projectDir, SESSIONS_DIR);
    await fs.ensureDir(sessionsPath);

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const sessionId = `${timestamp}_${workflowName}`;
    const sessionFile = path.join(sessionsPath, `${sessionId}.json`);

    const session = {
        id: sessionId,
        workflow: workflowName,
        timestamp: new Date().toISOString(),
        answers,
        output
    };

    await fs.writeJson(sessionFile, session, { spaces: 2 });
    return sessionId;
}

/**
 * Lists all saved sessions, sorted by most recent first.
 * @param {string} projectDir - Root project directory
 * @returns {Promise<Array>} List of session summaries
 */
export async function listSessions(projectDir) {
    const sessionsPath = path.join(projectDir, SESSIONS_DIR);

    if (!(await fs.pathExists(sessionsPath))) {
        return [];
    }

    const files = await fs.readdir(sessionsPath);
    const sessions = [];

    for (const file of files) {
        if (!file.endsWith('.json')) continue;
        try {
            const data = await fs.readJson(path.join(sessionsPath, file));
            sessions.push({
                id: data.id,
                workflow: data.workflow,
                timestamp: data.timestamp,
                preview: truncate(Object.values(data.answers).filter(Boolean).join(' | '), 60)
            });
        } catch {
            // Skip corrupted session files
        }
    }

    // Sort by timestamp descending (newest first)
    sessions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    return sessions;
}

/**
 * Loads a specific session by its ID.
 * @param {string} projectDir - Root project directory
 * @param {string} sessionId - The session ID to load
 * @returns {Promise<object|null>} The full session object or null
 */
export async function loadSession(projectDir, sessionId) {
    const sessionsPath = path.join(projectDir, SESSIONS_DIR);
    const files = await fs.readdir(sessionsPath);

    // Try exact match first
    const exactFile = `${sessionId}.json`;
    if (files.includes(exactFile)) {
        return fs.readJson(path.join(sessionsPath, exactFile));
    }

    // Try partial match (user may type just the index number)
    const allSessions = await listSessions(projectDir);
    const index = parseInt(sessionId, 10);
    if (!isNaN(index) && index >= 0 && index < allSessions.length) {
        const match = allSessions[index];
        return fs.readJson(path.join(sessionsPath, `${match.id}.json`));
    }

    return null;
}

/**
 * Formats a session list into a printable table.
 * @param {Array} sessions 
 * @returns {string}
 */
export function formatSessionList(sessions) {
    if (sessions.length === 0) {
        return chalk.yellow('No sessions found. Run a workflow first.');
    }

    let output = chalk.bold.cyan('\n📋 MAI Session History\n\n');
    output += chalk.gray('─'.repeat(80) + '\n');
    output += `${chalk.bold('#'.padEnd(4))} ${chalk.bold('Workflow'.padEnd(20))} ${chalk.bold('Date'.padEnd(24))} ${chalk.bold('Context')}\n`;
    output += chalk.gray('─'.repeat(80) + '\n');

    sessions.forEach((s, i) => {
        const date = new Date(s.timestamp).toLocaleString('tr-TR');
        const workflow = s.workflow.replace('mai-', '').toUpperCase();
        output += `${chalk.cyan(String(i).padEnd(4))} ${chalk.white(workflow.padEnd(20))} ${chalk.gray(date.padEnd(24))} ${s.preview}\n`;
    });

    output += chalk.gray('─'.repeat(80) + '\n');
    output += chalk.gray(`\nUse ${chalk.white('mai replay <#>')} to view a session.\n`);

    return output;
}

/**
 * Formats a full session for replay display.
 * @param {object} session 
 * @returns {string}
 */
export function formatSessionReplay(session) {
    let output = chalk.bold.blue(`\n🔄 REPLAYING: ${session.workflow.toUpperCase()}\n`);
    output += chalk.gray(`📅 ${new Date(session.timestamp).toLocaleString('tr-TR')}\n`);
    output += chalk.gray('─'.repeat(50) + '\n\n');
    output += session.output;
    output += chalk.gray('\n' + '─'.repeat(50) + '\n');
    return output;
}

/**
 * Truncates a string to the specified length.
 */
function truncate(str, len) {
    if (!str) return '';
    return str.length > len ? str.substring(0, len - 3) + '...' : str;
}
