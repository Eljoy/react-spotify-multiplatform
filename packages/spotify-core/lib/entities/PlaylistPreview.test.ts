import PlaylistPreview from "./PlaylistPreview";
import Image from "./Image";

const testPlaylistDao = {
  "name": "Upp och hoppa!",
  "collaborative": false,
  "description": "Du kommer studsa ur sängen med den här spellistan.",
  "external_urls": {
    "spotify": "http://open.spotify.com/user/spotify__sverige/playlist/4uOEx4OUrkoGNZoIlWMUbO"
  },
  "href": "https://api.spotify.com/v1/users/spotify__sverige/playlists/4uOEx4OUrkoGNZoIlWMUbO",
  "id": "4uOEx4OUrkoGNZoIlWMUbO",
  "tracks": {
    "href": "https://api.spotify.com/v1/users/spotify__sverige/playlists/4uOEx4OUrkoGNZoIlWMUbO/tracks",
    "total": 38
  },
  "images": [{
    "height": 300,
    "url": "https://i.scdn.co/image/24aa1d1b491dd529b9c03392f350740ed73438d8",
    "width": 300
  }]
};

describe("Playlist Entity", () => {
  it("should throw Error if provided data for serialization if incorrect", () => {
    expect(() => PlaylistPreview.deserialize({})).toThrow();
  });

  it("should correctly deserialize object", () => {
    const playlist = PlaylistPreview.deserialize(testPlaylistDao);
    expect(playlist).toMatchObject({
      id: testPlaylistDao.id,
      name: testPlaylistDao.name,
      description: testPlaylistDao.description,
      images: [Image.deserialize(testPlaylistDao.images[0])],
      href: testPlaylistDao.href,
      tracks: {
        href: testPlaylistDao.tracks.href,
        total: testPlaylistDao.tracks.total
      }
    });
  });
});
