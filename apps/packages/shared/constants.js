export const EVENTS = {
  FEED_POST:'feed:post', FEED_NEW:'feed:new', FEED_EXPIRE:'feed:expire', FEED_INITIAL:'feed:initial',
  MATCH_JOIN:'match:join', MATCH_SUCCESS:'match:success', MATCH_FAILED:'match:failed',
  ROOM_MESSAGE:'room:message', ROOM_LEAVE:'room:leave', ROOM_PARTNER_LEFT:'room:partner_left',
  ROOM_REPORT:'room:report', ROOM_CLOSED:'room:closed',
  PRESENCE_UPDATE:'presence:update', PRESENCE_PING:'presence:ping',
};
export const LIMITS = {
  POST_MAX_LENGTH:160, POST_TTL_HOURS:3, POST_TTL_MS:3*60*60*1000, MATCH_LOCK_TTL:10,
};
export const CATEGORIES = [
  {id:'all',label:'All',icon:'Sparkles',primary:true},{id:'trips',label:'Trips',icon:'Plane',primary:true},
  {id:'chill',label:'Chill',icon:'Coffee',primary:true},{id:'code',label:'Code',icon:'Code2',primary:true},
  {id:'music',label:'Music',icon:'Music',primary:true},{id:'startups',label:'Startups',icon:'Rocket',primary:false},
  {id:'design',label:'Design',icon:'Palette',primary:false},{id:'fitness',label:'Fitness',icon:'Dumbbell',primary:false},
  {id:'gaming',label:'Gaming',icon:'Gamepad2',primary:false},{id:'food',label:'Food',icon:'Utensils',primary:false},
  {id:'art',label:'Art',icon:'Image',primary:false},{id:'writing',label:'Writing',icon:'PenLine',primary:false},
  {id:'film',label:'Film',icon:'Clapperboard',primary:false},{id:'finance',label:'Finance',icon:'TrendingUp',primary:false},
  {id:'science',label:'Science',icon:'FlaskConical',primary:false},{id:'exploring',label:'Exploring',icon:'Sprout',primary:false},
  {id:'urgent',label:'Urgent',icon:'Flame',primary:false},
];
export const VIBES = ['building','exploring','urgent','casual'];