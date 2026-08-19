import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Listing } from './listing.entity';

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(Listing)
    private readonly listingRepository: Repository<Listing>,
  ) {}

  async getListings() {
    const listings = await this.listingRepository.find({
      relations: {
        translations: true,
      },
    });

    return listings.map((listing) => {
      const title: Record<string, string> = {};
      const description: Record<string, string> = {};

      for (const translation of listing.translations) {
        title[translation.language] = translation.title;
        description[translation.language] = translation.description;
      }

      return {
        id: listing.id,
        title,
        description,
        city: listing.city,
        cityEnFr: listing.cityEnFr,
        district: listing.district,
        districtEnFr: listing.districtEnFr,
        price: listing.price,
        bedrooms: listing.bedrooms,
        hasWifi: listing.hasWifi,
        imageUrl: listing.imageUrl,
        ownerName: listing.ownerName,
        ownerId: listing.ownerId,
        lat: listing.lat,
        lng: listing.lng,
      };
    });
  }
}