// Types for the API response
export interface ChatPhoto {
  id: string;
  className: "PhotoEmpty" | "ChatPhotoEmpty";
}

export interface PeerNotifySettings {
  flags: number;
  showPreviews: boolean | null;
  silent: boolean | null;
  muteUntil: number | null;
  iosSound: string | null;
  androidSound: string | null;
  otherSound: string | null;
  storiesMuted: boolean | null;
  storiesHideSender: boolean | null;
  storiesIosSound: string | null;
  storiesAndroidSound: string | null;
  storiesOtherSound: string | null;
  className: "PeerNotifySettings";
}

export interface ChatInviteExported {
  flags: number;
  revoked: boolean;
  permanent: boolean;
  requestNeeded: boolean;
  link: string;
  adminId: string;
  date: number;
  startDate: number | null;
  expireDate: number | null;
  usageLimit: number | null;
  usage: number | null;
  requested: number | null;
  subscriptionExpired: number | null;
  title: string | null;
  subscriptionPricing: any | null;
  className: "ChatInviteExported";
}

export interface BotInfo {
  flags: number;
  hasPreviewMedias: boolean;
  userId: string;
  description: string | null;
  descriptionPhoto: any | null;
  descriptionDocument: any | null;
  commands: any | null;
  menuButton: any | null;
  privacyPolicyUrl: string | null;
  appSettings: any | null;
  verifierSettings: any | null;
  className: "BotInfo";
}

export interface ChatReactionsAll {
  flags: number;
  allowCustom: boolean;
  className: "ChatReactionsAll";
}

export interface ChannelFull {
  flags: number;
  canViewParticipants: boolean;
  canSetUsername: boolean;
  canSetStickers: boolean;
  hiddenPrehistory: boolean;
  canSetLocation: boolean;
  hasScheduled: boolean;
  canViewStats: boolean;
  blocked: boolean;
  flags2: number;
  canDeleteChannel: boolean;
  antispam: boolean;
  participantsHidden: boolean;
  translationsDisabled: boolean;
  storiesPinnedAvailable: boolean;
  viewForumAsMessages: boolean;
  restrictedSponsored: boolean;
  canViewRevenue: boolean;
  paidMediaAllowed: boolean;
  canViewStarsRevenue: boolean;
  paidReactionsAvailable: boolean;
  stargiftsAvailable: boolean;
  id: string;
  about: string;
  participantsCount: number;
  adminsCount: number;
  kickedCount: number;
  bannedCount: number;
  onlineCount: number | null;
  readInboxMaxId: number;
  readOutboxMaxId: number;
  unreadCount: number;
  chatPhoto: ChatPhoto;
  notifySettings: PeerNotifySettings;
  exportedInvite: ChatInviteExported;
  botInfo: BotInfo[];
  migratedFromChatId: number | null;
  migratedFromMaxId: number | null;
  pinnedMsgId: number | null;
  stickerset: any | null;
  availableMinId: number | null;
  folderId: number | null;
  linkedChatId: number | null;
  location: any | null;
  slowmodeSeconds: number | null;
  slowmodeNextSendDate: number | null;
  statsDc: number;
  pts: number;
  call: any | null;
  ttlPeriod: number | null;
  pendingSuggestions: string[] | null;
  groupcallDefaultJoinAs: any | null;
  themeEmoticon: string | null;
  requestsPending: number | null;
  recentRequesters: any[] | null;
  defaultSendAs: any | null;
  availableReactions: ChatReactionsAll;
  reactionsLimit: number | null;
  stories: any | null;
  wallpaper: any | null;
  boostsApplied: number | null;
  boostsUnrestrict: number | null;
  emojiset: any | null;
  botVerification: any | null;
  stargiftsCount: number | null;
  className: "ChannelFull";
}

export interface ChatAdminRights {
  flags: number;
  changeInfo: boolean;
  postMessages: boolean;
  editMessages: boolean;
  deleteMessages: boolean;
  banUsers: boolean;
  inviteUsers: boolean;
  pinMessages: boolean;
  addAdmins: boolean;
  anonymous: boolean;
  manageCall: boolean;
  other: boolean;
  manageTopics: boolean;
  postStories: boolean;
  editStories: boolean;
  deleteStories: boolean;
  className: "ChatAdminRights";
}

export interface Channel {
  flags: number;
  creator: boolean;
  left: boolean;
  broadcast: boolean;
  verified: boolean;
  megagroup: boolean;
  restricted: boolean;
  signatures: boolean;
  min: boolean;
  scam: boolean;
  hasLink: boolean;
  hasGeo: boolean;
  slowmodeEnabled: boolean;
  callActive: boolean;
  callNotEmpty: boolean;
  fake: boolean;
  gigagroup: boolean;
  noforwards: boolean;
  joinToSend: boolean;
  joinRequest: boolean;
  forum: boolean;
  flags2: number;
  storiesHidden: boolean;
  storiesHiddenMin: boolean;
  storiesUnavailable: boolean;
  signatureProfiles: boolean;
  id: string;
  accessHash: string;
  title: string;
  username: string | null;
  photo: ChatPhoto;
  date: number;
  restrictionReason: any | null;
  adminRights: ChatAdminRights;
  bannedRights: any | null;
  defaultBannedRights: any | null;
  participantsCount: number | null;
  usernames: any | null;
  storiesMaxId: number | null;
  color: any | null;
  profileColor: any | null;
  emojiStatus: any | null;
  level: number | null;
  subscriptionUntilDate: number | null;
  botVerificationIcon: any | null;
  className: "Channel";
}

export interface UserStatus {
  wasOnline: number;
  className:
    | "UserStatusOffline"
    | "UserStatusOnline"
    | "UserStatusRecently"
    | "UserStatusLastWeek"
    | "UserStatusLastMonth";
}

export interface User {
  flags: number;
  self: boolean;
  contact: boolean;
  mutualContact: boolean;
  deleted: boolean;
  bot: boolean;
  botChatHistory: boolean;
  botNochats: boolean;
  verified: boolean;
  restricted: boolean;
  min: boolean;
  botInlineGeo: boolean;
  support: boolean;
  scam: boolean;
  applyMinPhoto: boolean;
  fake: boolean;
  botAttachMenu: boolean;
  premium: boolean;
  attachMenuEnabled: boolean;
  flags2: number;
  botCanEdit: boolean;
  closeFriend: boolean;
  storiesHidden: boolean;
  storiesUnavailable: boolean;
  contactRequirePremium: boolean;
  botBusiness: boolean;
  botHasMainApp: boolean;
  id: string;
  accessHash: string;
  firstName: string;
  lastName: string | null;
  username: string | null;
  phone: string | null;
  photo: any | null;
  status: UserStatus | null;
  botInfoVersion: number | null;
  restrictionReason: any | null;
  botInlinePlaceholder: string | null;
  langCode: string | null;
  emojiStatus: any | null;
  usernames: any | null;
  storiesMaxId: number | null;
  color: any | null;
  profileColor: any | null;
  botActiveUsers: number | null;
  botVerificationIcon: any | null;
  className: "User";
}

export type PrivateChannel = {
  fullChat: ChannelFull;
  chats: Channel[];
  users: User[];
  className: "messages.ChatFull";
};
