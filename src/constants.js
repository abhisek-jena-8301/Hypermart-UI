export const AUTH_SERVICE_URL = "http://localhost:7001/auth";
export const USER_SERVICE_URL = "http://localhost:7711/user";
export const EMPLOYEE_SERVICE_URL = "http://localhost:7711/emp";
export const PRODUCT_SERVICE_URL = "http://localhost:7121/product";

export const categoryOptions = [
  { label: "Fruits & Vegetables", value: "Fruits & Vegetables" },
  { label: "Dairy & Eggs", value: "Dairy & Eggs" },
  { label: "Bakery", value: "Bakery" },
  { label: "Meat & Seafood", value: "Meat & Seafood" },
  { label: "Rice & Grains", value: "Rice & Grains" },
  { label: "Pulses & Lentils", value: "Pulses & Lentils" },
  { label: "Flours & Atta", value: "Flours & Atta" },
  { label: "Cooking Oil & Ghee", value: "Cooking Oil & Ghee" },
  { label: "Salt, Spices & Masalas", value: "Salt, Spices & Masalas" },
  { label: "Sugar & Jaggery", value: "Sugar & Jaggery" },
  { label: "Dry Fruits & Nuts", value: "Dry Fruits & Nuts" },
  { label: "Snacks & Namkeen", value: "Snacks & Namkeen" },
  { label: "Biscuits & Cookies", value: "Biscuits & Cookies" },
  { label: "Breakfast & Cereals", value: "Breakfast & Cereals" },
  { label: "Instant Foods & Noodles", value: "Instant Foods & Noodles" },
  { label: "Tea & Coffee", value: "Tea & Coffee" },
  { label: "Soft Drinks & Juices", value: "Soft Drinks & Juices" },
  { label: "Energy & Health Drinks", value: "Energy & Health Drinks" },
  { label: "Frozen Snacks", value: "Frozen Snacks" },
  { label: "Packaged Meals", value: "Packaged Meals" },
  { label: "Sauces & Pickles", value: "Sauces & Pickles" },
  { label: "Bath & Body Care", value: "Bath & Body Care" },
  { label: "Hair Care", value: "Hair Care" },
  { label: "Oral Care", value: "Oral Care" },
  { label: "Skin Care", value: "Skin Care" },
  { label: "Men's Grooming", value: "Men's Grooming" },
  { label: "Women's Hygiene", value: "Women's Hygiene" },
  { label: "Detergents & Dishwash", value: "Detergents & Dishwash" },
  { label: "Cleaners & Disinfectants", value: "Cleaners & Disinfectants" },
  { label: "Tissues & Paper Products", value: "Tissues & Paper Products" },
  { label: "Home Fresheners", value: "Home Fresheners" },
  { label: "Baby Food & Diapers", value: "Baby Food & Diapers" },
  { label: "Pet Food & Accessories", value: "Pet Food & Accessories" },
  { label: "Stationery & Magazines", value: "Stationery & Magazines" },
  { label: "Electronics & Batteries", value: "Electronics & Batteries" },
  { label: "Kitchen Essentials", value: "Kitchen Essentials" },
  { label: "Miscellaneous", value: "Miscellaneous" },
];

export const NAME_REGEX = /^[A-Za-z0-9 ]{2,50}$/;
export const COMPANY_NAME_REGEX = /^[A-Za-z0-9&. ]{2,50}$/;
export const PRICE_REGEX = /^\d+(\.\d{1,2})?$/;
