import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('../views/home/Home')
const Cart = () => import('../views/cart/Cart')
const Category = () => import('../views/category/Category')
const Profile = () => import('../views/profile/Mine')
const Detail = () => import('../views/pages/Detail')
const Login = () => import('../views/login/login')
const Chart = () => import('../views/chart/chart')

Vue.use(Router)

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/category',
    component: Category,
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:goodsId',
    component: Detail,
  },
  {
    path: '/chart',
    component: Chart
  }
]

const router = new Router({
  routes
})
// 挂载路由导航守卫,判断用户是否登录
// 如果sessionStorage中有token值,则可以访问其他页面
// 如果没有,则强制跳转到login登陆页面
router.beforeEach((to, from, next) => {
  // to代表将要访问的路径
  // from表示从哪个路径跳转而来
  // next是一个函数,表示放行
  // next()放行  next('/login')表示强制跳转到/login
  if (to.path === '/login') {
    // 表示要访问的是登录页,不进行拦截
    // const token = window.sessionStorage.getItem('token')



    // 函数中的参数为 要获取的cookie键的名称。
    function getCookie(c_name) {
      if (document.cookie.length > 0) {
        let c_start = document.cookie.indexOf(c_name + "=");
        let c_end;
        if (c_start != -1) {
          c_start = c_start + c_name.length + 1;
          c_end = document.cookie.indexOf(";", c_start);
          if (c_end == -1) {
            c_end = document.cookie.length;
          }

          return unescape(document.cookie.substring(c_start, c_end));
        }
      }

      return "";
    }
    var token = getCookie('token');


    if (token) {
      return next('/home')
    }
    return next()
  } else {
    // 表示要访问其他页面,判断是否登录
    // 获取token

    // const token = window.sessionStorage.getItem('token')


    function getCookie(c_name) {
      if (document.cookie.length > 0) {
        let c_start = document.cookie.indexOf(c_name + "=");
        let c_end;
        if (c_start != -1) {
          c_start = c_start + c_name.length + 1;
          c_end = document.cookie.indexOf(";", c_start);
          if (c_end == -1) {
            c_end = document.cookie.length;
          }

          return unescape(document.cookie.substring(c_start, c_end));
        }
      }

      return "";
    }
    var token = getCookie('token');



    if (!token) {
      // sessionStorage中没有token,代表没有登录
      return next('/login')
    } else {
      // sessionStorage中有token,代表已经登录,直接放行
      next()
    }
  }
})
export default router

