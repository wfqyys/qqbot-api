/**
 * QQ Bot API 类型定义
 * 基于腾讯官方文档：https://bot.q.qq.com/wiki/develop/api-v2/
 */

// ==================== 基础类型 ====================

/**
 * 频道对象
 */
class Guild {
  constructor(data = {}) {
    this.id = data.id; // 频道ID
    this.name = data.name; // 频道名称
    this.icon = data.icon; // 频道头像地址
    this.owner_id = data.owner_id; // 创建人用户ID
    this.owner = data.owner; // 创建人
    this.member_count = data.member_count; // 成员数
    this.max_members = data.max_members; // 最大成员数
    this.description = data.description; // 描述
    this.joined_at = data.joined_at; // 加入时间
  }
}

/**
 * 子频道对象
 */
class Channel {
  constructor(data = {}) {
    this.id = data.id; // 子频道ID
    this.guild_id = data.guild_id; // 频道ID
    this.name = data.name; // 子频道名称
    this.type = data.type; // 子频道类型
    this.sub_type = data.sub_type; // 子频道子类型
    this.position = data.position; // 排序
    this.parent_id = data.parent_id; // 父频道ID
    this.owner_id = data.owner_id; // 创建人ID
    this.private_type = data.private_type; // 私密类型
    this.private_user_limit = data.private_user_limit; // 私密用户限制
    this.speak_permission = data.speak_permission; // 发言权限
    this.application_id = data.application_id; // 应用ID
    this.permissions = data.permissions; // 权限
  }
}

/**
 * 子频道类型
 */
const ChannelType = {
  TEXT: 0, // 文字子频道
  VOICE: 2, // 语音子频道
  CATEGORY: 4, // 子频道分组
  LIVE: 10005, // 直播子频道
  APPLICATION: 10006, // 应用子频道
  FORUM: 10007, // 论坛子频道
};

/**
 * 子频道子类型
 */
const ChannelSubType = {
  CONVERSATION: 0, // 闲聊
  ANNOUNCEMENT: 1, // 公告
  STRATEGY: 2, // 攻略
  HELP: 3, // 帮助
};

/**
 * 成员对象
 */
class Member {
  constructor(data = {}) {
    this.user = data.user; // 用户对象
    this.nick = data.nick; // 昵称
    this.roles = data.roles || []; // 角色ID列表
    this.joined_at = data.joined_at; // 加入时间
  }
}

/**
 * 用户对象
 */
class User {
  constructor(data = {}) {
    this.id = data.id; // 用户ID
    this.username = data.username; // 用户名
    this.avatar = data.avatar; // 头像
    this.bot = data.bot; // 是否是机器人
    this.union_openid = data.union_openid; // 特殊关联的openid
    this.union_user_account = data.union_user_account; // 特殊关联的用户信息
  }
}

/**
 * 消息对象
 */
class Message {
  constructor(data = {}) {
    this.id = data.id; // 消息ID
    this.channel_id = data.channel_id; // 子频道ID
    this.guild_id = data.guild_id; // 频道ID
    this.content = data.content; // 消息内容
    this.timestamp = data.timestamp; // 发送时间
    this.edited_timestamp = data.edited_timestamp; // 编辑时间
    this.mention = data.mention || []; // @用户列表
    this.mention_roles = data.mention_roles || []; // @角色列表
    this.mention_everyone = data.mention_everyone; // 是否@所有人
    this.author = data.author; // 作者
    this.attachments = data.attachments || []; // 附件
    this.embeds = data.embeds || []; // embed
    this.ark = data.ark; // ark消息
    this.message_reference = data.message_reference; // 引用消息
    this.seq = data.seq; // 序号
    this.seq_in_channel = data.seq_in_channel; // 子频道内序号
  }
}

/**
 * 消息引用对象
 */
