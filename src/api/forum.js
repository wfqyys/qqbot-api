/**
 * 论坛API
 * 基于腾讯官方文档：https://bot.q.qq.com/wiki/develop/api-v2/server-inter/forum/
 */

import { Thread, ThreadInfo, Reply  } from '../types/index.js';

class ForumAPI {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  /**
   * 获取帖子列表
   * @param {string} channelId - 子频道ID
   * @param {Object} options - 分页选项
   * @param {string} options.before - 上一页最后一个帖子ID
   * @param {string} options.after - 下一页第一个帖子ID
   * @param {number} options.limit - 每页数量，默认20，最大50
   * @returns {Promise<Thread[]>} 帖子列表
   */
  async getThreads(channelId, options = {}) {
    const params = {};
    if (options.before) params.before = options.before;
    if (options.after) params.after = options.after;
    if (options.limit) params.limit = options.limit;

    const data = await this.httpClient.get(`/channels/${channelId}/threads`, params);
    return data.map(thread => new Thread(thread));
  }

  /**
   * 获取帖子详情
   * @param {string} channelId - 子频道ID
   * @param {string} threadId - 帖子ID
   * @returns {Promise<Thread>} 帖子详情
   */
  async getThread(channelId, threadId) {
    const data = await this.httpClient.get(`/channels/${channelId}/threads/${threadId}`);
    return new Thread(data);
  }

  /**
   * 发布帖子
   * @param {string} channelId - 子频道ID
   * @param {Object} options - 帖子选项
   * @param {string} options.title - 帖子标题
   * @param {Object} options.content - 帖子内容
   * @param {string} options.format - 格式，默认1
   * @returns {Promise<Thread>} 发布的帖子
   */
  async createThread(channelId, options) {
    const data = await this.httpClient.put(`/channels/${channelId}/threads`, options);
    return new Thread(data);
  }

  /**
   * 删除帖子
   * @param {string} channelId - 子频道ID
   * @param {string} threadId - 帖子ID
   * @returns {Promise<void>}
   */
  async deleteThread(channelId, threadId) {
    await this.httpClient.delete(`/channels/${channelId}/threads/${threadId}`);
  }

  /**
   * 获取帖子回复列表
   * @param {string} channelId - 子频道ID
   * @param {string} threadId - 帖子ID
   * @param {Object} options - 分页选项
   * @param {string} options.before - 上一页最后一个回复ID
   * @param {string} options.after - 下一页第一个回复ID
   * @param {number} options.limit - 每页数量，默认20，最大50
   * @returns {Promise<Reply[]>} 回复列表
   */
  async getReplies(channelId, threadId, options = {}) {
    const params = {};
    if (options.before) params.before = options.before;
    if (options.after) params.after = options.after;
    if (options.limit) params.limit = options.limit;

    const data = await this.httpClient.get(`/channels/${channelId}/threads/${threadId}/replies`, params);
    return data.map(reply => new Reply(reply));
  }

  /**
   * 发布回复
   * @param {string} channelId - 子频道ID
   * @param {string} threadId - 帖子ID
   * @param {Object} options - 回复选项
   * @param {string} options.content - 回复内容
   * @param {string} options.format - 格式，默认1
   * @returns {Promise<Reply>} 发布的回复
   */
  async createReply(channelId, threadId, options) {
    const data = await this.httpClient.put(`/channels/${channelId}/threads/${threadId}/replies`, options);
    return new Reply(data);
  }

  /**
   * 删除回复
   * @param {string} channelId - 子频道ID
   * @param {string} threadId - 帖子ID
   * @param {string} replyId - 回复ID
   * @returns {Promise<void>}
   */
  async deleteReply(channelId, threadId, replyId) {
    await this.httpClient.delete(`/channels/${channelId}/threads/${threadId}/replies/${replyId}`);
  }
}

export default ForumAPI;
