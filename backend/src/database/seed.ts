import dataSource from '../data-source';
import { Listing } from '../listings/listing.entity';
import { ListingTranslation } from '../listings/listing-translation.entity';

async function seed() {
  await dataSource.initialize();

  try {
    const listingRepository = dataSource.getRepository(Listing);
    const translationRepository =
      dataSource.getRepository(ListingTranslation);

    const existingListing = await listingRepository.findOne({
      where: {
        cityEnFr: 'Ouarzazate',
        ownerName: 'Youssef Alami',
      },
    });

    if (existingListing) {
      console.log('Ouarzazate listing already exists. Skipping seed.');
      return;
    }

    const listing = new Listing();

    listing.price = 2500;
    listing.bedrooms = 3;
    listing.hasWifi = true;
    listing.imageUrl =
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=400';
    listing.city = 'ورزازات';
    listing.cityEnFr = 'Ouarzazate';
    listing.district = 'حي وسط المدينة';
    listing.districtEnFr = 'Centre-ville';
    listing.ownerName = 'Youssef Alami';
    listing.ownerId = 101;
    listing.lat = null;
    listing.lng = null;

    const savedListing = await listingRepository.save(listing);

    const english = new ListingTranslation();
    english.listingId = savedListing.id;
    english.language = 'en';
    english.title = 'Spacious Apartment in Ouarzazate';
    english.description =
      'A comfortable three-bedroom apartment in the heart of Ouarzazate.';

    const french = new ListingTranslation();
    french.listingId = savedListing.id;
    french.language = 'fr';
    french.title = 'Appartement spacieux à Ouarzazate';
    french.description =
      'Un appartement confortable de trois chambres au cœur de Ouarzazate.';

    const arabic = new ListingTranslation();
    arabic.listingId = savedListing.id;
    arabic.language = 'ar';
    arabic.title = 'شقة واسعة في ورزازات';
    arabic.description =
      'شقة مريحة من ثلاث غرف نوم في قلب ورزازات.';

    await translationRepository.save([
      english,
      french,
      arabic,
    ]);

    console.log('Ouarzazate listing seeded successfully.');
  } finally {
    await dataSource.destroy();
  }
}

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});