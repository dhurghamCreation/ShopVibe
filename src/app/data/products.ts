export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  gender?: 'men' | 'women' | 'unisex';
  image: string;
  rating: number;
  reviews: number;
  description: string;
  colors?: string[];
  sizes?: string[];
  inStock: boolean;
  tags?: string[];
}

type CatalogSeed = {
  prefix: string;
  category: string;
  gender: 'men' | 'women' | 'unisex';
  basePrice: number;
  priceStep: number;
  colors?: string[];
  sizes?: string[];
  desc: string;
  imagePool: string[];
  count: number;
};

const clothingImagesMen = [
  'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1519058574476-70e38abde488?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1622445275576-721325763afe?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1578681994506-b8f463449011?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&auto=format&fit=crop&q=80',
];

const clothingImagesWomen = [
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1566206091558-7f218b696731?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1499939667766-4afceb292d05?w=800&auto=format&fit=crop&q=80',
];

const electronicsImages = [
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1468495244123-6c6e4f42e6b2?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1603190287605-e6ade32fa852?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&auto=format&fit=crop&q=80',
];

const accessoriesImages = [
  'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1611923134239-b9be5816d897?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1576872381149-7847515ce5d8?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1520975954460-9683fcbec497?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1614179818511-fe9e1adcefda?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1608645048020-4bdbf467498e?w=800&auto=format&fit=crop&q=80',
];

const beautyImages = [
  'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1526758097130-bab247274f58?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1567721913486-6585f069b3ed?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1543159986-5fa4fddd32cf?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1583241475880-083f84372725?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&auto=format&fit=crop&q=80',
];

const perfumeImages = [
  'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1557170334-a9632e77c6e4?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1548510769-6e6c78b44a10?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1608528577891-eb055944f2e7?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1575411843673-0c3a74a8f8be?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1617218901330-50bd40f4fd8e?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1572952436742-bb6e6f67aa26?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1564910429068-9fb8f618f2bc?w=800&auto=format&fit=crop&q=80',
];

const jewelryImages = [
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1619119069152-a2b331eb392a?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1608050072262-7e7a98f23074?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1584714268709-c3dd9c92b378?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1621111848501-8d3634f82336?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1617891882785-89d1ab5c6e7e?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1572959397834-5abdef50abbe?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1629581460266-5829b53e5038?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=800&auto=format&fit=crop&q=80',
];

