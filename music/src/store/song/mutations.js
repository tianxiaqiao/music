export default{
    addSongList(state,params){
        // console.log(params)
        state.songlist=params.songlist
        state.currentIndex=params.currentIndex
        // state.hehe=params.hehe
        // console.log(state.hehe)
    },
    nextSong(state){
        // console.log(state)
        if(state.currentIndex<state.songlist.length-1){
            state.currentIndex=state.currentIndex+1
        }
    },
    prevSong(state){
        if(state.currentIndex>=1){
            state.currentIndex=state.currentIndex-1
        }

    }
}