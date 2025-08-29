// Mixtape management
class MixtapeManager {
    constructor() {
        this.mixtapes = this.loadMixtapes();
        this.selectedMixtape = 0;
    }

    loadMixtapes() {
        const saved = localStorage.getItem('blinkMixtapes');
        return saved ? JSON.parse(saved) : [{ name: 'My Mixtape', songs: [] }];
    }

    saveMixtapes() {
        localStorage.setItem('blinkMixtapes', JSON.stringify(this.mixtapes));
    }

    addMixtape(name) {
        if (name.trim() && this.mixtapes.length < 5) {
            this.mixtapes.push({ name: name.trim(), songs: [] });
            this.selectedMixtape = this.mixtapes.length - 1;
            this.saveMixtapes();
            this.renderMixtapes();
            return true;
        }
        return false;
    }

    deleteMixtape(index) {
        this.mixtapes.splice(index, 1);
        if (this.selectedMixtape >= this.mixtapes.length) {
            this.selectedMixtape = Math.max(0, this.mixtapes.length - 1);
        }
        this.saveMixtapes();
        this.renderMixtapes();
    }

    addSongToMixtape(song) {
        if (this.mixtapes[this.selectedMixtape]) {
            this.mixtapes[this.selectedMixtape].songs.push(song);
            this.saveMixtapes();
            this.renderMixtapes();
        }
    }

    removeSongFromMixtape(songIndex) {
        if (this.mixtapes[this.selectedMixtape]) {
            this.mixtapes[this.selectedMixtape].songs.splice(songIndex, 1);
            this.saveMixtapes();
            this.renderMixtapes();
        }
    }

    setSelectedMixtape(index) {
        this.selectedMixtape = index;
        this.renderMixtapes();
    }

    renderMixtapes() {
        const container = document.getElementById('mixtapes-container');
        if (!container) return;

        container.innerHTML = this.mixtapes.map((mixtape, index) => `
            <div class="mixtape-card ${index === this.selectedMixtape ? 'active-mixtape' : ''}">
                <h3 class="mixtape-card-title">${mixtape.name}</h3>
                
                <div class="song-list-header">
                    <span>Song</span>
                    <span>Album</span>
                    <span>Band</span>
                    <span></span>
                </div>
                
                <div class="song-list">
                    ${mixtape.songs.length === 0 ? 
                        '<div class="empty-song-message">No songs yet!</div>' :
                        mixtape.songs.map((song, songIndex) => `
                            <div class="song-list-item">
                                <span class="song-title-style">${song.title || song}</span>
                                <span class="album-title-style">${song.album || ''}</span>
                                <span class="band-name-style">${song.band || ''}</span>
                                <button class="remove-btn" onclick="mixtapeManager.removeSongFromMixtape(${songIndex})">Remove</button>
                            </div>
                        `).join('')
                    }
                </div>
                
                <button class="mixtape-view-button ${index === this.selectedMixtape ? 'selected-view' : ''}" 
                        onclick="mixtapeManager.setSelectedMixtape(${index})">
                    ${index === this.selectedMixtape ? 'Selected' : 'View'}
                </button>
                
                <button class="mixtape-delete-button" onclick="mixtapeManager.deleteMixtape(${index})" 
                        style="position: absolute; top: 0.7em; left: 0.7em; background: #eee; color: #FF79B4; border: none; border-radius: 50%; padding: 0.2em 0.5em; cursor: pointer; font-weight: bold; fontSize: 1em; width: 2em; height: 2em; display: flex; align-items: center; justify-content: center;">
                    🗑️
                </button>
            </div>
        `).join('');
    }
}

// Initialize mixtape manager
const mixtapeManager = new MixtapeManager();

// Add mixtape function for the form
function addMixtape() {
    const input = document.getElementById('mixtape-name-input');
    if (input && input.value.trim()) {
        mixtapeManager.addMixtape(input.value);
        input.value = '';
    }
}