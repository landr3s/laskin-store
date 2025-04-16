import {
  AiOutlineShopping,
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineShoppingCart
} from 'react-icons/ai'
import { FaHeart, FaRegistered } from 'react-icons/fa'

export const navLinks = [
  { label: 'Home', to: '/', icon: AiOutlineHome },
  { label: 'Shop', to: '/shop', icon: AiOutlineShopping },
  { label: 'Cart', to: '/cart', icon: AiOutlineShoppingCart, hasCart: true },
  { label: 'Favorite', to: '/favorite', icon: FaHeart, hasFavorites: true }
]
export const authLinks = [
  { label: 'Login', to: '/login', icon: AiOutlineLogin },
  { label: 'Register', to: '/register', icon: FaRegistered }
]
