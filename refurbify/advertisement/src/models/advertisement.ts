import mongoose from 'mongoose';
interface AdvertisementAttrs {
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

interface AdvertisementDoc extends mongoose.Document {
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

interface AdvertisementModel extends mongoose.Model<AdvertisementDoc> {
  build(attrs: AdvertisementAttrs): AdvertisementDoc;
}

const advertisementSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    userCity: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

advertisementSchema.statics.build = (attrs: AdvertisementAttrs) => {
  return new Advertisement(attrs);
};
const Advertisement = mongoose.model<AdvertisementDoc, AdvertisementModel>(
  'Advertisement',
  advertisementSchema
);
export { Advertisement };
