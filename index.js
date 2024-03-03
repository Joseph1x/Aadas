
const gemini = new Gemini(API_KEY);

console.log(
    await gemini.ask("Oii, tudo bem??! Me forneça o link de um site de receitas super deliciosas", {
        temperature: 0.5,
        topP: 1,
        topK: 10,
    })
);