class MessageReference {
  constructor(data = {}) {
    this.message_id = data.message_id; // 引用消息ID
    this.channel_id = data.channel_id; // 引用消息所在子频道ID
    this.guild_id = data.guild_id; // 引用消息所在频道ID
  }
}

/**
 * 附件对象
 */
class Attachment {
  constructor(data = {}) {
    this.url = data.url; // 下载地址
  }
}

/**
 * Embed对象
 */
class Embed {
  constructor(data = {}) {
    this.title = data.title; // 标题
    this.description = data.description; // 描述
    this.prompt = data.prompt; // 消息弹窗内容
    this.timestamp = data.timestamp; // 时间
    this.fields = data.fields || []; // 字段列表
    this.color = data.color; // 颜色
  }
}

/**
 * Embed字段对象
 */
class EmbedField {
  constructor(data = {}) {
    this.name = data.name; // 字段名
    this.value = data.value; // 字段值
  }
}

/**
 * Ark消息对象
 */
class Ark {
  constructor(data = {}) {
    this.template_id = data.template_id; // 模版ID
    this.kv = data.kv || []; // kv列表
  }
}

/**
 * Ark KV对象
 */
class ArkKv {
  constructor(data = {}) {
    this.key = data.key; // key
    this.value = data.value; // value
    this.obj = data.obj || []; // obj列表
  }
}

/**
 * Ark KV Obj对象
 */
class ArkKvObj {
  constructor(data = {}) {
    this.obj_kv = data.obj_kv || []; // obj_kv列表
  }
}

/**
 * 消息反应对象
 */
class Reaction {
  constructor(data = {}) {
    this.user_id = data.user_id; // 用户ID
    this.guild_id = data.guild_id; // 频道ID
    this.channel_id = data.channel_id; // 子频道ID
    this.message_id = data.message_id; // 消息ID
    this.emoji = data.emoji; // 表情
  }
}

/**
 * 表情对象
 */
class Emoji {
  constructor(data = {}) {
    this.id = data.id; // 表情ID
    this.type = data.type; // 表情类型
  }
}

/**
 * 表情类型
 */
const EmojiType = {
  SYSTEM: 1, // 系统表情
  CUSTOM: 2, // 自定义表情
};

/**
 * 角色对象
 */
class Role {
  constructor(data = {}) {
    this.id = data.id; // 角色ID
    this.name = data.name; // 角色名称
    this.color = data.color; // ARGB的HEX十六进制颜色值转换后的十进制数值
    this.hoist = data.hoist; // 是否在成员列表中单独展示
    this.number = data.number; // 人数
    this.member_limit = data.member_limit; // 成员上限
  }
}

/**
 * API权限对象
 */
class APIPermission {
  constructor(data = {}) {
    this.path = data.path; // API路径
    this.method = data.method; // 请求方法
    this.desc = data.desc; // 描述
    this.auth_status = data.auth_status; // 授权状态
  }
}

/**
 * API权限需求对象
 */
class APIPermissionDemand {
  constructor(data = {}) {
    this.path = data.path; // API路径
    this.method = data.method; // 请求方法
    this.desc = data.desc; // 描述
    this.api_id = data.api_id; // API接口ID
  }
}

/**
 * 音频控制对象
 */
class AudioControl {
  constructor(data = {}) {
    this.audio_url = data.audio_url; // 音频URL
    this.text = data.text; // 状态文本
    this.status = data.status; // 播放状态
  }
}

/**
 * 音频状态
 */
const AudioStatus = {
  START: 0, // 开始播放
  PAUSE: 1, // 暂停播放
  RESUME: 2, // 继续播放
  STOP: 3, // 停止播放
};

/**
 * 论坛帖子对象
 */
class Thread {
  constructor(data = {}) {
    this.guild_id = data.guild_id; // 频道ID
    this.channel_id = data.channel_id; // 子频道ID
    this.author_id = data.author_id; // 作者ID
    this.thread_info = data.thread_info; // 帖子详情
  }
}

