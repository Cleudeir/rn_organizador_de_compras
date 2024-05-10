import AsyncStorage from '@react-native-community/async-storage';
import {TOKEN_GOOGLE} from '../../.env';

// Function to retrieve data from AsyncStorage
const getDataFromStorage = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error retrieving data from AsyncStorage:', e);
    return null;
  }
};

function extractCodeFromTripleBackticks(inputString: string) {
  const regex = /```(json|\n)([\s\S]+?)```/g;
  let result = '';
  let match;
  while ((match = regex.exec(inputString)) !== null) {
    result += match[2];
  }
  if (result === '') {
    result = inputString;
  }
  return result;
}

// Function to store data in AsyncStorage
const storeDataInStorage = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error('Error storing data in AsyncStorage:', e);
  }
};

export const Gemini = async (todos: string[]) => {
  const cacheKey = JSON.stringify(todos);
  const cachedResponse = await getDataFromStorage(cacheKey);
  if (cachedResponse) {
    return cachedResponse;
  }
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `
        Haja como um assistente que possa ajudar a organizar uma lista de compras, sua função é ordenar os itens por categoria de prateleira de supermercado.
        se o item não for item que se encontra em supermercado, adicione o item na categoria de diversos.
        Responda como json {"categoria1":["item1", "item2", "item3"], "categoria2":["item1", "item2", "item3"], "categoria3":["item1", "item2", "item3"],...}
        organize esta lista e corrigir erro de ortografia: ${todos.toString()}`,
        },
      ],
    },
  ];
  const generationConfig = {
    temperature: 0.9,
    topK: 0,
    topP: 1,
    maxOutputTokens: 2048,
    stopSequences: [],
  };
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${TOKEN_GOOGLE}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents,
          generationConfig,
        }),
      },
    );

    const responseData = await response.json();
    console.log('responseData: ', JSON.stringify(responseData, null, 2));

    try {
      const parsedResponse = JSON.parse(
        extractCodeFromTripleBackticks(
          responseData.candidates[0].content.parts[0].text,
        ),
      );
      await storeDataInStorage(cacheKey, parsedResponse);
      return parsedResponse;
    } catch (error) {
      return {todos: todos};
    }
  } catch (error) {
    console.error('Error sending message:', error);
  }
};
