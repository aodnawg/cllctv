import Post from "types/Post";

export default interface ReviewPost extends Post {
  id: number;
  title: string;
  date: string;
  author: number;
  artist: string;
  album: string;
}
