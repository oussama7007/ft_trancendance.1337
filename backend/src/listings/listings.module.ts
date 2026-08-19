import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListingsController } from './listings.controller';
import { ListingsService } from './listings.service';
import { Listing } from './listing.entity';
import { ListingTranslation } from './listing-translation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Listing,
      ListingTranslation,
    ]),
  ],
  controllers: [ListingsController],
  providers: [ListingsService],
})
export class ListingsModule {}