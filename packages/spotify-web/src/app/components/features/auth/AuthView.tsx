import React from 'react'
import { Auth, FeaturedPlaylistsFeature } from 'spotify-core'

export default function AuthView() {
  const { signIn } = Auth.useAuth()
  const {
    fetchFeaturedPlaylists,
    featuredPlaylists,
  } = FeaturedPlaylistsFeature.useFeaturedPlaylists()
  return (
    <div>
      <button title={'Sign In'} onClick={signIn}>
        SignIn
      </button>
      <button title={'FetchFeaturedPlaylists'} onClick={fetchFeaturedPlaylists}>
        FetchFeaturedPlaylists
      </button>
    </div>
  )
}
