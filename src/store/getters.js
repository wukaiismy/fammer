const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  ids: state => state.user.ids,
  tel: state => state.user.tel,
  setting: state => state.user.setting,
  u_type: state => state.user.u_type,
  admin_id: state => state.user.admin_id,
  rgbs: state => state.user.rgbs
};
export default getters;
