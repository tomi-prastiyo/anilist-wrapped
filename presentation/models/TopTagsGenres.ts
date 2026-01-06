export interface Tag {
  id: string;
  label: string;
}

export interface GenreRadar {
  name: string;
  value: number;
}

export interface TopTagsGenres {
  tags: Tag[];
  genres: GenreRadar[];
}