/**
 * 帖子详情对象
 */
class ThreadInfo {
  constructor(data = {}) {
    this.title = data.title; // 标题
    this.content = data.content; // 内容
    this.date_time = data.date_time; // 发帖时间
  }
}

/**
 * 帖子内容对象
 */
class ThreadContent {
  constructor(data = {}) {
    this.paragraphs = data.paragraphs || []; // 段落列表
    this.attachments = data.attachments || []; // 附件列表
  }
}

/**
 * 帖子段落对象
 */
class Paragraph {
  constructor(data = {}) {
    this.type = data.type; // 段落类型
    this.elems = data.elems || []; // 元素列表
  }
}

/**
 * 段落类型
 */
const ParagraphType = {
  TEXT: 1, // 文本
  IMAGE: 2, // 图片
  VIDEO: 3, // 视频
};

/**
 * 帖子元素对象
 */
class ParagraphElem {
  constructor(data = {}) {
    this.type = data.type; // 元素类型
    this.text = data.text; // 文本元素
    this.image = data.image; // 图片元素
    this.video = data.video; // 视频元素
  }
}

/**
 * 文本元素对象
 */
class TextElem {
  constructor(data = {}) {
    this.text = data.text; // 文本内容
  }
}

/**
 * 图片元素对象
 */
class ImageElem {
  constructor(data = {}) {
    this.url = data.url; // 图片URL
    this.width = data.width; // 宽度
    this.height = data.height; // 高度
  }
}

/**
 * 视频元素对象
 */
class VideoElem {
  constructor(data = {}) {
    this.url = data.url; // 视频URL
    this.width = data.width; // 宽度
    this.height = data.height; // 高度
  }
}

/**
 * 分页对象
 */
class Page {
  constructor(data = {}) {
    this.before = data.before; // 上一页
    this.after = data.after; // 下一页
    this.limit = data.limit; // 每页数量
  }
}

/**
 * DMS消息对象
 */
class DMS {
  constructor(data = {}) {
    this.guild_id = data.guild_id; // 频道ID
    this.channel_id = data.channel_id; // 子频道ID
    this.create_time = data.create_time; // 创建时间
  }
}

/**
 * WebSocket事件类型
 */
const EventType = {
  READY: 'READY', // 连接成功
  ERROR: 'ERROR', // 错误
  GUILD_CREATE: 'GUILD_CREATE', // 频道创建
  GUILD_UPDATE: 'GUILD_UPDATE', // 频道更新
  GUILD_DELETE: 'GUILD_DELETE', // 频道删除
  CHANNEL_CREATE: 'CHANNEL_CREATE', // 子频道创建
  CHANNEL_UPDATE: 'CHANNEL_UPDATE', // 子频道更新
  CHANNEL_DELETE: 'CHANNEL_DELETE', // 子频道删除
  GUILD_MEMBER_ADD: 'GUILD_MEMBER_ADD', // 成员加入
  GUILD_MEMBER_UPDATE: 'GUILD_MEMBER_UPDATE', // 成员更新
  GUILD_MEMBER_REMOVE: 'GUILD_MEMBER_REMOVE', // 成员移除
  MESSAGE_CREATE: 'MESSAGE_CREATE', // 消息创建
  MESSAGE_DELETE: 'MESSAGE_DELETE', // 消息删除
  MESSAGE_REACTION_ADD: 'MESSAGE_REACTION_ADD', // 消息反应添加
  MESSAGE_REACTION_REMOVE: 'MESSAGE_REACTION_REMOVE', // 消息反应移除
  DIRECT_MESSAGE_CREATE: 'DIRECT_MESSAGE_CREATE', // 私信消息创建
  THREAD_CREATE: 'THREAD_CREATE', // 帖子创建
  THREAD_UPDATE: 'THREAD_UPDATE', // 帖子更新
  THREAD_DELETE: 'THREAD_DELETE', // 帖子删除
  POST_CREATE: 'POST_CREATE', // 帖子发布
  POST_DELETE: 'POST_DELETE', // 帖子删除
  REPLY_CREATE: 'REPLY_CREATE', // 回复创建
  REPLY_DELETE: 'REPLY_DELETE', // 回复删除
  AUDIO_START: 'AUDIO_START', // 音频开始播放
  AUDIO_FINISH: 'AUDIO_FINISH', // 音频播放完成
  AUDIO_ON_MIC: 'AUDIO_ON_MIC', // 上麦
  AUDIO_OFF_MIC: 'AUDIO_OFF_MIC', // 下麦
};

