/**
 * API模块索引
 */

import GuildAPI from './guild.js';
import MemberAPI from './member.js';
import ChannelAPI from './channel.js';
import MessageAPI from './message.js';
import ReactionAPI from './reaction.js';
import AudioAPI from './audio.js';
import ForumAPI from './forum.js';
import PermissionAPI from './permission.js';
import UserAPI from './user.js';
import ScheduleAPI from './schedule.js';
import MessageAuditAPI from './messageAudit.js';

// 导出所有API类
export {
  GuildAPI,
  MemberAPI,
  ChannelAPI,
  MessageAPI,
  ReactionAPI,
  AudioAPI,
  ForumAPI,
  PermissionAPI,
  UserAPI,
  ScheduleAPI,
  MessageAuditAPI,
};

// 默认导出
export default {
  GuildAPI,
  MemberAPI,
  ChannelAPI,
  MessageAPI,
  ReactionAPI,
  AudioAPI,
  ForumAPI,
  PermissionAPI,
  UserAPI,
  ScheduleAPI,
  MessageAuditAPI,
};
