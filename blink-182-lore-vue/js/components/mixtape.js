// Mixtape Component for Vue.js
const MixtapeSection = {
    props: ['mixtapes', 'selectedMixtape'],
    emits: ['add-mixtape', 'delete-mixtape', 'select-mixtape', 'remove-song'],
    data() {
        return {
            newMixtapeName: ''
        };
    },
    template: `
        <div class="mixtape-container">
            <h2 class="mixtape-header-title">Your Mixtapes</h2>
            <div class="mixtape-controls">
                <input 
                    type="text" 
                    v-model="newMixtapeName"
                    placeholder="Mixtape name" 
                    class="mixtape-name-input"
                    @keyup.enter="addMixtape">
                <button @click="addMixtape" class="mixtape-add-button">Add Mixtape</button>
            </div>
            <div class="mixtape-cards-container">
                <div 
                    v-for="(mixtape, index) in mixtapes" 
                    :key="index"
                    class="mixtape-card"
                    :class="{ 'active-mixtape': index === selectedMixtape }">
                    
                    <h3 class="mixtape-card-title">{{ mixtape.name }}</h3>
                    
                    <div class="song-list-header">
                        <span>Song</span>
                        <span>Album</span>
                        <span>Band</span>
                        <span></span>
                    </div>
                    
                    <div class="song-list">
                        <div v-if="mixtape.songs.length === 0" class="empty-song-message">
                            No songs yet!
                        </div>
                        <div 
                            v-else
                            v-for="(song, songIndex) in mixtape.songs" 
                            :key="songIndex"
                            class="song-list-item">
                            <span class="song-title-style">{{ song.title || song }}</span>
                            <span class="album-title-style">{{ song.album || '' }}</span>
                            <span class="band-name-style">{{ song.band || '' }}</span>
                            <button 
                                class="remove-btn" 
                                @click="$emit('remove-song', index, songIndex)">
                                Remove
                            </button>
                        </div>
                    </div>
                    
                    <button 
                        class="mixtape-view-button"
                        :class="{ 'selected-view': index === selectedMixtape }"
                        @click="$emit('select-mixtape', index)">
                        {{ index === selectedMixtape ? 'Selected' : 'View' }}
                    </button>
                    
                    <button 
                        class="mixtape-delete-button" 
                        @click="$emit('delete-mixtape', index)"
                        style="position: absolute; top: 0.7em; left: 0.7em; background: #eee; color: #FF79B4; border: none; border-radius: 50%; padding: 0.2em 0.5em; cursor: pointer; font-weight: bold; fontSize: 1em; width: 2em; height: 2em; display: flex; align-items: center; justify-content: center;">
                        🗑️
                    </button>
                </div>
            </div>
        </div>
    `,
    methods: {
        addMixtape() {
            if (this.newMixtapeName.trim() && this.mixtapes.length < 5) {
                this.$emit('add-mixtape', this.newMixtapeName.trim());
                this.newMixtapeName = '';
            }
        }
    }
};