import categoryControllers from "../controllers/categoryControllers"

export default(app) => {
    app.get('/category/get', categoryControllers.get)
    app.get('/category/delete', categoryControllers.deleta);
    app.post('/category/post', categoryControllers.create);

}
