/**
 * 日程API
 * 基于腾讯官方文档：https://bot.q.qq.com/wiki/develop/api-v2/server-inter/schedule/
 */

import { Schedule  } from '../types/index.js';

class ScheduleAPI {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  /**
   * 获取日程列表
   * @param {string} channelId - 子频道ID
   * @param {string} since - 起始时间戳（ms）
   * @returns {Promise<Schedule[]>} 日程列表
   */
  async getSchedules(channelId, since = null) {
    const params = {};
    if (since) params.since = since;

    const data = await this.httpClient.get(`/channels/${channelId}/schedules`, params);
    return data.map(schedule => new Schedule(schedule));
  }

  /**
   * 获取日程详情
   * @param {string} channelId - 子频道ID
   * @param {string} scheduleId - 日程ID
   * @returns {Promise<Schedule>} 日程详情
   */
  async getSchedule(channelId, scheduleId) {
    const data = await this.httpClient.get(`/channels/${channelId}/schedules/${scheduleId}`);
    return new Schedule(data);
  }

  /**
   * 创建日程
   * @param {string} channelId - 子频道ID
   * @param {Object} options - 日程选项
   * @param {string} options.name - 日程名称
   * @param {string} options.description - 日程描述
   * @param {string} options.start_timestamp - 开始时间戳（ms）
   * @param {string} options.end_timestamp - 结束时间戳（ms）
   * @param {string} options.jump_channel_id - 跳转子频道ID
   * @param {number} options.remind_type - 提醒类型
   * @returns {Promise<Schedule>} 创建的日程
   */
  async createSchedule(channelId, options) {
    const data = await this.httpClient.post(`/channels/${channelId}/schedules`, {
      schedule: options,
    });
    return new Schedule(data);
  }

  /**
   * 修改日程
   * @param {string} channelId - 子频道ID
   * @param {string} scheduleId - 日程ID
   * @param {Object} options - 修改选项
   * @param {string} options.name - 日程名称
   * @param {string} options.description - 日程描述
   * @param {string} options.start_timestamp - 开始时间戳（ms）
   * @param {string} options.end_timestamp - 结束时间戳（ms）
   * @param {string} options.jump_channel_id - 跳转子频道ID
   * @param {number} options.remind_type - 提醒类型
   * @returns {Promise<Schedule>} 修改后的日程
   */
  async updateSchedule(channelId, scheduleId, options) {
    const data = await this.httpClient.patch(`/channels/${channelId}/schedules/${scheduleId}`, {
      schedule: options,
    });
    return new Schedule(data);
  }

  /**
   * 删除日程
   * @param {string} channelId - 子频道ID
   * @param {string} scheduleId - 日程ID
   * @returns {Promise<void>}
   */
  async deleteSchedule(channelId, scheduleId) {
    await this.httpClient.delete(`/channels/${channelId}/schedules/${scheduleId}`);
  }
}

export default ScheduleAPI;
