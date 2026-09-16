import { AppstoreOutlined, ShopOutlined, TableOutlined, CalendarOutlined } from '@ant-design/icons';

const icons = {
  AppstoreOutlined,
  ShopOutlined,
  TableOutlined,
  CalendarOutlined
};

const categories = {
  id: 'group-categories',
  title: 'Management',
  type: 'group',
  children: [
    {
      id: 'categories',
      title: 'Categories',
      type: 'item',
      url: '/categories',
      icon: icons.AppstoreOutlined,
      breadcrumbs: false
    },
    {
      id: 'menu',
      title: 'Menu',
      type: 'item',
      url: '/menu',
      icon: icons.ShopOutlined,
      breadcrumbs: false
    },
    {
      id: 'tables',
      title: 'Tables',
      type: 'item',
      url: '/tables',
      icon: icons.TableOutlined,
      breadcrumbs: false
    },
    {
      id: 'reservations',
      title: 'Reservations',
      type: 'item',
      url: '/reservations',
      icon: icons.CalendarOutlined,
      breadcrumbs: false
    }
  ]
};

export default categories;