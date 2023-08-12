import { StaticImageData } from "next/image"

export interface IProduct {
  name: string;
  price: number;
  desc: string;
  instock: string;
  img: string;
  categories: string[];
  rating?: number;
  color: string[];
  brand: string;
  weight: string;

  configure: {
    ram: string;
    hardDisk: string;
    cpu: string;
    screen: string;
    camera: string;
    battery: string;
    os: string;
    gpu: string;
  };
}