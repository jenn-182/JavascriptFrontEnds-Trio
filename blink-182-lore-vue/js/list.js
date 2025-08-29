const { createApp } = Vue;

const ListApp = {
    data() {
        return {
            loading: true,
            items: [],
            pageTitle: 'Loading...',
            currentType: null
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
            
            this.currentType = type;
            
            try {
                switch (type) {
                    case 'bands':
                        this.items = await api.getBands();
                        this.pageTitle = 'All Bands';
                        break;
                    case 'albums':
                        this.items = await api.getAlbums(id);
                        this.pageTitle = 'Albums';
                        break;
                    case 'songs':
                        this.items = await api.getSongs(id);
                        this.pageTitle = 'Songs';
                        break;
                    default:
                        this.pageTitle = 'Unknown';
                }
            } catch (error) {
                console.error('Error loading data:', error);
                this.pageTitle = 'Error Loading Data';
            }
            
            this.loading = false;
        },
        
        handleItemClick(item) {
            if (this.currentType === 'bands') {
                window.location.href = `list.html?type=albums&id=${item.id}`;
            } else if (this.currentType === 'albums') {
                window.location.href = `list.html?type=songs&id=${item.id}`;
            } else if (this.currentType === 'songs') {
                window.location.href = `detail.html?type=song&id=${item.id}`;
            }
        },
        
        goBack() {
            window.history.back();
        },
        
        goHome() {
            window.location.href = 'index.html';
        }
    }
};

createApp(ListApp).mount('#app');