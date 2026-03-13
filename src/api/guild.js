/**
 * 频道API
 * 基于腾讯官方文档：https://bot.q.qq.com/wiki/develop/api-v2/server-inter/guild/
 */

import { Guild  } from '../types/index.js';

class GuildAPI {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  /**
   * 获取频道信息
   * @param {string} guildId - 频道ID
   * @returns {Promise<Guild>} 频道信息
   */
  async getGuild(guildId) {
    const data = await this.httpClient.get(`/guilds/${guildId}`);
    return new Guild(data);
  }

  /**
   * 获取机器人所在的所有频道
   * @param {Object} options - 分页选项
   * @param {string} options.before - 上一页最后一个频道ID
   * @param {string} options.after - 下一页第一个频道ID
   * @param {number} options.limit - 每页数量，默认100，最大100
   * @returns {Promise<Guild[]>} 频道列表
   */
  async getGuilds(options = {}) {
    const params = {};
    if (options.before) params.before = options.before;
    if (options.after) params.after = options.after;
    if (options.limit) params.limit = options.limit;

    const data = await this.httpClient.get('/users/@me/guilds', params);
    return data.map(guild => new Guild(guild));
  }
}

export default GuildAPI;
