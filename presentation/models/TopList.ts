export interface TopList {
  title: string;
  items: {
    id: number;
    title: string;
    image: string;
    seasonYear: number;
    format: string;
    rank: number;
  }[];
}
