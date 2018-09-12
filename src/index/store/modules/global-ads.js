import api from '~api'

const state = () => ({
    lists: [],
    allAds : {}
})

const actions = {
    async ['getAdsList']({ commit, state }, config={}) {
        if(state.allAds[config.id]){
            // console.log(`广告${config.id}已缓存.`,state.allAds)
            return state.allAds[config.id]
        }
        const { data } = await api.get('ads/getOne', { ...config })
        if (data.doc && data.state === 'success') {
            commit('receiveAdsList', {
                ...config,
                ...data
            })
            return data.doc
        }
    }
}

const mutations = {
    ['receiveAdsList'](state, { doc, hasNext, hasPrev, page, path }) {
        state.lists = {
            data: doc, hasNext, hasPrev, page, path, 
        }
        state.allAds[doc.id] = doc
    }
}

const getters = {
    ['getAdsList'](state) {
        return state.lists
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
