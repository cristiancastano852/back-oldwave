import express from 'express'
import routeProducts from './views/products/products'
import routeRole from './views/role/role'
import routeShoppingCart from './views/shoppingCart/shopingCart'
import routeAdmin from './views/admin/admin'
import routeUser from './views/user/user'
import routeOrder from './views/order/order'
import routeProductRating from './views/rating/rating'

const app = express()

const port=process.env.PORT || 4000
app.use(express.json())
app.use(routeProducts)
app.use(routeShoppingCart)
app.use(routeRole)
app.use(routeAdmin)
app.use(routeUser)
app.use(routeProductRating)
app.use(routeOrder)


const server = app.listen(port, () =>
  console.log(`
🚀 Server ready at: ${port}`),
)

server.on('request', (req) => console.log(req.url))
