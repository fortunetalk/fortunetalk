export const genderData = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  { label: 'Other', value: 'Other' },
];

export const languageData = [
  { label: 'Hindi', value: 'Hindi' },
  { label: 'English', value: 'English' },
];

export const occupationData = [
  { label: 'Student', value: 'Student' },
  { label: 'Employee', value: 'Employee' },
  { label: 'Business', value: 'Business' },
  { label: 'Entrepreneur', value: 'Entrepreneur' },
  { label: 'Housewife', value: 'Housewife' },
  { label: 'Unemployment', value: 'Unemployment' },
];

export const problemData = [
  { label: 'Relationship Problem', value: 'Relationship Problem' },
  { label: 'Marriage Problem', value: 'Marriage Problem' },
  { label: 'Career Problem', value: 'Career Problem' },
  { label: 'Business Problem', value: 'Business Problem' },
  { label: 'Family Problem', value: 'Family Problem' },
  { label: 'Health Problem', value: 'Health Problem' },
];

export const regex = {
  phoneNumber: /^\d{10}$/,
  name: /^[A-Z][a-z'-]*(?: [A-Z][a-z'-]*)*$/,
  amount: /^(\d+)(\.\d+)?$/
}

export const freeInsightData = [
  {
    id: 1,
    name: 'Daily\nHoroscope',
    image: require('../assets/images/daily_horoscope.png'),
  },
  {
    id: 2,
    name: 'Kundli\nMatching',
    image: require('../assets/images/matching.png'),
  },
  {
    id: 3,
    name: 'Free\nKundli',
    image: require('../assets/images/free_kundli.png'),
  },
  {
    id: 4,
    name: 'Panchang\nReport',
    image: require('../assets/images/panchang.png'),
  },
];

export const filtersTypes = [
  { id: 1, name: 'Sort & Filter', value: 'sort' },
  { id: 2, name: 'Skill', value: 'skill' },
  { id: 3, name: 'Language', value: 'language' },
  { id: 4, name: 'Gender', value: 'gender' },
  // { id: 5, name: 'Country', value: 'country' },
  { id: 6, name: 'Offer', value: 'offer' },
];

export const sortFiltersData = [
  { id: 1, name: 'Experience: High to Low', value: 'heigh_to_low_experience' },
  { id: 2, name: 'Experience: Low to High', value: 'low_to_high_experience' },
  { id: 3, name: 'Follower: High to Low', value: 'heigh_to_low_follower' },
  { id: 4, name: 'Follower: Low to High', value: 'low_to_high_follower' },
  { id: 5, name: 'Price: High to Low', value: 'heigh_to_low_price' },
  { id: 6, name: 'Price: Low to High', value: 'low_to_high_price' },
];

export const walletBannerData = [
  { id: 1, image: require('../assets/images/wallet_a.png') },
  { id: 2, image: require('../assets/images/wallet_b.png') },
  { id: 3, image: require('../assets/images/wallet_c.png') },
];

export const priceData = [
  { id: 1, price: '50' },
  { id: 2, price: '100' },
  { id: 3, price: '200' },
  { id: 4, price: '500' },
  { id: 5, price: '1000' },
  { id: 6, price: '2000' },
  { id: 7, price: '5000' },
  { id: 8, price: '10000' },
  { id: 9, price: '25000' },
];

export const labels = [
  { id: 1, title: "Order Confirmed Tue, 22nd Aug '23Your Order has been placed.", date: "Tue, 22nd Aug '23-5:28pm", sub_title: 'Item waiting to be picked up by courier partner.', sub_date: "Wed, 23rd Aug '23-4:00pm" },
  { id: 2, title: 'Shipped Expected By Thu 24th Aug', date: 'Item yet to be shipped. Expected by Thu, 24th Aug', sub_title: 'Item yet to reach hub nearest to you.', sub_date: null, },
  { id: 3, title: 'Out For Delivery', date: 'Item yet to be delivered.', sub_title: null, sub_date: null, },
  { id: 4, title: 'Delivery Expected By Fri 25th Aug', date: 'Item yet to be delivered.', sub_title: 'Expected by Fri, 25th Aug', sub_date: null },
  { id: 5, title: 'Share the OTP to the delivery boy', date: null, sub_title: null, sub_date: null },
];