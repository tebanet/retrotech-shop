retrotech_shop API\

Es un catálogo de compraventa de artículos retro. Quien busca algo, selecciona lo que le interesa y solicita la compra al precio publicado.\

Rutas de usuario:\
POST /user --> Registro de usuario\
POST /user/login --> Login de usuario\
PUT /user/update/:id --L Modificar el usuario\
GET /:username --> Recuperar el usuario\

Rutas de productos:\
GET / --> Muestra todos los productos\
GET /category/:category --> Selecciona los productos por categoría\
GET /product/:id --> Selecciona el producto por el id\
POST / --> Crea un nuevo producto\
DEL /product/:id --> Elimina el producto\
GET /search/name/:letter --> Buscar por nombre de producto\
GET /search/category/:letter --> Buscar por categoría de producto\
GET /search/price/:min-:max --> Buscar por precio entre mínimo y máximo\
GET /search/location/:letter --> Buscar por Comunidad Autónoma\

Rutas de reservas:\
POST /product/:id/order --> Hacer una reserva de producto\
GET /:username/my-orders --> Ver mis reservas hechas y recibidas\
PATCH /:username/my-order/:id --> Aceptar, rechazar o cancelar reservas\

Rutas de valoraciones:\
GET /:username/rating --> Ver las valoraciones de un usuario\
POST /:username/rating --> Valorar a un usuario\
