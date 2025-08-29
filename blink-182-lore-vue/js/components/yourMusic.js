// Your Music Component for Vue.js
const YourMusicSection = {
    emits: ['add-to-mixtape'],
    data() {
        return {
            yourMusic: this.loadYourMusic(),
            newSong: {
                title: '',
                album: '',
                band: ''
            }
        };
    },
    template: `
        <section id="your-music-section">
            <h2 style="font-size: 2em;">Want to add your own songs to your mixtape?</h2>
            <form @submit.prevent="addSong">
                <input 
                    type="text" 
                    v-model="newSong.title"
                    placeholder="Song Title" 
                    required>
                <input 
                    type="text" 
                    v-model="newSong.album"
                    placeholder="Album Name" 
                    required>
                <input 
                    type="text" 
                    v-model="newSong.band"
                    placeholder="Band Name" 
                    required>
                <button type="submit">Add Song</button>
            </form>
            
            <h3 style="font-size: 1.5em; margin-top: 1em;">Your music</h3>
            <ul id="your-music-list" style="font-size: 1.3em;">
                <li v-if="yourMusic.length === 0" style="color: #aaa;">
                    No songs added yet.
                </li>
                <li v-else v-for="(item, index) in yourMusic" :key="index">
                    <div class="song-info">
                        <span class="song-title">{{ item.title }}</span>
                        <span class="album-title">{{ item.album }}</span>
                        <span class="band-name">{{ item.band }}</span>
                    </div>
                    <div class="button-group">
                        <button 
                            class="add-to-mixtape-btn" 
                            @click="$emit('add-to-mixtape', item.title, item.album, item.band)">
                            Add to Mixtape
                        </button>
                        <button 
                            class="remove-btn" 
                            @click="removeSong(index)">
                            Remove
                        </button>
                    </div>
                </li>
            </ul>
        </section>
    `,
    methods: {
        loadYourMusic() {
            const saved = localStorage.getItem('yourMusic');
            return saved ? JSON.parse(saved) : [];
        },
        
        saveYourMusic() {
            localStorage.setItem('yourMusic', JSON.stringify(this.yourMusic));
        },
        
        addSong() {
            if (this.newSong.title && this.newSong.album && this.newSong.band) {
                this.yourMusic.push({ ...this.newSong });
                this.saveYourMusic();
                
                // Clear form
                this.newSong = { title: '', album: '', band: '' };
            }
        },
        
        removeSong(index) {
            this.yourMusic.splice(index, 1);
            this.saveYourMusic();
        }
    }
};