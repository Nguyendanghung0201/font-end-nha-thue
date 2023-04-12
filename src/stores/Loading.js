const state = {
    loadingStatus: false
}
const getters = {
    loadingStatus: (state) => state.loadingStatus,
}
//
// const mutations = {
//     SAVE_LOADING_STATE(state,data){
//         state.loadingStatus = data;
//     }
// }

const actions = {
    loaderToggle({ state }, { status = false }) {
        state.loadingStatus = status
    },
}
export default {
    namespaced: true,
    state,
    getters,
    // mutations,
    actions
}
