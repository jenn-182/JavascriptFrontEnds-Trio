const { createApp } = Vue;

const DetailApp = {
    data() {
        return {
            loading: true,
            item: {},
            songs: [],
            detailType: null
        };
    },
    
    async mounted() {
        await this.loadData();
    },
    
    methods: {
        async loadData() {
            const urlParams = new URLSearchParams(window.location.search);
            const type = urlParams.get('type');
            const id = urlParams.get('id');
            
            this.detailType = type;
            
            try {
                switch (type) {
                    case 'band':
                        this.item = await api.getBand(id);
                        break;
                    case 'album':
                        this.item = await api.getAlbum(id);
                        this.songs = await api.getSongs(id);
                        break;
                    case 'song':
                        // For songs, you might need additional API calls to get full details
                        this.item = { id, title: 'Song Details', trackNumber: 1, durationInSeconds: 180 };
                        break;
                    default:
                        this.item = { name: 'Unknown Item' };
                }
            } catch (error) {
                console.error('Error loading data:', error);
                this.item = { name: 'Error Loading Data' };
            }
            
            this.loading = false;
        },
        
        goBack() {
            window.history.back();
        },
        
        goHome() {
            window.location.href = 'index.html';
        }
    }
};

createApp(DetailApp).mount('#app');