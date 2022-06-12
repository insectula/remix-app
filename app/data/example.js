
import picture from '~/assets/PNG/dino.png';

export default [
    {
        id: 'example1',
        title: 'Example 1',
        picture: picture,
        description: 'Card description example text card description example text card description example text card description example text card description example text card description example text card description example text card description example text card description example text ',
        data: {
            'Data key1': 'Data value 1',
            'Data key2': 'Data value 2',
        }
    },
    {
        id: 'example2',
        title: 'Example 2',
        picture: picture,
        description: '(ex. 2) Card description example text card description example text card description example text card description example text card description example text card description example text card description example text card description example text card description example text ',
        data: {
            'Data key1 (ex. 2)': 'Data value 1 (ex. 2)',
            'Data key2 (ex. 2)': 'Data value 2 (ex. 2)',
        }
    }
]