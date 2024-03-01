const YouTube = require("youtube-sr").default;

// Função para buscar vídeos
async function searchVideos(query, limit) {
    try {
        const videos = await YouTube.search(query, { limit });
        videos.forEach((video, index) => {
            console.log(`[${index + 1}] ${video.title} (${video.url})`);
        });
    } catch (error) {
        console.error("Erro ao buscar vídeos:", error);
    }
}

// Exemplo de busca por músicas do MC Poze Vida Loka
searchVideos("MC Poze Vida Loka", 3);
