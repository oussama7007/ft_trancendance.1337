import { Listing } from '../types';

// حالياً كيرجع الداتا المحلية، ومستقبلاً غايكون فيه fetch('/api/listings')
export const fetchListings = async (): Promise<Listing[]> => {
  // Real API integration point:
  // const response = await fetch('http://localhost:5000/api/listings');
  // return await response.json();
  return [];
};