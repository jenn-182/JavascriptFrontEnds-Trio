const { createApp } = Vue;

const MusicApp = {
    data() {
        return {
            // SOLUTION 1: Reactive state management 
            currentView: 'bands',
            loading: false,
            error: null,
            searchTerm: '',
            
            // Data arrays 
            bands: [],
            albums: [],
            songs: [],
            playlist: this.loadPlaylist(),
            
            // Current context 
            currentBand: {},
            currentAlbum: {},
            
            // Navigation stack
            navigationStack: []
        };
    },
    
    // computed properties
    computed: {
        filteredBands() {
            if (!this.searchTerm) return this.bands;
            return this.bands.filter(band => 
                band.name.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        },
        
        breadcrumbText() {
            switch (this.currentView) {
                case 'bands': return 'All Bands';
                case 'albums': return `${this.currentBand.name} - Albums`;
                case 'songs': return `${this.currentAlbum.title} - Songs`;
                default: return 'Music Explorer';
            }
        },
        
        canGoBack() {
            return this.navigationStack.length > 0;
        }
    },
    
    // hooks
    async mounted() {
        console.log('🎵 Vue app mounted - loading data...');
        await this.loadBands();
    },
    
    //methods
    methods: {
        async loadBands() {
            this.loading = true;
            this.error = null;
            
            try {
                this.bands = await api.getBands();
                console.log(` Loaded ${this.bands.length} bands`);
            } catch (error) {
                this.error = 'Failed to load bands. Please try again.';
                console.error('Error loading bands:', error);
            } finally {
                this.loading = false;
            }
        },
        
        async showAlbums(band) {
            // Navigation 
            this.navigationStack.push({
                view: 'bands',
                data: { searchTerm: this.searchTerm }
            });
            
            this.currentBand = band;
            this.currentView = 'albums';
            this.loading = true;
            this.error = null;
            
            try {
                this.albums = await api.getAlbums(band.id);
                console.log(` Loaded ${this.albums.length} albums for ${band.name}`);
            } catch (error) {
                this.error = `Failed to load albums for ${band.name}`;
                console.error('Error loading albums:', error);
            } finally {
                this.loading = false;
            }
        },
        
        async showSongs(album) {
            this.navigationStack.push({
                view: 'albums',
                data: { band: this.currentBand }
            });
            
            this.currentAlbum = album;
            this.currentView = 'songs';
            this.loading = true;
            this.error = null;
            
            try {
                this.songs = await api.getSongs(album.id);
                // album info
                this.songs = this.songs.map(song => ({
                    ...song,
                    album: album.title,
                    band: this.currentBand.name
                }));
                console.log(` Loaded ${this.songs.length} songs for ${album.title}`);
            } catch (error) {
                this.error = `Failed to load songs for ${album.title}`;
                console.error('Error loading songs:', error);
            } finally {
                this.loading = false;
            }
        },
        
        //navigation
        goBack() {
            if (this.navigationStack.length === 0) return;
            
            const previous = this.navigationStack.pop();
            this.currentView = previous.view;
            
            // Restore previous state
            if (previous.data.searchTerm !== undefined) {
                this.searchTerm = previous.data.searchTerm;
            }
            if (previous.data.band) {
                this.currentBand = previous.data.band;
            }
            
            this.error = null;
        },
        
        goHome() {
            this.currentView = 'bands';
            this.navigationStack = [];
            this.searchTerm = '';
            this.error = null;
        },
        
        retry() {
            this.error = null;
            if (this.currentView === 'bands') {
                this.loadBands();
            }
        },
        
        // playlist features
        addToPlaylist(song) {
            if (!this.isInPlaylist(song)) {
                this.playlist.push({
                    id: song.id,
                    title: song.title,
                    album: song.album,
                    band: song.band
                });
                this.savePlaylist();
                console.log(`Added "${song.title}" to playlist`);
            }
        },
        
        removeFromPlaylist(index) {
            this.playlist.splice(index, 1);
            this.savePlaylist();
        },
        
        clearPlaylist() {
            this.playlist = [];
            this.savePlaylist();
        },
        
        isInPlaylist(song) {
            return this.playlist.some(p => p.id === song.id);
        },
        
        // Utility methods
        formatDuration(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        },
        
        loadPlaylist() {
            const saved = localStorage.getItem('blink-playlist');
            return saved ? JSON.parse(saved) : [];
        },
        
        savePlaylist() {
            localStorage.setItem('blink-playlist', JSON.stringify(this.playlist));
        }
    }
};

createApp(MusicApp).mount('#app');