/**
 * Intent事件订阅类型
 */
const Intent = {
  GUILDS: 1 << 0, // 频道事件
  GUILD_MEMBERS: 1 << 1, // 成员事件
  GUILD_MESSAGES: 1 << 9, // 消息事件
  GUILD_MESSAGE_REACTIONS: 1 << 10, // 消息反应事件
  DIRECT_MESSAGE: 1 << 12, // 私信事件
  OPEN_FORUMS_EVENT: 1 << 18, // 论坛事件
  AUDIO_OR_LIVE_CHANNEL_MEMBER: 1 << 19, // 音频/直播成员事件
  INTERACTION: 1 << 26, // 互动事件
  MESSAGE_AUDIT: 1 << 27, // 消息审核事件
  FORUM_EVENT: 1 << 28, // 论坛事件
};

/**
 * OpCode类型
 */
const OpCode = {
  DISPATCH: 0, // 服务端进行消息推送
  HEARTBEAT: 1, // 客户端发送心跳
  IDENTIFY: 2, // 客户端发送鉴权
  RESUME: 6, // 客户端恢复连接
  RECONNECT: 7, // 服务端通知客户端重新连接
  INVALID_SESSION: 9, // 当identify或resume的时候，如果参数有错，服务端会返回该消息
  HELLO: 10, // 当与Websocket建立连接之后，后续将回返回一个Hello消息
  HEARTBEAT_ACK: 11, // 心跳回执
};

/**
 * Gateway连接信息对象
 */
class Gateway {
  constructor(data = {}) {
    this.url = data.url; // WebSocket连接地址
    this.shards = data.shards; // 建议的shard数
    this.session_start_limit = data.session_start_limit; // 创建Session限制
  }
}

/**
 * Session限制对象
 */
class SessionStartLimit {
  constructor(data = {}) {
    this.total = data.total; // 每天可以创建Session总数
    this.remaining = data.remaining; // 目前还可以创建的Session数
    this.reset_after = data.reset_after; // 重置计数的剩余时间(ms)
    this.max_concurrency = data.max_concurrency; // 最大并发数
  }
}

/**
 * 机器人信息对象
 */
class BotInfo {
  constructor(data = {}) {
    this.id = data.id; // 机器人ID
    this.username = data.username; // 机器人名称
    this.avatar = data.avatar; // 机器人头像
  }
}

/**
 * 机器人所在频道对象
 */
class BotGuild {
  constructor(data = {}) {
    this.id = data.id; // 频道ID
    this.name = data.name; // 频道名称
    this.icon = data.icon; // 频道头像
  }
}

/**
 * 私信消息对象
 */
class DirectMessage {
  constructor(data = {}) {
    this.id = data.id; // 消息ID
    this.channel_id = data.channel_id; // 子频道ID
    this.guild_id = data.guild_id; // 频道ID
    this.content = data.content; // 消息内容
    this.timestamp = data.timestamp; // 发送时间
    this.author = data.author; // 作者
    this.attachments = data.attachments || []; // 附件
    this.embeds = data.embeds || []; // embed
    this.ark = data.ark; // ark消息
  }
}

/**
 * 日程对象
 */
