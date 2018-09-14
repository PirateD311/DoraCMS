import api from '~api'

const state = () => ({
    lists: [],
    allAds : {
        time:''
    }
})

const actions = {
    async ['getAdsList']({ commit, state }, config={}) {
        if(state.allAds[config.id]){
            return state.allAds[config.id]
        }else{
            if(!state.allAds.time){
                const { data } = await api.get('ads/getAll', { ...config })
                if (data.docs && data.state === 'success') {
                    commit('receiveAdsList', {
                        ...config,
                        ...data
                    })
                    return data.docs.find(v=>v.id == config.id)
                }              
            }
        }
    }
}

const mutations = {
    ['receiveAdsList'](state, { docs, hasNext, hasPrev, page, path }) {
        for(let doc of docs){
            state.allAds[doc.id] = doc
        }
        state.allAds.time = new Date().getTime()
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
