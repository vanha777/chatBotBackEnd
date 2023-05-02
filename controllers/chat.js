import dotenv from 'dotenv';
dotenv.config();
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.listModels();
console.log(response)



function generateChat(input) {
    /*const capitalizedInput =
    input[0].toUpperCase() + input.slice(1).toLowerCase();*/
    return [
        {"role": "system", "content": "You are a helpful assistant. You're a super hero called Iron Man"},
        {"role": "user", "content": "Who won the world series in 2020?"},
        {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
        { "role": "user", "content": input }
    ]
}



export default async function handleChat(req, res) {

    if (!configuration.apiKey) {
        res.status(500).json({
            error: {
                message: "OpenAI API key not configured",
            }
        });
        return;
    }

    const input = req.body.input || '';
    if (input.trim().length === 0) {
        res.status(400).json({
            error: {
                message: "Chat input is empty",
            }
        });
        return;
    }

    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: generateChat(input),
            temperature: 0.2

        });
        res.status(200).json({ result: completion.data.choices[0].message });
    } catch (error) {
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error(`API openAI failed ${error.message}`);
            res.status(500).json({
                error: {
                    message: 'Server has failed to call openAI API',
                }
            });
        }
    }
}



