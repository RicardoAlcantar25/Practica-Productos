const ruta=require("express").Router();
const UsuarioClase=require("../clases/UsuarioClase");
const UsuarioBD=require("../bd/UsuariosBD");
const Usuario = require("../clases/UsuarioClase");

ruta.get("/",async (req,res)=>{
    //var usuario1= new UsuarioClase();
    const usuariobd= new UsuarioBD();
    const usuariosMySql=await usuariobd.mostrarUsuarios();
    var usuariosCorrectos=[];
    usuariosMySql.forEach(usuario => {
        var usuario1 = new UsuarioClase(usuario);
        if(usuario1.nombre!=undefined && usuario1.celular!=undefined && usuario1.correo!=undefined){
        usuariosCorrectos.push(usuario);
        }
    });
    console.log(usuariosCorrectos);
    res.render("mostrarUsuarios", {usuariosCorrectos}  );
    
});


ruta.post("/agregarUsuario",(req,res)=>{
    var usuario1=new UsuarioClase(req.body);
    console.log(usuario1.mostrarDatos);
    if(usuario1.nombre!=undefined && usuario1.celular!=undefined && usuario1.correo!=undefined){
        const usuariobd = new UsuarioBD();
       usuariobd.nuevoUsuario(usuario1.mostrarDatos);
        //console.log(usuario1.mostrarDatos);
        res.render("inicio",usuario1.mostrarDatos);
    }else{
        res.render("error");


    }
    
});

ruta.get("/agregarUsuario",(req,res)=>{
    res.render("formulario");
});

ruta.get("/editarUsuario", async (req, res) => {
    try {
        const usuariobd = new UsuarioBD();
        const usuario = await usuariobd.usuarioId(req.params.id_usuarios);
        console.log(usuario);
        res.render("editarUsuario", { usuario });
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        res.status(500).send("Error al obtener el usuario");
    }
});

// POST: Procesar el formulario de edición
ruta.post("/editarUsuario/:id_usuarios", async (req, res) => {
    try {
        const usuariobd = new UsuarioBD();
        const usuario = {
            idusuarios: req.params.id_usuarios,
            nombre: req.body.nombre,
            celular: req.body.celular,
            correo: req.body.correo
        };
        await usuariobd.editarUsuario(usuario);
        console.log("Usuario editado correctamente");
        res.redirect("/");
    } catch (error) {
        console.error("Error al editar el usuario:", error);
        res.status(500).send("Error al editar el usuario");
    }
});

ruta.get("/borrarUsuario/:id",async(req,res)=>{
    try {
        const usuariobd= new UsuarioBD();
        await usuariobd.borrarUsuario(req.params.id);
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
    });
    

    const ProductoClase=require("../clases/ProductoClase");
    const ProductosBD=require("../bd/productoBD");
    
    ruta.get("/productos", async(req, res)=>{
        const productosbd = new ProductosBD();
        const productosMySql = await productosbd.mostrarProductos();
        var productosCorrectos=[];
        productosMySql.forEach(producto => {
            var producto1=new ProductoClase(producto);
            if(producto1.nombre!=undefined && producto1.descripcion!=undefined && producto1.precio!=undefined){
                productosCorrectos.push(producto);
            }
        });
        //console.log(usuariosCorrectos);
        res.render("mostrarProductos", {productosCorrectos});
    });
    
    
    ruta.post("/agregarProducto", (req, res)=>{
        var producto1=new ProductoClase(req.body);
        if(producto1.nombre!=undefined && producto1.descripcion!=undefined && producto1.precio!=undefined){
            const productosbd=new ProductosBD();
            productosbd.nuevoProducto(producto1.mostrarDatos);
            //console.log(usuario1.mostrarDatos);
            res.render("inicioProductos", producto1.mostrarDatos);
        }
        else {
            res.render("error")
        }
        
    });
    
    ruta.get("/agregarProducto", (req, res)=>{
        res.render("formularioProductos");
    });
    
    ruta.get("/editarProducto/:idproducto", async (req, res)=>{
        try {
            const productosbd= new ProductosBD();
            const producto=await productosbd.productoId(req.params.idproducto);
            // console.log(usuario);
            res.render("editarProducto", producto);
        } catch (error) {
            
        }
            res.end();   
    });
    
    ruta.post("/editarProducto", async(req, res)=>{
        try {
            const productosbd=new ProductosBD();
            await productosbd.editarProducto(req.body);
            console.log("Producto editado correctamente");
            res.redirect("/productos");
        } catch (error) {
            console.log("Error al editar el producto");
        }
    });
    
    ruta.get("/borrarProducto/:id", async(req,res)=>{
        try {
            const productosbd=new ProductosBD();
            await productosbd.borrarProducto(req.params.id);
            res.redirect("/productos");
        } catch (error) {
            console.log(error);
        }
    });
    
    module.exports=ruta;