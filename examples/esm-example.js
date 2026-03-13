/**
 * QQ Bot SDK ES Module使用示例
 */

import QQBot, { Intent, EventType } from '../index.js';

// 方式1: 使用Bot Token（推荐）
const bot1 = new QQBot({
  appId: 'your-app-id',
  token: 'your-bot-token', // 从机器人管理后台获取
  sandbox: true,
  intents: Intent.GUILDS | Intent.GUILD_MESSAGES | Intent.GUILD_MEMBERS,
});

// 方式2: 使用clientSecret自动获取Token
const bot2 = new QQBot({
  appId: 'your-app-id',
  clientSecret: 'your-client-secret',
  sandbox: true,
  intents: Intent.GUILDS | Intent.GUILD_MESSAGES,
});

// Bot准备就绪
bot1.on('ready', (data) => {
  console.log('Bot is ready!', data);
});

// 收到消息
bot1.on(EventType.MESSAGE_CREATE, async (message) => {
  console.log('收到消息:', message);

  // 回复消息
  if (message.content === 'ping') {
    try {
      await bot1.message.sendMessage(message.channel_id, {
        content: 'pong!',
        message_reference: {
          message_id: message.id,
        },
      });
    } catch (error) {
      console.error('发送消息失败:', error);
    }
  }
});

// 成员加入频道
bot1.on(EventType.GUILD_MEMBER_ADD, (member) => {
  console.log('新成员加入:', member);
});

// 错误处理
bot1.on('error', (error) => {
  console.error('Bot错误:', error);
});

// 启动Bot
bot1.start().then(() => {
  console.log('Bot启动成功！');
}).catch((error) => {
  console.error('Bot启动失败:', error);
});
