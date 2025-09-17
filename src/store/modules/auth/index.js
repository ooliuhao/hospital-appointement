import AuthService from '@/views/system/api/auth.service';

var user = JSON.parse(localStorage.getItem('user'));
// user = {"id":"2c8fd013-53e8-4417-b33d-94b01621c695","roles":["ROLE_ADMIN"],"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJjOGZkMDEzLTUzZTgtNDQxNy1iMzNkLTk0YjAxNjIxYzY5NSIsImlhdCI6MTY4NjU5NDg4NywiZXhwIjoxNjg2NTk1Nzg3fQ.415gLiwykI8kKx78aS8QAs40sri3zklMAlCylpy1rUc","refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJjOGZkMDEzLTUzZTgtNDQxNy1iMzNkLTk0YjAxNjIxYzY5NSIsImlhdCI6MTY4NjU5NDg4NywiZXhwIjoxNjg2NTk4NDg3fQ.VEyIJeHO-BvX3N33bsZN0URC4qVeMw3bKW8h-CfsDYo","name":"asdfad"}
const initialState = user ? { status: { loggedIn: true }, user } : { status: { loggedIn: false }, user: null };
export default{
  namespaced: true,
  state: initialState,
  getters: {
    user(state) {
      return state.user;
    },
  },
  actions: {
    login({ commit }, user) {
      // .then(response => {
        
      // })
      return AuthService.login(user).then(
        response => {
          if (response.loginUser.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.loginUser))
            sessionStorage.setItem('user', JSON.stringify(response.loginUser))
          }
          commit('loginSuccess', response);
          return Promise.resolve(response);
        },
        error => {
          commit('loginFailure');
         
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    },
    updateAccessToken({ commit }, newAccessToken) {
      commit('updateAccessToken', newAccessToken);
    },
    updateLoginInfo({ commit }, updatedInfo) {
      commit('updateLoginInfoMu', updatedInfo)
    }
  },
  mutations: {
    loginSuccess(state, user) {
      // console.log(user)
      state.status.loggedIn = true;
      state.user = user.loginUser;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
    updateAccessToken(state, newAccessToken) {
      state.user.accessToken = newAccessToken;
    },
    updateLoginInfoMu(state, updatedInfo) {
      state.user.name = updatedInfo.name
    }
  }
};