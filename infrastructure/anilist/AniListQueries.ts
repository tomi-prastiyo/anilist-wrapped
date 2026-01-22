export const USER_QUERY = `
  query ($name: String) {
    User(name: $name) {
      id
      name
      avatar { large }
      bannerImage
      createdAt
    }
  }
`;

export const ACTIVITY_QUERY = `
query (
  $userId: Int,
  $type: ActivityType,
  $page: Int,
  $createdAtGreater: Int,
  $createdAtLesser: Int
) {
  Page(page: $page, perPage: 50) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    activities(
      userId: $userId
      type: $type
      sort: [ID_DESC]
      createdAt_greater: $createdAtGreater
      createdAt_lesser: $createdAtLesser
    ) {
      ... on ListActivity {
        type
        status
        progress
        media {
          id
          title {
            userPreferred
          }
          coverImage {
            large
          }
        }
        likes {
          name
        }
        createdAt
      }
    }
  }
}
`;

export const MEAN_SCORE_QUERY = `
query ($page: Int, $mediaIdIn: [Int], $userId: Int) {
  Page(page: $page, perPage: 50) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    mediaList(mediaId_in: $mediaIdIn, userId: $userId) {
      score(format: POINT_10)
      media {
        id
        title {
          userPreferred
        }
        coverImage {
          large
        }
        format
        genres
        tags {
          name
        }
        startDate {
          year
        }
      }
      status
    }
  }
}
`;
