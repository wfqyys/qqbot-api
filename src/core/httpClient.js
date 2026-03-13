/**
 * QQ Bot API HTTP客户端
 * 基于腾讯官方文档：https://bot.q.qq.com/wiki/develop/api-v2/
 */

import axios from 'axios';
import { QQBotError, createErrorFromResponse } from './errorCode.js';

/**
 * QQ Bot API客户端类
 */
class QQBotHttpClient {
  /**
   * 构造函数
   * @param {Object} config - 配置对象
   * @param {string} config.appId - 机器人AppID
   * @param {string} config.clientSecret - 机器人ClientSecret
   * @param {string} config.token - 机器人Token（可选，与appId/clientSecret二选一）
   * @param {string} config.sandbox - 是否沙箱环境
   */
  constructor(config = {}) {
    this.appId = config.appId;
    this.clientSecret = config.clientSecret;
    this.token = config.token;
    this.sandbox = config.sandbox || false;

    // API基础URL
    this.baseURL = this.sandbox
      ? 'https://sandbox.api.sgroup.qq.com'
      : 'https://api.sgroup.qq.com';

    // 访问令牌
    this.accessToken = null;
    this.accessTokenExpireTime = 0;

    // 创建axios实例
    this.axios = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // 请求拦截器
    this.axios.interceptors.request.use(
      async (config) => {
        // 如果没有token，先获取token
        if (!this.token && !this.accessToken) {
          await this.getAccessToken();
        }

        // 设置Authorization头
        // 根据腾讯官方文档，使用格式：QQBot {ACCESS_TOKEN}
        if (this.token) {
          // 如果提供了token，直接使用
          config.headers['Authorization'] = `QQBot ${this.token}`;
        } else if (this.accessToken) {
          // 使用获取到的access_token
          config.headers['Authorization'] = `QQBot ${this.accessToken}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.axios.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        if (error.response) {
          const { status, data } = error.response;
          // 使用QQBotError处理错误
          throw createErrorFromResponse(data);
        }
        throw error;
      }
    );
  }

  /**
   * 获取访问令牌
   * @returns {Promise<Object>} 令牌信息
   */
  async getAccessToken() {
    if (!this.appId || !this.clientSecret) {
      throw new Error('appId and clientSecret are required to get access token');
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

      this.accessToken = response.data.access_token;
      this.accessTokenExpireTime = Date.now() + (response.data.expires_in - 60) * 1000; // 提前60秒过期

      return response.data;
    } catch (error) {
      throw new Error(`Failed to get access token: ${error.message}`);
    }
  }

  /**
   * 检查并刷新访问令牌
   */
  async checkAndRefreshToken() {
    if (this.token) {
      return; // 使用固定token，不需要刷新
    }

    if (!this.accessToken || Date.now() >= this.accessTokenExpireTime) {
      await this.getAccessToken();
    }
  }

  /**
   * GET请求
   * @param {string} path - API路径
   * @param {Object} params - 查询参数
   * @returns {Promise<Object>} 响应数据
   */
  async get(path, params = {}) {
    await this.checkAndRefreshToken();
    return this.axios.get(path, { params });
  }

  /**
   * POST请求
   * @param {string} path - API路径
   * @param {Object} data - 请求体
   * @returns {Promise<Object>} 响应数据
   */
  async post(path, data = {}) {
    await this.checkAndRefreshToken();
    return this.axios.post(path, data);
  }

  /**
   * PUT请求
   * @param {string} path - API路径
   * @param {Object} data - 请求体
   * @returns {Promise<Object>} 响应数据
   */
  async put(path, data = {}) {
    await this.checkAndRefreshToken();
    return this.axios.put(path, data);
  }

  /**
   * PATCH请求
   * @param {string} path - API路径
   * @param {Object} data - 请求体
   * @returns {Promise<Object>} 响应数据
   */
  async patch(path, data = {}) {
    await this.checkAndRefreshToken();
    return this.axios.patch(path, data);
  }

  /**
   * DELETE请求
   * @param {string} path - API路径
   * @returns {Promise<Object>} 响应数据
   */
  async delete(path) {
    await this.checkAndRefreshToken();
    return this.axios.delete(path);
  }
}

export default QQBotHttpClient;
