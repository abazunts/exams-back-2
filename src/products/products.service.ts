import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async findAll() {
    const products = await this.productModel.find().exec();
    const countDocuments = await this.productModel.countDocuments();

    return {
      total: countDocuments,
      messages: [],
      page: 1,
      pageCount: 5,
      data: products.map((p) => {
        return {
          id: p._id,
          title: p.title,
          description: p.description,
          price: p.price,
        };
      }),
    };
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = new this.productModel(createProductDto);
    return product.save();
  }
}
