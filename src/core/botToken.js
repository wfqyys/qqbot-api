/**
 * Bot Token管理模块
 * 用于获取和管理QQ Bot Token
 */

import axios from 'axios';

/**
 * Bot Token管理器
 */
class BotTokenManager {
  /**
   * 构造函数
   * @param {Object} config - 配置对象
   * @param {string} config.appId - 机器人AppID
   * @param {string} config.clientSecret - 机器人ClientSecret
   */
  constructor(config = {}) {
    this.appId = config.appId;
    this.clientSecret = config.clientSecret;
    this.botToken = null;
    this.botTokenExpireTime = 0;
  }

  /**
   * 获取Bot Token
   * @returns {Promise<Object>} Token信息
   */
  async getBotToken() {
    if (!this.appId || !this.clientSecret) {
      throw new Error('appId and clientSecret are required to get bot token');
    }

    try {
      const response = await axios.post(
        'https://bots.qq.com/app/getAppAccessToken',
        {
          appId: this.appId,
          clientSecret: this.clientSecret,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      this.botToken = response.data.access_token;
      this.botTokenExpireTime = Date.now() + (response.data.expires_in - 60) * 1000; // 提前60秒过期

      return {
        access_token: this.botToken,
        expires_in: response.data.expires_in,
      };
    } catch (error) {
      throw new Error(`Failed to get bot token: ${error.message}`);
    }
  }

  /**
   * 检查并刷新Bot Token
   * @returns {Promise<string>} Bot Token
   */
  async checkAndRefreshToken() {
    if (!this.botToken || Date.now() >= this.botTokenExpireTime) {
      await this.getBotToken();
    }
    return this.botToken;
  }

  /**
   * 获取完整的Bot Token字符串
   * 格式：Bot {appid}.{token}
   * @returns {Promise<string>} 完整的Bot Token
   */
  async getFullBotToken() {
    const token = await this.checkAndRefreshToken();
    return `Bot ${this.appId}.${token}`;
  }

  /**
   * 清除Token缓存
   */
  clearToken() {
    this.botToken = null;
    this.botTokenExpireTime = 0;
  }
}

export default BotTokenManager;
