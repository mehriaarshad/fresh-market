
export const categories = [
  { id: 'all', name: 'All products', dari: 'تمام محصولات', icon: '🛍️' },
  { id: 'meat', name: 'Meat & poultry', dari: 'گوشت و مرغ', icon: '🥩' },
  { id: 'fish', name: 'Fish & seafood', dari: 'ماهی و محصولات بحری', icon: '🐟' },
  { id: 'fruits', name: 'Fruits', dari: 'میوه‌ها', icon: '🍎' },
  { id: 'vegetables', name: 'Vegetables', dari: 'سبزیجات', icon: '🥦' },
  { id: 'dairy', name: 'Dairy & eggs', dari: 'لبنیات و تخم‌مرغ', icon: '🥛' },
  { id: 'oils', name: 'Oils & ghee', dari: 'روغن و مسکه', icon: '🫒' },
  { id: 'rice', name: 'Rice & grains', dari: 'برنج و غله‌جات', icon: '🍚' },
  { id: 'pasta', name: 'Pasta & spaghetti', dari: 'پاستا و سپگتی', icon: '🍝' },
  { id: 'bakery', name: 'Bakery', dari: 'نان و شیرینی', icon: '🥖' },
  { id: 'biscuits', name: 'Biscuits & snacks', dari: 'بیسکویت و چاشت', icon: '🍪' },
  { id: 'chocolate', name: 'Chocolate & sweets', dari: 'چاکلیت و شیرینی‌باب', icon: '🍫' },
  { id: 'drinks', name: 'Drinks', dari: 'نوشیدنی‌ها', icon: '🧃' },
  { id: 'pantry', name: 'Pantry & spices', dari: 'مواد خوراکی و ادویه', icon: '🧂' },
  { id: 'frozen', name: 'Frozen food', dari: 'مواد غذایی منجمد', icon: '🧊' },
  { id: 'canned', name: 'Canned food', dari: 'مواد غذایی قوطی‌شده', icon: '🥫' }
]

const item = (
  id,
  name,
  dari,
  category,
  price,
  unit,
  emoji,
  color,
  description,
  descriptionDari,
  stock = 20,
  rating = 4.8,
  badge = ''
) => ({
  id,
  name,
  dari,
  category,
  price,
  unit,
  emoji,
  color,
  description,
  descriptionDari,
  stock,
  rating,
  ...(badge ? { badge } : {})
})

// Individual photographs for each product
const productImages = {
  1: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=700&q=85',
  2: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=700&q=85',
  3: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=700&q=85',
  4: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=700&q=85',
  5: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=700&q=85',
  6: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=700&q=85',
  7: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=85',
  8: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=700&q=85',
  9: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=700&q=85',
  10: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=700&q=85',
  11: 'https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=700&q=85',
  12: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=700&q=85',
  13: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=700&q=85',
  14: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=700&q=85',
  15: 'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?auto=format&fit=crop&w=700&q=85',
  16: 'https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=700&q=85',
  17: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=85',
  18: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=700&q=85',
  19: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=700&q=85',
  20: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=700&q=85',
  21: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=700&q=85',
  22: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=700&q=85',
  23: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=700&q=85',
  24: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=700&q=85',
  25: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=700&q=85',
  26: 'https://images.unsplash.com/photo-1548907040-4d42f5b3b8b3?auto=format&fit=crop&w=700&q=85',
  27: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=700&q=85',
  28: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=700&q=85',
  29: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&w=700&q=85',
  30: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=700&q=85',
  31: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=700&q=85',
  32: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=700&q=85',
  33: 'https://images.unsplash.com/photo-1627485937980-221c88ac04f9?auto=format&fit=crop&w=700&q=85',
  34: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=700&q=85',
  35: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=700&q=85',
  36: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=700&q=85'
}

