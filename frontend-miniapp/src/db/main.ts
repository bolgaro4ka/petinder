export const DB: {
  pet: Record<
    number,
    {
      name: string
      age: number
      likes: number
      photo: string
      host_name: string
      host_phone: string
    }
  >
} = {
  pet: {
    0: {
      name: 'Vasya',
      age: 4.2,
      likes: 2,
      photo: '/pets/dog1.jpg',
      host_name: 'Nikita',
      host_phone: '88005553535',
    },
    1: {
      name: 'Vasya',
      age: 4.2,
      likes: 2,
      photo: '/pets/dog2.png',
      host_name: 'Nikita',
      host_phone: '88005553535',
    },
    2: {
      name: 'Vasya',
      age: 4.2,
      likes: 2,
      photo: '/pets/dog3.jpg',
      host_name: 'Nikita',
      host_phone: '88005553535',
    },
    3: {
      name: 'Vasya',
      age: 4.2,
      likes: 2,
      photo: '/pets/dog4.jpg',
      host_name: 'Nikita',
      host_phone: '88005553535',
    },
  },
}
