import { Image } from '../image'
import User from './User'

describe('User Entity', () => {
  it('should throw Error if provided data for serialization if incorrect', () => {
    expect(() => User.deserialize({})).toThrow()
  })

  it('should correctly deserialize to Image when proper data is provided', () => {
    const imageData = {
      height: null,
      url:
        'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/t1.0-1/1970403_10152215092574354_1798272330_n.jpg',
      width: null,
    }
    const userData = {
      id: 'wizzler',
      display_name: 'John',
      email: 'john@gmail.com',
      images: [imageData],
    }
    const user = User.deserialize(userData)
    expect(user).toMatchObject({
      id: userData.id,
      name: userData.display_name,
      email: userData.email,
      image: Image.deserialize(imageData),
    })
  })
})