export const products = [
  item(1, 'Fresh Avocados', 'آووکادوی تازه', 'fruits', 3.49, '4 pieces', '🥑', '#e8f1d9', 'Creamy ripe avocados, perfect for salads and healthy snacks.', 'آووکادوی رسیده و تازه؛ مناسب برای سالاد و خوراکی‌های صحی.', 24, 4.9, 'Popular'),

  item(2, 'Organic Strawberries', 'توت‌زمینی ارگانیک', 'fruits', 4.25, '250 g', '🍓', '#fae5e5', 'Sweet, juicy strawberries for breakfast and desserts.', 'توت‌زمینی شیرین و آبدار برای صبحانه و دسر.', 18, 4.8, 'Organic'),

  item(3, 'Green Broccoli', 'بروکلی سبز', 'vegetables', 2.10, '1 head', '🥦', '#e2f0df', 'Fresh broccoli for healthy everyday meals.', 'بروکلی تازه برای غذاهای روزمره و صحی.'),

  item(4, 'Sweet Bananas', 'کیله شیرین', 'fruits', 1.65, '1 kg', '🍌', '#f8f0d6', 'Naturally sweet bananas, selected for freshness.', 'کیله‌های شیرین و تازه، با دقت انتخاب‌شده.'),

  item(5, 'Farm Fresh Eggs', 'تخم‌مرغ تازه', 'dairy', 3.80, '12 pack', '🥚', '#f4eee2', 'Farm-fresh eggs for breakfast and baking.', 'تخم‌مرغ تازه برای صبحانه و پخت‌وپز.'),

  item(6, 'Whole Milk', 'شیر تازه', 'dairy', 2.35, '1 litre', '🥛', '#e5eff5', 'Smooth whole milk for your daily routine.', 'شیر تازه و مقوی برای استفاده روزانه.'),

  item(7, 'Sourdough Bread', 'نان خمیرترش', 'bakery', 3.60, '1 loaf', '🍞', '#f1e6d7', 'A crusty loaf with a soft centre.', 'نان تازه با رویه برشته و داخل نرم.', 12, 4.8, 'Baked today'),

  item(8, 'Red Bell Peppers', 'مرچ دلمه‌ای سرخ', 'vegetables', 2.75, '500 g', '🫑', '#f6e5df', 'Crisp peppers for salads and stir-fries.', 'مرچ دلمه‌ای تازه برای سالاد و غذا.'),

  item(9, 'Atlantic Salmon', 'ماهی سالمون', 'fish', 8.90, '300 g', '🐟', '#f8e8df', 'Fresh salmon portions for a delicious dinner.', 'پارچه‌های تازه ماهی سالمون برای غذای لذیذ.', 9, 4.9, 'Premium'),

  item(10, 'Almonds', 'بادام', 'pantry', 5.50, '250 g', '🥜', '#eee5d9', 'Crunchy almonds for snacking and baking.', 'بادام خوش‌مزه برای چاشت و شیرینی‌پزی.'),

  item(11, 'Fresh Oranges', 'مالته تازه', 'fruits', 2.90, '1 kg', '🍊', '#f8ead9', 'Juicy oranges with a refreshing citrus taste.', 'مالته‌های آبدار با طعم تازه و خوش‌گوار.'),

  item(12, 'Cherry Tomatoes', 'بادنجان رومی گیلاسی', 'vegetables', 2.45, '250 g', '🍅', '#f7e3df', 'Sweet tomatoes for salads and pasta.', 'بادنجان رومی شیرین برای سالاد و پاستا.'),

  item(13, 'Beef Steak', 'گوشت گاو', 'meat', 9.50, '500 g', '🥩', '#f2d9d5', 'Tender beef cuts for grilling and cooking.', 'گوشت نرم گاو برای کباب و پخت‌وپز.', 15, 4.8),

  item(14, 'Chicken Breast', 'سینه مرغ', 'meat', 6.20, '1 kg', '🍗', '#f3e6d9', 'Boneless chicken breast, ready for your favourite recipes.', 'سینه مرغ بدون استخوان برای غذاهای مورد علاقه شما.'),

  item(15, 'Lamb Chops', 'قطعه‌های گوشت گوسفند', 'meat', 11.80, '500 g', '🍖', '#f0d8d3', 'Fresh lamb chops for family meals.', 'گوشت تازه گوسفند برای غذای خانواده.'),

  item(16, 'White Fish Fillet', 'فیله ماهی سفید', 'fish', 7.40, '400 g', '🐠', '#e4edf0', 'Mild white fish fillets, carefully prepared.', 'فیله ماهی سفید با طعم ملایم و آماده‌شده.'),

  item(17, 'Sunflower Oil', 'روغن آفتاب‌گردان', 'oils', 4.90, '1 litre', '🫗', '#f5edcf', 'Everyday sunflower cooking oil.', 'روغن آفتاب‌گردان برای پخت‌وپز روزانه.'),

  item(18, 'Olive Oil', 'روغن زیتون', 'oils', 8.75, '500 ml', '🫒', '#e8edda', 'Extra virgin olive oil for salads and cooking.', 'روغن زیتون برای سالاد و پخت‌وپز.'),

  item(19, 'Basmati Rice', 'برنج باسمتی', 'rice', 6.50, '2 kg', '🍚', '#f4eddb', 'Long-grain aromatic basmati rice.', 'برنج باسمتی دانه‌بلند و خوش‌عطر.'),

  item(20, 'Brown Rice', 'برنج قهوه‌ای', 'rice', 5.80, '1 kg', '🌾', '#eee4d4', 'Nutritious whole-grain brown rice.', 'برنج قهوه‌ای سبوس‌دار و مغذی.'),

  item(21, 'Spaghetti Pasta', 'سپگتی', 'pasta', 2.20, '500 g', '🍝', '#f5e7c9', 'Classic spaghetti for quick family dinners.', 'سپگتی برای تهیه غذای سریع خانواده.'),

  item(22, 'Macaroni', 'ماکارونی', 'pasta', 2.10, '500 g', '🥣', '#f2e3c9', 'Versatile macaroni for pasta dishes.', 'ماکارونی مناسب برای انواع غذاهای پاستا.'),

  item(23, 'Butter Biscuits', 'بیسکویت کره‌ای', 'biscuits', 2.60, '300 g', '🍪', '#f2e7d5', 'Crisp buttery biscuits for tea time.', 'بیسکویت کره‌ای و ترد برای وقت چای.'),

  item(24, 'Chocolate Cookies', 'کلچه چاکلیتی', 'biscuits', 3.10, '250 g', '🍪', '#eadfd6', 'Chocolate cookies for a sweet snack.', 'کلچه چاکلیتی برای یک چاشت شیرین.'),

  item(25, 'Milk Chocolate', 'چاکلیت شیری', 'chocolate', 2.95, '100 g', '🍫', '#eadbd4', 'Smooth and creamy milk chocolate.', 'چاکلیت شیری نرم و خوش‌طعم.'),

  item(26, 'Dark Chocolate', 'چاکلیت تلخ', 'chocolate', 3.40, '100 g', '🍫', '#dfd5d0', 'Rich dark chocolate for chocolate lovers.', 'چاکلیت تلخ و خوش‌مزه برای علاقه‌مندان چاکلیت.'),

  item(27, 'Orange Juice', 'آب مالته', 'drinks', 2.50, '1 litre', '🧃', '#f8ead9', 'Refreshing orange juice.', 'آب مالته تازه و گوارا.'),

  item(28, 'Green Tea', 'چای سبز', 'drinks', 3.75, '100 g', '🍵', '#e5efdc', 'Aromatic green tea for a relaxing cup.', 'چای سبز خوش‌عطر برای نوشیدن.'),

  item(29, 'Tomato Paste', 'رب بادنجان رومی', 'canned', 1.80, '400 g', '🥫', '#f2dfd9', 'Rich tomato paste for sauces and stews.', 'رب بادنجان رومی برای ساس و خورش.'),

  item(30, 'Canned Chickpeas', 'نخود قوطی‌شده', 'canned', 2.30, '400 g', '🫘', '#eee8d8', 'Ready-to-use chickpeas for quick meals.', 'نخود آماده برای تهیه غذای سریع.'),

  item(31, 'Frozen Peas', 'نخود سبز منجمد', 'frozen', 2.40, '500 g', '🫛', '#e2efdf', 'Frozen green peas, ready to cook.', 'نخود سبز منجمد و آماده پخت.'),

  item(32, 'Frozen Mixed Vegetables', 'سبزیجات مخلوط منجمد', 'frozen', 3.20, '500 g', '🥕', '#e9edda', 'A handy mix of frozen vegetables.', 'مخلوط آماده سبزیجات منجمد.'),

  item(33, 'Wheat Flour', 'آرد گندم', 'pantry', 2.70, '1 kg', '🌾', '#f0e8d7', 'Fine wheat flour for baking and cooking.', 'آرد نرم گندم برای نان و پخت‌وپز.'),

  item(34, 'Mixed Spices', 'ادویه مخلوط', 'pantry', 2.20, '100 g', '🧂', '#e9dfd2', 'A fragrant spice blend for everyday cooking.', 'ادویه خوش‌عطر برای غذاهای روزمره.'),

  item(35, 'Potatoes', 'کچالو', 'vegetables', 1.40, '1 kg', '🥔', '#eee4d7', 'Versatile fresh potatoes for every kitchen.', 'کچالوی تازه برای انواع غذاها.'),

  item(36, 'Red Apples', 'سیب سرخ', 'fruits', 2.80, '1 kg', '🍎', '#f3dfdc', 'Crisp and juicy red apples.', 'سیب سرخ تازه و آبدار.')
].map((product) => ({
  ...product,
  image: productImages[product.id]
}))
