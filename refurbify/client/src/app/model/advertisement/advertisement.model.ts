export interface Advertisement {
  id: string;
  userId: string;
  userEmail: string;
  userCity: string;
  userName: string;
  category: string;
  title: string;
  description: string;
  price: number;
  createdAt: number;
  imageUrl?: string;
}
