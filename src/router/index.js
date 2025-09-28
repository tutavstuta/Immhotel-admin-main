import { createRouter, createWebHistory } from 'vue-router';
import UserService from '@/services/userservice';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import DashboardView from '@/views/dashboard/DashboardView.vue';
import EmployeeView from "@/views/dashboard/EmployeeView.vue";
import RoomView from '@/views/dashboard/RoomView.vue';
import RoomDetailView from '@/views/dashboard/RoomDetailView.vue';
import PromotionView from '@/views/dashboard/PromotionView.vue';
import SettingView from '@/views/dashboard/SettingView.vue';
import BookingView from '@/views/dashboard/BookingView.vue';
import PayInView from '@/views/dashboard/PayInView.vue';
import AvailableRoomView from '@/views/dashboard/AvailableRoomView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      redirect:'/dashboard',
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: DashboardView
        },
        {
          path: '/bookings',
          name: 'bookings',
          component: BookingView
        },
        {
          path: '/payin',
          name: 'payin',
          component: PayInView
        },
        {
          path: '/rooms',
          name: 'rooms',
          component: RoomView
        },
        {
          path: '/availablerooms',
          name: 'availablerooms',
          component: AvailableRoomView
        },
        {
            path: '/room',
            redirect:'/rooms'
        },
        {
          path: '/room/:id',
          name: 'room',
          component: RoomDetailView
        },
        {
          path: '/promotion',
          name: 'promotion',
          component: PromotionView
        },
        {
          path: '/employee',
          name: 'employee',
          component: EmployeeView
        },
        {
          path: '/hotel',
          name: 'hotel',
          component: () => import("@/views/dashboard/HotelView.vue")
        },
        {
          path: '/setting',
          name: 'setting',
          component: SettingView,
          children: [
            {
              path: '/setting',
              name: 'room overview',
              component: () => import('@/views/dashboard/setting/RoomOverview.vue')
            },
            {
              path: '/setting/room-overview',
              name: 'room overview',
              component: () => import('@/views/dashboard/setting/RoomOverview.vue')
            },
            {
              path: '/setting/room-amenity',
              name: 'room amenity',
              component: () => import('@/views/dashboard/setting/RoomAmenityView.vue')
            }
          ]
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
});


const Authenticated = async () => {

  const userService = new UserService();
  let authen = false;
  await userService.getMe().then((response) => {

    if (response.message === "get me successfully")
      authen = true
  }).catch((err) => console.error(err));

  return authen
};

router.beforeEach(async (to, from, next) => {

  const isAuthenticated = await Authenticated();

  if (to.name !== 'login' && !isAuthenticated) next({ name: 'login' })
  else next()
});

export default router;
