const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 3000;

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // Store your API key in an environment variable
});

app.use(bodyParser.json());
app.use(cors()); // Enable CORS

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: 'system', content: 'You are a helpful assistant' },
                { role: 'user', content: userMessage }
            ],
            model: 'gpt-4'
        });

        res.json({ message: completion.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating response');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
