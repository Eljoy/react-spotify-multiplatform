import React, { useEffect } from 'react'
import { FlatList, Text, View } from 'react-native'
import { FeaturedPlaylistsFeature, generatePlaylistImage, UserFeature, Auth } from 'spotify-core'
import { PlaylistPreview } from './PlaylistPreview'
import Layout from '../../layout/Layout'
import { SubTitleText, TitleText } from '../../typography'
import { Avatar } from '../../images'
import SecondaryButton from '../../buttons/SecondaryButton'

type Props = {
  onPlaylistSelected: (playlistId: string) => void;
};

export default function FeaturedPlaylists({ onPlaylistSelected }: Props) {
  const {
    featuredPlaylists,
    fetchFeaturedPlaylists,
  } = FeaturedPlaylistsFeature.useFeaturedPlaylists()
  useEffect(() => {
    fetchFeaturedPlaylists()
  }, [])
  const {currentUser} = UserFeature.useCurrentUser()
  const {signOut} = Auth.useAuth()
  return (
    <Layout flex={1}>
      <Layout height={60} direction='row' align='space-around center'>
        <Layout width={100}>
        <SubTitleText numberOfLines={2}>FEATURED PLAYLISTS</SubTitleText>
        </Layout>
        <SecondaryButton onPress={signOut}>
          <Layout direction='row' align='center center'>
            <Avatar source={{ uri: currentUser?.image.url }} />
            <SecondaryButton.Text>Sign Out</SecondaryButton.Text>
          </Layout>
        </SecondaryButton>
      </Layout>
      <Layout flex={1}>
        <FlatList
          data={featuredPlaylists}
          renderItem={({ item }) => (
            <PlaylistPreview
              onPress={playlistPreview => {
                onPlaylistSelected(playlistPreview.id)
              }}
              playlistPreview={item}
            />
          )}
          alwaysBounceVertical
          keyExtractor={playlist => playlist.id}
        />
      </Layout>
    </Layout>
  )
}
