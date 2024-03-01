const fs = require('fs');
const YouTube = require('youtube-sr').default;
const ytdl = require('ytdl-core-discord');

// Função para buscar vídeos
async function searchAndDownload(query, limit, videoIndex) {
    try {
        const videos = await YouTube.search(query, { limit });
        if (videos.length === 0) {
            console.log('Nenhum vídeo encontrado.');
            return;
        }
        if (videoIndex < 1 || videoIndex > videos.length) {
            console.log('Índice do vídeo selecionado está fora do intervalo.');
            return;
        }

        const selectedVideo = videos[videoIndex - 1];
        console.log(`Baixando vídeo: ${selectedVideo.title}`);

        // Download do vídeo e salvando no arquivo
        const readableStream = await ytdl(selectedVideo.url);
        const outputFileName = `${selectedVideo.title}.mp4`;
        const writableStream = fs.createWriteStream(outputFileName);
        
        readableStream.pipe(writableStream);
        writableStream.on('finish', () => {
            console.log('Download concluído:', outputFileName);
        });
        writableStream.on('error', (error) => {
            console.error('Erro ao salvar o vídeo:', error);
        });
    } catch (error) {
        console.error("Erro ao buscar e baixar o vídeo:", error);
    }
}

// Exemplo de busca e download de vídeo
searchAndDownload("MC Poze Vida Loka", 3, 1); // Pesquisa por vídeos relacionados ao MC Poze Vida Loka, limitando a 3 resultados, e baixa o primeiro vídeo encontrado
