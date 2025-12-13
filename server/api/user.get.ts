import { defineEventHandler } from 'h3'

export default defineEventHandler(() => {
  // Mock user profile
  return {
    avatar: 'https://i.imgur.com/0y8Ftya.png',
    name: 'Dương Phạm 2112',
    age: '6h',
    point: 0,
    progress: 0,
    posts: 0,
    likes: 0,
    follows: 0,
  }
})
