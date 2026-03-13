/**
 * 权限API
 * 基于腾讯官方文档：https://bot.q.qq.com/wiki/develop/api-v2/server-inter/permission/
 */

import { Role, APIPermission, APIPermissionDemand  } from '../types/index.js';

class PermissionAPI {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  /**
   * 获取频道身份组列表
   * @param {string} guildId - 频道ID
   * @returns {Promise<Role[]>} 身份组列表
   */
  async getRoles(guildId) {
    const data = await this.httpClient.get(`/guilds/${guildId}/roles`);
    return data.roles.map(role => new Role(role));
  }

  /**
   * 创建频道身份组
   * @param {string} guildId - 频道ID
   * @param {Object} options - 身份组选项
   * @param {string} options.name - 身份组名称
   * @param {number} options.color - ARGB的HEX颜色值
   * @param {boolean} options.hoist - 是否在成员列表中单独展示
   * @returns {Promise<Role>} 创建的身份组
   */
  async createRole(guildId, options) {
    const data = await this.httpClient.post(`/guilds/${guildId}/roles`, options);
    return new Role(data.role);
  }

  /**
   * 修改频道身份组
   * @param {string} guildId - 频道ID
   * @param {string} roleId - 身份组ID
   * @param {Object} options - 修改选项
   * @param {string} options.name - 身份组名称
   * @param {number} options.color - ARGB的HEX颜色值
   * @param {boolean} options.hoist - 是否在成员列表中单独展示
   * @returns {Promise<Role>} 修改后的身份组
   */
  async updateRole(guildId, roleId, options) {
    const data = await this.httpClient.patch(`/guilds/${guildId}/roles/${roleId}`, options);
    return new Role(data.role);
  }

  /**
   * 删除频道身份组
   * @param {string} guildId - 频道ID
   * @param {string} roleId - 身份组ID
   * @returns {Promise<void>}
   */
  async deleteRole(guildId, roleId) {
    await this.httpClient.delete(`/guilds/${guildId}/roles/${roleId}`);
  }

  /**
   * 创建频道身份组成员
   * @param {string} guildId - 频道ID
   * @param {string} roleId - 身份组ID
   * @param {string} userId - 用户ID
   * @param {string} channelId - 子频道ID（可选）
   * @returns {Promise<void>}
   */
  async addRoleMember(guildId, roleId, userId, channelId = null) {
    const url = channelId
      ? `/guilds/${guildId}/members/${userId}/roles/${roleId}?channel_id=${channelId}`
      : `/guilds/${guildId}/members/${userId}/roles/${roleId}`;

    await this.httpClient.put(url);
  }

  /**
   * 删除频道身份组成员
   * @param {string} guildId - 频道ID
   * @param {string} roleId - 身份组ID
   * @param {string} userId - 用户ID
   * @param {string} channelId - 子频道ID（可选）
   * @returns {Promise<void>}
   */
  async deleteRoleMember(guildId, roleId, userId, channelId = null) {
    const url = channelId
      ? `/guilds/${guildId}/members/${userId}/roles/${roleId}?channel_id=${channelId}`
      : `/guilds/${guildId}/members/${userId}/roles/${roleId}`;

    await this.httpClient.delete(url);
  }

  /**
   * 获取子频道用户权限
   * @param {string} channelId - 子频道ID
   * @param {string} userId - 用户ID
   * @returns {Promise<Object>} 权限信息
   */
  async getChannelPermissions(channelId, userId) {
    const data = await this.httpClient.get(`/channels/${channelId}/members/${userId}/permissions`);
    return data;
  }

  /**
   * 修改子频道用户权限
   * @param {string} channelId - 子频道ID
   * @param {string} userId - 用户ID
   * @param {Object} options - 权限选项
   * @param {string} options.add - 添加的权限值
   * @param {string} options.remove - 移除的权限值
   * @returns {Promise<void>}
   */
  async updateChannelPermissions(channelId, userId, options) {
    await this.httpClient.put(`/channels/${channelId}/members/${userId}/permissions`, options);
  }

  /**
   * 获取子频道身份组权限
   * @param {string} channelId - 子频道ID
   * @param {string} roleId - 身份组ID
   * @returns {Promise<Object>} 权限信息
   */
  async getChannelRolePermissions(channelId, roleId) {
    const data = await this.httpClient.get(`/channels/${channelId}/roles/${roleId}/permissions`);
    return data;
  }

  /**
   * 修改子频道身份组权限
   * @param {string} channelId - 子频道ID
   * @param {string} roleId - 身份组ID
   * @param {Object} options - 权限选项
   * @param {string} options.add - 添加的权限值
   * @param {string} options.remove - 移除的权限值
   * @returns {Promise<void>}
   */
  async updateChannelRolePermissions(channelId, roleId, options) {
    await this.httpClient.put(`/channels/${channelId}/roles/${roleId}/permissions`, options);
  }

  /**
   * 获取API权限
   * @param {string} guildId - 频道ID
   * @returns {Promise<APIPermission[]>} API权限列表
   */
  async getAPIPermissions(guildId) {
    const data = await this.httpClient.get(`/guilds/${guildId}/api_permission`);
    return data.apis.map(api => new APIPermission(api));
  }

  /**
   * 申请API权限
   * @param {string} guildId - 频道ID
   * @param {string} channelId - 子频道ID
   * @param {Object} options - 申请选项
   * @param {string} options.path - API路径
   * @param {string} options.method - 请求方法
   * @param {string} options.desc - 申请描述
   * @returns {Promise<Object>} 申请结果
   */
  async requireAPIPermission(guildId, channelId, options) {
    const data = await this.httpClient.post(`/guilds/${guildId}/api_permission/demand`, {
      channel_id: channelId,
      ...options,
    });
    return data;
  }
}

export default PermissionAPI;
