/**
 * QQ Bot SDK 基础使用示例
 */

import QQBot from '../index';
import { Intent, EventType } from '../src/types';

// 创建Bot实例
const bot = new QQBot({
  appId: 'your-app-id',          // 替换为你的AppID
  token: 'your-token',            // 替换为你的Token
  sandbox: true,                  // 使用沙箱环境
  intents: Intent.GUILDS | Intent.GUILD_MESSAGES | Intent.GUILD_MEMBERS, // 订阅事件
});

// Bot准备就绪
bot.on('ready', (data) => {
  console.log('Bot is ready!');
  console.log('Bot info:', data);
});

// 收到消息
bot.on(EventType.MESSAGE_CREATE, async (message) => {
  console.log('收到消息:', message);
  
  // 回复消息
  if (message.content === 'ping') {
    try {
      await bot.message.sendMessage(message.channel_id, {
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
bot.on(EventType.GUILD_MEMBER_ADD, (member) => {
  console.log('新成员加入:', member);
});

// 子频道创建
bot.on(EventType.CHANNEL_CREATE, (channel) => {
  console.log('新子频道创建:', channel);
});

// 错误处理
bot.on('error', (error) => {
  console.error('Bot错误:', error);
});

// 连接关闭
bot.on('close', (code, reason) => {
  console.log('连接关闭:', code, reason);
});

// 启动Bot
bot.start().then(() => {
  console.log('Bot启动成功！');
}).catch((error) => {
  console.error('Bot启动失败:', error);
});
