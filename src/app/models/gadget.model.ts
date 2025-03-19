export interface Gadget {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  secretInfo?: string;
  createdAt: Date;
  updatedAt: Date;
}