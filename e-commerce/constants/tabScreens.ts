import {
  CartBottomBarIcon,
  HeartIcon,
  HomeIcon,
  SearchBarIcon,
  SettingIcon,
} from '@/components/icons';

export const TAB_SCREENS = [
  {
    name: 'index',
    title: 'Home',
    Icon: HomeIcon,
  },
  {
    name: 'wishlist',
    title: 'Wishlist',
    Icon: HeartIcon,
  },
  {
    name: 'cart',
    title: '',
    Icon: CartBottomBarIcon,
    isCart: true,
  },
  {
    name: 'search',
    title: 'Search',
    Icon: SearchBarIcon,
  },
  {
    name: 'setting',
    title: 'Setting',
    Icon: SettingIcon,
  },
];
