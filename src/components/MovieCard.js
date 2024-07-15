import React from 'react'
import { IMG_CDN_URL } from '../utils/constant'

const MovieCard = ({posterPath}) => {
  console.log("posterPath",posterPath)
  return (
    <div className='w-40 pr-4'>
      <img alt='img_logo' src={IMG_CDN_URL + posterPath} />
    </div>
  )
}

export default MovieCard