class Schedule {
  constructor(data = {}) {
    this.id = data.id; // 日程ID
    this.name = data.name; // 日程名称
    this.description = data.description; // 日程描述
    this.start_timestamp = data.start_timestamp; // 日程开始时间戳(ms)
    this.end_timestamp = data.end_timestamp; // 日程结束时间戳(ms)
    this.creator = data.creator; // 创建者
    this.jump_channel_id = data.jump_channel_id; // 日程跳转子频道ID
    this.remind_type = data.remind_type; // 日程提醒类型
  }
}

/**
 * 日程提醒类型
 */
const ScheduleRemindType = {
  NO_REMIND: 0, // 不提醒
  START: 1, // 开始时提醒
  MINUTES_5: 2, // 开始前5分钟提醒
  MINUTES_15: 3, // 开始前15分钟提醒
  MINUTES_30: 4, // 开始前30分钟提醒
  MINUTES_60: 5, // 开始前60分钟提醒
};

/**
 * 表情对象（用于消息反应）
 */
class EmojiInfo {
  constructor(data = {}) {
    this.id = data.id; // 表情ID
    this.type = data.type; // 表情类型
  }
}

/**
 * 消息审核对象
 */
class MessageAudit {
  constructor(data = {}) {
    this.audit_id = data.audit_id; // 审核ID
    this.message_id = data.message_id; // 消息ID
    this.guild_id = data.guild_id; // 频道ID
    this.channel_id = data.channel_id; // 子频道ID
    this.audit_status = data.audit_status; // 审核状态
  }
}

/**
 * 审核状态
 */
const AuditStatus = {
  PENDING: 0, // 审核中
  APPROVED: 1, // 审核通过
  REJECTED: 2, // 审核不通过
};

/**
 * 互动事件对象
 */
class Interaction {
  constructor(data = {}) {
    this.id = data.id; // 互动事件ID
    this.type = data.type; // 互动事件类型
    this.channel_id = data.channel_id; // 子频道ID
    this.guild_id = data.guild_id; // 频道ID
    this.data = data.data; // 互动事件数据
    this.user_id = data.user_id; // 用户ID
    this.version = data.version; // 版本
    this.token = data.token; // token
    this.message = data.message; // 消息对象
  }
}

/**
 * 互动事件类型
 */
const InteractionType = {
  PING: 1, // ping
  APPLICATION_COMMAND: 2, // 应用命令
  MESSAGE_COMPONENT: 3, // 消息组件
  APPLICATION_COMMAND_AUTOCOMPLETE: 4, // 应用命令自动补全
  MODAL_SUBMIT: 5, // 模态框提交
};

/**
 * 回复对象
 */
class Reply {
  constructor(data = {}) {
    this.id = data.id; // 回复ID
    this.channel_id = data.channel_id; // 子频道ID
    this.guild_id = data.guild_id; // 频道ID
    this.author_id = data.author_id; // 作者ID
    this.content = data.content; // 回复内容
    this.create_time = data.create_time; // 创建时间
  }
}

// 导出所有类型
export {
  // 基础类型
  Guild,
  Channel,
  ChannelType,
  ChannelSubType,
  Member,
  User,
  Message,
  MessageReference,
  Attachment,
  Embed,
  EmbedField,
  Ark,
  ArkKv,
  ArkKvObj,
  Reaction,
  Emoji,
  EmojiType,
  Role,
  APIPermission,
  APIPermissionDemand,
  AudioControl,
  AudioStatus,
  Thread,
  ThreadInfo,
  ThreadContent,
  Paragraph,
  ParagraphType,
  ParagraphElem,
  TextElem,
  ImageElem,
  VideoElem,
  Page,
  DMS,
  EventType,
  Intent,
  OpCode,
  Gateway,
  SessionStartLimit,
  BotInfo,
  BotGuild,
  DirectMessage,
  Schedule,
  ScheduleRemindType,
  EmojiInfo,
  MessageAudit,
  AuditStatus,
  Interaction,
  InteractionType,
  Reply,
};