const seeds: CatalogSeed[] = [
  {
    prefix: 'Tailored Essential',
    category: 'Clothing',
    gender: 'men',
    basePrice: 34,
    priceStep: 1.4,
    colors: ['Black', 'Navy', 'Stone', 'Olive', 'White'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    desc: 'Premium fabric and a modern silhouette built for all-day comfort.',
    imagePool: clothingImagesMen,
    count: 230,
  },
  {
    prefix: 'Signature Edit',
    category: 'Clothing',
    gender: 'women',
    basePrice: 39,
    priceStep: 1.55,
    colors: ['Black', 'Cream', 'Burgundy', 'Sage', 'Rose'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    desc: 'Soft-touch materials with elegant tailoring and elevated everyday style.',
    imagePool: clothingImagesWomen,
    count: 230,
  },
  {
    prefix: 'Pro Series Device',
    category: 'Electronics',
    gender: 'unisex',
    basePrice: 89,
    priceStep: 3.8,
    colors: ['Black', 'Silver', 'Blue', 'Graphite'],
    desc: 'Reliable performance, premium finish, and advanced features for daily life.',
    imagePool: electronicsImages,
    count: 210,
  },
  {
    prefix: 'Urban Carry',
    category: 'Accessories',
    gender: 'unisex',
    basePrice: 29,
    priceStep: 1.2,
    colors: ['Black', 'Tan', 'Navy', 'Brown'],
    sizes: ['One Size'],
    desc: 'Durable construction and practical design for work, travel, and weekends.',
    imagePool: accessoriesImages,
    count: 200,
  },
  {
    prefix: 'Radiance Formula',
    category: 'Beauty',
    gender: 'women',
    basePrice: 19,
    priceStep: 0.95,
    desc: 'Dermatologist-approved formulas made to hydrate, smooth, and protect skin.',
    imagePool: beautyImages,
    count: 160,
  },
  {
    prefix: 'Maison Scent',
    category: 'Perfumes',
    gender: 'unisex',
    basePrice: 49,
    priceStep: 2.1,
    desc: 'Layered notes with long-lasting projection and sophisticated character.',
    imagePool: perfumeImages,
    count: 140,
  },
  {
    prefix: 'Atelier Jewel',
    category: 'Jewelry',
    gender: 'women',
    basePrice: 59,
    priceStep: 2.75,
    desc: 'Polished craftsmanship with timeless details for day and evening wear.',
    imagePool: jewelryImages,
    count: 140,
  },
];

const apparelTermsMen = ['T-Shirt', 'Polo', 'Shirt', 'Chinos', 'Jacket', 'Hoodie', 'Sweater', 'Jeans', 'Blazer', 'Shorts'];
const apparelTermsWomen = ['Dress', 'Blouse', 'Top', 'Skirt', 'Coat', 'Knitwear', 'Jeans', 'Jumpsuit', 'Blazer', 'Trousers'];
const electronicsTerms = ['Headphones', 'Smartwatch', 'Tablet', 'Speaker', 'Earbuds', 'Keyboard', 'Monitor', 'Camera', 'Power Bank', 'Phone'];
const accessoriesTerms = ['Backpack', 'Handbag', 'Sunglasses', 'Wallet', 'Belt', 'Cap', 'Scarf', 'Duffel', 'Crossbody', 'Watch'];
const beautyTerms = ['Serum', 'Moisturizer', 'Cleanser', 'Mask', 'Foundation', 'Lipstick', 'Toner', 'Sunscreen', 'Primer', 'Palette'];
const perfumeTerms = ['Eau de Parfum', 'Eau de Toilette', 'Scent Mist', 'Intense Edition', 'Noir Edition', 'Citrus Blend', 'Floral Blend', 'Wood Blend', 'Amber Blend', 'Fresh Blend'];
const jewelryTerms = ['Ring', 'Necklace', 'Bracelet', 'Earrings', 'Pendant', 'Chain', 'Charm', 'Cuff', 'Anklet', 'Stud Set'];

const termByCategory: Record<string, string[]> = {
  Clothing: [...apparelTermsMen, ...apparelTermsWomen],
  Electronics: electronicsTerms,
  Accessories: accessoriesTerms,
  Beauty: beautyTerms,
  Perfumes: perfumeTerms,
  Jewelry: jewelryTerms,
};

function makeTags(index: number): string[] {
  const tags: string[] = [];
  if (index % 2 === 0) tags.push('new');
  if (index % 3 === 0) tags.push('bestseller');
  if (index % 5 === 0) tags.push('trending');
  if (index % 11 === 0) tags.push('luxury');
  return tags.length > 0 ? tags : ['trending'];
}

function computeOriginal(price: number, index: number): number {
  const multiplier = 1.2 + ((index % 4) * 0.05);
  return Number((price * multiplier).toFixed(2));
}

function resolveImageKeyword(term: string, category: string, gender: string): string {
  const t = term.toLowerCase();
  const termMap: Record<string, string> = {
    't-shirt': 'tshirt,clothing',
    'polo': 'polo,shirt',
    'shirt': 'shirt,fashion',
    'chinos': 'chinos,pants',
    'jacket': 'jacket,fashion',
    'hoodie': 'hoodie,streetwear',
    'sweater': 'sweater,knitwear',
    'jeans': 'jeans,denim',
    'blazer': 'blazer,fashion',
    'shorts': 'shorts,summer',
    'dress': 'dress,women',
    'blouse': 'blouse,women',
    'top': 'top,fashion',
    'skirt': 'skirt,fashion',
    'coat': 'coat,outerwear',
    'knitwear': 'knitwear,wool',
    'jumpsuit': 'jumpsuit,fashion',
    'trousers': 'trousers,pants',
    'headphones': 'headphones,music',
    'smartwatch': 'smartwatch,watch',
    'tablet': 'tablet,technology',
    'speaker': 'speaker,bluetooth',
    'earbuds': 'earbuds,wireless',
    'keyboard': 'keyboard,tech',
    'monitor': 'monitor,display',
    'camera': 'camera,photography',
    'power bank': 'powerbank,tech',
    'phone': 'smartphone,phone',
    'backpack': 'backpack,bag',
    'handbag': 'handbag,purse',
    'sunglasses': 'sunglasses,eyewear',
    'wallet': 'wallet,leather',
    'belt': 'belt,fashion',
    'cap': 'cap,hat',
    'scarf': 'scarf,fashion',
    'duffel': 'bag,travel',
    'crossbody': 'crossbody,bag',
    'watch': 'watch,timepiece',
    'serum': 'serum,skincare',
    'moisturizer': 'moisturizer,skincare',
    'cleanser': 'cleanser,face',
    'mask': 'mask,skincare',
    'foundation': 'makeup,foundation',
    'lipstick': 'lipstick,makeup',
    'toner': 'toner,skincare',
    'sunscreen': 'sunscreen,skincare',
    'primer': 'makeup,primer',
    'palette': 'eyeshadow,makeup',
    'eau de parfum': 'perfume,fragrance',
    'eau de toilette': 'cologne,fragrance',
    'scent mist': 'perfume,spray',
    'intense edition': 'perfume,luxury',
    'noir edition': 'perfume,dark',
    'citrus blend': 'citrus,fragrance',
    'floral blend': 'flowers,fragrance',
    'wood blend': 'wood,fragrance',
    'amber blend': 'amber,fragrance',
    'fresh blend': 'fresh,fragrance',
    'ring': 'ring,jewelry',
    'necklace': 'necklace,jewelry',
    'bracelet': 'bracelet,jewelry',
    'earrings': 'earrings,jewelry',
    'pendant': 'pendant,jewelry',
    'chain': 'chain,gold',
    'charm': 'charm,jewelry',
    'cuff': 'cuff,bracelet',
    'anklet': 'anklet,jewelry',
    'stud set': 'earrings,jewelry',
  };
  for (const [k, v] of Object.entries(termMap)) {
    if (t.includes(k)) return v;
  }
  const fallbackMap: Record<string, string> = {
    Clothing: gender === 'women' ? 'fashion,women,dress' : 'fashion,men,shirt',
    Electronics: 'electronics,gadget',
    Accessories: 'accessories,fashion',
    Beauty: 'beauty,cosmetics',
    Perfumes: 'perfume,fragrance',
    Jewelry: 'jewelry,gold',
  };
  return fallbackMap[category] ?? 'fashion';
}

function buildSeedProducts(seed: CatalogSeed, startId: number): Product[] {
  const terms = termByCategory[seed.category] || ['Edition'];
  const list: Product[] = [];

  for (let i = 0; i < seed.count; i += 1) {
    const id = startId + i;
    const term = terms[i % terms.length];
    const season = ['Core', 'Studio', 'Premium', 'Daily', 'Elite'][i % 5];
    const yearBadge = 2026 + (i % 2);
    const name = `${seed.prefix} ${term} ${season} ${String(i + 1).padStart(3, '0')}`;
    const price = Number((seed.basePrice + (i % 35) * seed.priceStep + (i % 7) * 0.37).toFixed(2));
    const originalPrice = computeOriginal(price, i);
    // Prime-multiplier distribution: with pool of 15, gcd(7,15)=1 so the first
    // 15 products each get a different image before the cycle repeats.
    const imageIndex = ((id * 7) + (i * 13) + (term.charCodeAt(0) % 5)) % seed.imagePool.length;
    list.push({
      id,
      name,
      category: seed.category,
      subcategory: term,
      gender: seed.gender,
      image: `${seed.imagePool[imageIndex]}&v=${id}`,
      price,
      originalPrice,
      rating: Number((4.1 + (i % 9) * 0.09).toFixed(1)),
      reviews: 85 + i * 3,
      description: `${seed.desc} ${name} (${yearBadge} release).`,
      colors: seed.colors,
      sizes: seed.sizes,
      inStock: i % 17 !== 0,
      tags: makeTags(i),
    });
  }

  return list;
}

const starterProducts: Product[] = [
  {
    id: 1,
    name: 'Premium Cotton T-Shirt',
    price: 29.99,
    originalPrice: 49.99,
    category: 'Clothing',
    subcategory: 'T-Shirt',
    gender: 'men',
    image: clothingImagesMen[0],
    rating: 4.6,
    reviews: 234,
    description: 'Soft breathable cotton with a modern cut and all-day comfort.',
    colors: ['Black', 'White', 'Navy', 'Gray'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    tags: ['new', 'bestseller'],
  },
  {
    id: 2,
    name: 'Elegant Rose Perfume',
    price: 89.99,
    originalPrice: 129.99,
    category: 'Perfumes',
    subcategory: 'Eau de Parfum',
    gender: 'women',
    image: perfumeImages[0],
    rating: 4.8,
    reviews: 892,
    description: 'A modern floral signature with rose, jasmine, and warm vanilla notes.',
    inStock: true,
    tags: ['luxury', 'bestseller'],
  },
  {
    id: 3,
    name: 'Premium Wireless Headphones',
    price: 249.99,
    originalPrice: 349.99,
    category: 'Electronics',
    subcategory: 'Headphones',
    gender: 'unisex',
    image: electronicsImages[0],
    rating: 4.9,
    reviews: 1456,
    description: 'Flagship sound quality with adaptive noise cancellation and long battery life.',
    colors: ['Black', 'Silver', 'Rose Gold'],
    inStock: true,
    tags: ['trending', 'bestseller'],
  },
  {
    id: 4,
    name: 'Diamond Ring Collection',
    price: 599.99,
    originalPrice: 899.99,
    category: 'Jewelry',
    subcategory: 'Ring',
    gender: 'women',
    image: jewelryImages[0],
    rating: 4.9,
    reviews: 234,
    description: 'Timeless diamond design crafted for celebrations and milestones.',
    inStock: true,
    tags: ['luxury', 'bestseller'],
  },
];

let nextId = starterProducts.length + 1;
const generatedProducts = seeds.flatMap(seed => {
  const generated = buildSeedProducts(seed, nextId);
  nextId += seed.count;
  return generated;
});

export const products: Product[] = [...starterProducts, ...generatedProducts];

const categoryNames = ['Clothing', 'Perfumes', 'Electronics', 'Accessories', 'Beauty', 'Jewelry'];

export const categories = [
  { name: 'All', count: products.length },
  ...categoryNames.map(name => ({
    name,
    count: products.filter(p => p.category === name).length,
  })),
];
