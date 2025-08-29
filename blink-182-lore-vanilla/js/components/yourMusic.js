// Your Music management
class YourMusicManager {
    constructor() {
        this.yourMusic = this.loadYourMusic();
        this.renderYourMusic();
    }

    loadYourMusic() {
        const saved = localStorage.getItem('yourMusic');
        return saved ? JSON.parse(saved) : [];
    }

    saveYourMusic() {
        localStorage.setItem('yourMusic', JSON.stringify(this.yourMusic));
    }

    addSong(title, album, band) {
        const newSong = { title, album, band };
        this.yourMusic.push(newSong);
        this.saveYourMusic();
        this.renderYourMusic();
    }

    removeSong(index) {
        this.yourMusic.splice(index, 1);
        this.saveYourMusic();
        this.renderYourMusic();
    }

    renderYourMusic() {
        const list = document.getElementById('your-music-list');
        if (!list) return;

        if (this.yourMusic.length === 0) {
            list.innerHTML = '<li style="color: #aaa;">No songs added yet.</li>';
        } else {
            list.innerHTML = this.yourMusic.map((item, index) => `
                <li>
                    <div class="song-info">
                        <span class="song-title">${item.title}</span>
                        <span class="album-title">${item.album}</span>
                        <span class="band-name">${item.band}</span>
                    </div>
                    <div class="button-group">
                        <button class="add-to-mixtape-btn" onclick="mixtapeManager.addSongToMixtape({title: '${item.title}', album: '${item.album}', band: '${item.band}'})">Add to Mixtape</button>
                        <button class="remove-btn" onclick="yourMusicManager.removeSong(${index})">Remove</button>
                    </div>
                </li>
            `).join('');
        }
    }
}

// Initialize your music manager
const yourMusicManager = new YourMusicManager();

// Form submission handler
function addYourMusic(event) {
    event.preventDefault();
    
    const title = document.getElementById('song-title').value;
    const album = document.getElementById('album-name').value;
    const band = document.getElementById('band-name').value;
    
    if (title && album && band) {
        yourMusicManager.addSong(title, album, band);
        
        // Clear form
        document.getElementById('song-title').value = '';
        document.getElementById('album-name').value = '';
        document.getElementById('band-name').value = '';
    }
}