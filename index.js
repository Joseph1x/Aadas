const fs = require('fs');
const yts = require('yt-search');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');

// Função para pesquisar e baixar vídeo
async function pesquisarEbaixarVideo(nomeVideo) {
    try {
        const resultadoPesquisa = await yts(nomeVideo);
        const video = resultadoPesquisa.videos[0]; // Pega o primeiro resultado da pesquisa
        if (video) {
            const url = video.url;
            const titulo = video.title;
            const nomeArquivoMP3 = `./${titulo}.mp3`;
            const capa = video.thumbnail;
            console.log("Título do vídeo:", titulo);
            console.log("Capa do vídeo:", capa);

            // Baixar o vídeo em formato MP4
            await ytdl(url, { quality: 'highest' })
                .pipe(fs.createWriteStream(`${titulo}.mp4`))
                .on('finish', () => {
                    console.log("Download completo!");
                    // Converter o vídeo para MP3
                    ffmpeg(`${titulo}.mp4`)
                        .toFormat('mp3')
                        .save(nomeArquivoMP3)
                        .on('end', () => {
                            console.log("Conversão para MP3 completa!");
                            // Remover o arquivo MP4 após a conversão
                            fs.unlinkSync(`${titulo}.mp4`);
                        })
                        .on('error', (err) => {
                            console.error("Erro durante a conversão para MP3:", err);
                        });
                });
        } else {
            console.error("Nenhum vídeo encontrado para o termo de pesquisa:", nomeVideo);
        }
    } catch (error) {
        console.error("Ocorreu um erro durante a pesquisa e download:", error);
    }
}

// Termo de pesquisa
const termoPesquisa = 'Até que durou me diz o porquê';

// Chamada da função para pesquisar e baixar o vídeo
pesquisarEbaixarVideo(termoPesquisa);
