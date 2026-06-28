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
      name: 'Вася',
      age: 4.2,
      likes: 23,
      photo: '/pets/dog1.jpg',
      host_name: 'Никита',
      host_phone: '88005553535',
    },
    1: {
      name: 'Зорька',
      age: 3.1,
      likes: 22,
      photo: '/pets/dog2.png',
      host_name: 'Арсений',
      host_phone: '89507064846',
    },
    2: {
      name: 'Паша',
      age: 1.4,
      likes: 41,
      photo: '/pets/dog3.jpg',
      host_name: 'Никита',
      host_phone: '89507064846',
    },
    3: {
      name: 'Бобик',
      age: 12.6,
      likes: 67,
      photo: '/pets/dog4.jpg',
      host_name: 'Витя',
      host_phone: '89567895467',
    },
  },
}
