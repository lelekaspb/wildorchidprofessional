import { PortableTextBlock } from "sanity";

export type CompanyInfo = {
  _id: string;
  title: string;
  instagram: string;
  phone: string;
  email: string;
  address: [PortableTextBlock];
  workingHours: [PortableTextBlock];
  deliveryInfo: [PortableTextBlock];
  returnInfo: [PortableTextBlock];
  tradeConditions: [PortableTextBlock];
};
