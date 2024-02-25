import { createRouter, createWebHistory } from 'vue-router'
import UserService from '@/services/userservice';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import DashboardView from '@/views/dashboard/DashboardView.vue';
import EmployeeView from "@/views/dashboard/EmployeeView.vue";
import RoomView from '@/views/dashboard/RoomView.vue';
import RoomDetailView from '@/views/dashboard/RoomDetailView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      redirect:'/home'
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/home',
          name: 'dashboard',
          component: DashboardView
        },
        {
          path:'/rooms',
          name: 'rooms',
          component: RoomView
        },
        {
          path:'/room/:id',
          name: 'room',
          component: RoomDetailView
        },
        {
          path:'/home/employee',
          name: 'employee',
          component: EmployeeView
        },
        {
          path:'/home/hotel',
          name: 'hotel',
          component: () => import("@/views/dashboard/HotelView.vue")
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
