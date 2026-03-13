/**
 * QQ Bot SDK
 * 基于腾讯官方文档：https://bot.q.qq.com/wiki/develop/api-v2/
 *
 * 使用方法：
 * import QQBot from 'qqbot-plugin';
 *
 * const bot = new QQBot({
 *   appId: 'your-app-id',
 *   token: 'your-token',
 * });
 *
 * bot.on('ready', () => {
 *   console.log('Bot is ready!');
 * });
 *
 * bot.on('MESSAGE_CREATE', (message) => {
 *   console.log('New message:', message);
 * });
 *
 * bot.start();
 */

import QQBotClient from './src/client.js';
import * as types from './src/types/index.js';
import * as errorCode from './src/core/errorCode.js';

// 导出主类
export default QQBotClient;

// 导出所有类型
export * from './src/types/index.js';

// 导出类型对象
export { types };

// 导出错误码模块
export * from './src/core/errorCode.js';
export { errorCode };
