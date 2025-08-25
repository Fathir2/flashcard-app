export const SAMPLE_CARDS = {
  'default-1': [
    {
      id: 'card-1',
        front: 'What is the capital of France?',
        back: 'Paris',
        hints: ['It is also known as the city of lights.'],
        tags: ['geography', 'europe'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 'card-2',
            front: 'What is 2 + 2?',
            back: '4',
            hints: ['It is an even number.'],
            tags: ['math', 'arithmetic'],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
        id: 'card-3',
            front: 'What is the largest planet in our solar system?',
            back: 'Jupiter',
            hints: ['It is named after the king of the Roman gods.'],
            tags: ['science', 'astronomy'],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    ]
};