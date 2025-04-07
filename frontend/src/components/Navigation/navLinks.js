import {
  AiOutlineShopping,
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineShoppingCart
} from 'react-icons/ai'
import { FaHeart, FaRegistered } from 'react-icons/fa'

export const navLinks = [
  { label: 'Home', path: '/', icon: AiOutlineHome },
  { label: 'Shop', path: '/shop', icon: AiOutlineShopping },
  { label: 'Cart', path: '/cart', icon: AiOutlineShoppingCart },
  { label: 'Favorite', path: '/favorite', icon: FaHeart }
]

export const authLinks = [
  { label: 'Login', path: '/login', icon: AiOutlineLogin },
  { label: 'Register', path: '/register', icon: FaRegistered }
]
