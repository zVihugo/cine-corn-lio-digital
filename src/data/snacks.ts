import combo1 from "@/assets/combo-1.jpg";
import combo2 from "@/assets/combo-2.jpg";
import combo3 from "@/assets/combo-3.jpg";
import combo4 from "@/assets/combo-4.jpg";

export interface SnackItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "combo" | "pipoca" | "bebida" | "doce";
}

export const snacks: SnackItem[] = [
  {
    id: "1",
    name: "Combo Família",
    description: "1 Pipoca Grande + 4 Refrigerantes 500ml + 1 Balde colecionável",
    price: 69.90,
    image: combo1,
    category: "combo",
  },
  {
    id: "2",
    name: "Combo Nacho Deluxe",
    description: "Nachos com queijo cheddar cremoso + Jalapeños + Refrigerante 700ml",
    price: 39.90,
    image: combo2,
    category: "combo",
  },
  {
    id: "3",
    name: "Combo Hot Dog",
    description: "Hot Dog tradicional + Batata frita + Refrigerante 500ml",
    price: 34.90,
    image: combo3,
    category: "combo",
  },
  {
    id: "4",
    name: "Combo Doce",
    description: "Chocolate importado + Balas sortidas + Refrigerante 300ml",
    price: 29.90,
    image: combo4,
    category: "combo",
  },
  {
    id: "5",
    name: "Pipoca Grande",
    description: "Balde grande de pipoca com manteiga",
    price: 28.00,
    image: combo1,
    category: "pipoca",
  },
  {
    id: "6",
    name: "Pipoca Média",
    description: "Saco médio de pipoca com manteiga",
    price: 20.00,
    image: combo1,
    category: "pipoca",
  },
];
