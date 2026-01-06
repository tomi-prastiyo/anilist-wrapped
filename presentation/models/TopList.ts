export interface TopList {
  title: string;
  items: {
    id: number;
    title: string;
    image: string;
    rank: number;
  }[];
}
