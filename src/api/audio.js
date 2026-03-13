/**
 * 音频API
 * 基于腾讯官方文档：https://bot.q.qq.com/wiki/develop/api-v2/server-inter/audio/
 */

import { AudioControl, AudioStatus  } from '../types/index.js';

class AudioAPI {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  /**
   * 音频控制
   * @param {string} channelId - 子频道ID
   * @param {Object} options - 音频控制选项
   * @param {string} options.audio_url - 音频URL
   * @param {string} options.text - 状态文本
   * @param {number} options.status - 播放状态
   * @returns {Promise<void>}
   */
  async controlAudio(channelId, options) {
    await this.httpClient.post(`/channels/${channelId}/audio`, options);
  }

  /**
   * 开始播放音频
   * @param {string} channelId - 子频道ID
   * @param {string} audioUrl - 音频URL
   * @param {string} text - 状态文本
   * @returns {Promise<void>}
   */
  async startAudio(channelId, audioUrl, text = '') {
    await this.controlAudio(channelId, {
      audio_url: audioUrl,
      text,
      status: AudioStatus.START,
    });
  }

  /**
   * 暂停播放音频
   * @param {string} channelId - 子频道ID
   * @param {string} text - 状态文本
   * @returns {Promise<void>}
   */
  async pauseAudio(channelId, text = '') {
    await this.controlAudio(channelId, {
      text,
      status: AudioStatus.PAUSE,
    });
  }

  /**
   * 继续播放音频
   * @param {string} channelId - 子频道ID
   * @param {string} text - 状态文本
   * @returns {Promise<void>}
   */
  async resumeAudio(channelId, text = '') {
    await this.controlAudio(channelId, {
      text,
      status: AudioStatus.RESUME,
    });
  }

  /**
   * 停止播放音频
   * @param {string} channelId - 子频道ID
   * @param {string} text - 状态文本
   * @returns {Promise<void>}
   */
  async stopAudio(channelId, text = '') {
    await this.controlAudio(channelId, {
      text,
      status: AudioStatus.STOP,
    });
  }

  /**
   * 获取麦克风列表
   * @param {string} channelId - 子频道ID
   * @returns {Promise<Object>} 麦克风列表
   */
  async getMicList(channelId) {
    const data = await this.httpClient.get(`/channels/${channelId}/mic`);
    return data;
  }

  /**
   * 上麦
   * @param {string} channelId - 子频道ID
   * @returns {Promise<void>}
   */
  async onMic(channelId) {
    await this.httpClient.put(`/channels/${channelId}/mic`);
  }

  /**
   * 下麦
   * @param {string} channelId - 子频道ID
   * @returns {Promise<void>}
   */
  async offMic(channelId) {
    await this.httpClient.delete(`/channels/${channelId}/mic`);
  }
}

export default AudioAPI;
