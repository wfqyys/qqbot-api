/**
 * QQ Bot SDK API使用示例
 */

import QQBot from '../index';

// 创建Bot实例（仅HTTP API，不连接WebSocket）
const bot = new QQBot({
  appId: 'your-app-id',
  token: 'your-token',
  sandbox: true,
});

// 示例函数
async function examples() {
  try {
    // 1. 获取机器人信息
    const me = await bot.user.getMe();
    console.log('机器人信息:', me);

    // 2. 获取机器人所在的所有频道
    const guilds = await bot.user.getMeGuilds();
    console.log('频道列表:', guilds);

    if (guilds.length > 0) {
      const guildId = guilds[0].id;

      // 3. 获取频道信息
      const guild = await bot.guild.getGuild(guildId);
      console.log('频道信息:', guild);

      // 4. 获取频道下的子频道列表
      const channels = await bot.channel.getChannels(guildId);
      console.log('子频道列表:', channels);

      if (channels.length > 0) {
        const channelId = channels[0].id;

        // 5. 发送消息
        const message = await bot.message.sendMessage(channelId, {
          content: 'Hello from QQ Bot SDK!',
        });
        console.log('发送的消息:', message);

        // 6. 获取消息列表
        const messages = await bot.message.getMessages(channelId, {
          limit: 10,
        });
        console.log('消息列表:', messages);

        // 7. 发送Embed消息
        const embedMessage = await bot.message.sendMessage(channelId, {
          embed: {
            title: 'Embed标题',
            description: 'Embed描述',
            color: 0x00FF00,
            fields: [
              { name: '字段1', value: '值1' },
              { name: '字段2', value: '值2' },
            ],
          },
        });
        console.log('发送的Embed消息:', embedMessage);

        // 8. 创建消息反应
        await bot.reaction.createReaction(channelId, message.id, '1', '4'); // 👍表情
        console.log('创建消息反应成功');

        // 9. 获取消息反应用户列表
        const reactionUsers = await bot.reaction.getReactionUsers(
          channelId,
          message.id,
          '1',
          '4'
        );
        console.log('消息反应用户列表:', reactionUsers);
      }

      // 10. 获取频道成员列表
      const members = await bot.member.getMembers(guildId, {
        limit: 10,
      });
      console.log('成员列表:', members);

      // 11. 获取频道身份组列表
      const roles = await bot.permission.getRoles(guildId);
      console.log('身份组列表:', roles);
    }

  } catch (error) {
    console.error('API调用错误:', error);
  }
}

// 执行示例
examples();
