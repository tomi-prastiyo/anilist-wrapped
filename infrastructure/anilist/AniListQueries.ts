export const USER_QUERY = `
  query ($name: String) {
    User(name: $name) {
      name
      avatar { large }
      bannerImage
      createdAt
    }
  }
`;

export const MEDIA_LIST_QUERY = `
  query ($name: String, $type: MediaType) {
    MediaListCollection(userName: $name, type: $type) {
      lists {
        entries {
          status
          progress
          score(format: POINT_10)
          completedAt { year month day }
          media {
            id
            title { romaji }
            coverImage { large }
            genres
            tags { name }
          }
        }
      }
    }
  }
`;
