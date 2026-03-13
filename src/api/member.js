/**
 * 成员API
 * 基于腾讯官方文档：https://bot.q.qq.com/wiki/develop/api-v2/server-inter/member/
 */

import { Member, User  } from '../types/index.js';

class MemberAPI {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  /**
   * 获取频道成员列表
   * @param {string} guildId - 频道ID
   * @param {Object} options - 分页选项
   * @param {string} options.after - 上一页最后一个成员ID
   * @param {number} options.limit - 每页数量，默认1，最大1000
   * @returns {Promise<Member[]>} 成员列表
   */
  async getMembers(guildId, options = {}) {
    const params = {};
    if (options.after) params.after = options.after;
    if (options.limit) params.limit = options.limit;

    const data = await this.httpClient.get(`/guilds/${guildId}/members`, params);
    return data.map(member => new Member(member));
  }

  /**
   * 获取频道成员详情
   * @param {string} guildId - 频道ID
   * @param {string} userId - 用户ID
   * @returns {Promise<Member>} 成员信息
   */
  async getMember(guildId, userId) {
    const data = await this.httpClient.get(`/guilds/${guildId}/members/${userId}`);
    return new Member(data);
  }

  /**
   * 删除频道成员
   * @param {string} guildId - 频道ID
   * @param {string} userId - 用户ID
   * @param {Object} options - 选项
   * @param {boolean} options.add_blacklist - 是否添加黑名单
   * @param {number} options.delete_history_msg_days - 删除历史消息天数，0-3天
   * @returns {Promise<void>}
   */
  async deleteMember(guildId, userId, options = {}) {
    const params = {};
    if (options.add_blacklist !== undefined) params.add_blacklist = options.add_blacklist;
    if (options.delete_history_msg_days !== undefined) params.delete_history_msg_days = options.delete_history_msg_days;

    await this.httpClient.delete(`/guilds/${guildId}/members/${userId}`, { params });
  }
}

export default MemberAPI;
