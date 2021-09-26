

function render(){

    load()
    let persona = JSON.parse(localStorage.getItem("datos"));

    if(persona==null){
        location.replace('login.html');
    }
    if(persona[0].usuario=="admin"){
    alert("hola admin " + `${persona[0].nombre}`);
    }else{
        alert("usted no tiene privilegios para estar aqui adios.");
        location.replace('login.html');
    }
}

function load (){
    let datos1 = JSON.parse(localStorage.getItem("datos"));
    
    var usuario = document.getElementById('usuario');
    
    var carrito = [];
    if(datos1 == null){
        console.log("no hay datos")
        usuario.innerHTML += `<a href="login.html">Iniciar Sesion</a>`;

        }else{ 

          usuario.innerHTML += `${datos1[0].nombre}  <a href="index.html"onclick="cerrar()" style="color: red;">Log out</a>   `;  
        }
}

$(document).ready(function() {
      
  var a ="";
  var l = "";
    
   

    var filaEliminada; //para capturara la fila eliminada
    var filaEditada; //para capturara la fila editada o actualizada

    //creamos constantes para los iconos editar y borrar    
    const iconoEditar = '<svg class="bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>';
    const iconoBorrar = '<svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>';
     
    
      
    var db = firebase.database();
    var coleccionProductos = db.ref().child("Usuarios");
    var coleccionProductos1 = db.ref().child("Admins");

    function getRandNumb(limit){

        let rand = Math.floor(Math.random() * limit);
        return rand;
     
     }
    var dataSet = [];//array para guardar los valores de los campos inputs del form

    var table = $('#tablaProductos').DataTable({

        
                pageLength : 5,
                lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
                data: dataSet,
                columnDefs: [
                    {
                        targets: [0], 
                        visible: false, //ocultamos la columna de ID que es la [0]                        
                    },
                    {
                        targets: -3, 
                        visible: true, 
                    },
                    {
                        targets: -1,        
                        defaultContent: "<div class='wrapper text-center'><div class='btn-group'><button class='btnEditar btn btn-primary' data-toggle='tooltip' title='Editar'>"+iconoEditar+"</button><button class='btnBorrar btn btn-danger' data-toggle='tooltip' title='Borrar'>"+iconoBorrar+"</button></div></div>"
                    },
                    {
                        targets: -2, 
                        
                        visible: true,
           
                    }
                ]	   
            });

    
    
          


    coleccionProductos.on("child_added", datos => {        
                            
        dataSet = [datos.key, datos.child("nombre").val(), datos.child("telefono").val(), datos.child("usuario").val(), datos.child("contraseña").val()];
        
        table.rows.add([dataSet]).draw();
          
    });
    coleccionProductos.on('child_changed', datos => {           
        dataSet = [datos.key, datos.child("nombre").val(), datos.child("telefono").val(), datos.child("usuario").val(), datos.child("contraseña").val()];
       
        table.row(filaEditada).data(dataSet).draw();
    });
    coleccionProductos.on("child_removed", function() {
        table.row(filaEliminada.parents('tr')).remove().draw();                     
    });

                                    function obtenercontraseña()
                                    {

                                        var contraseña=document.getElementById("contraseña").value;
                                        var rescontraseña = contraseña.split("-");
                                        var reversedcontraseña = rescontraseña.reverse(); 
                                        var contraseñaOb=reversedcontraseña.join('-');
                                         contraseñaOb= contraseñaOb.replaceAll("-","/") ;
                                        
                                       
                                       l = contraseñaOb;
                                    
                                    }

                                    
                                    
    $('form').submit(function(e){       
                       
        e.preventDefault();
        let id = $.trim($('#telefono').val());        
        let nombre = $.trim($('#nombre').val());
        let telefono = $.trim($('#telefono').val());
        let usuario = $.trim($('#user').val());         
        let contraseña = $.trim($('#contraseña').val()); 
                                
                                 
       
                   
        data = {nombre:nombre,telefono:telefono,usuario:usuario,contrase\u00F1a:encrypt(contraseña,2)};             
        actualizacionData = {};
        actualizacionData[`/${id}`] = data;
        coleccionProductos.update(actualizacionData);
        coleccionProductos1.update(actualizacionData);
        id = '';        
        $("form").trigger("reset");
        $('#modalAltaEdicion').modal('hide');
    });

    //Botones
    $('#btnNuevo').click(function() {
        $('#nombre').val('');        
        $('#telefono').val('');        
        $('#user').val('');   
        $('#contraseña').val('');           
        $("form").trigger("reset");
        $('#modalAltaEdicion').modal('show');
    });        

    $("#tablaProductos").on("click", ".btnEditar", function() {    
        filaEditada = table.row($(this).parents('tr'));           
        let fila = $('#tablaProductos').dataTable().fnGetData($(this).closest('tr'));               
        let id = fila[0];
        console.log(id);
		let codigo = $(this).closest('tr').find('td:eq(0)').text(); 
        let nombre = $(this).closest('tr').find('td:eq(0)').text();        
        let telefono = $(this).closest('tr').find('td:eq(1)').text();             
        let contraseña = $(this).closest('tr').find('td:eq(3)').text();       
        let  usuario = $(this).closest('tr').find('td:eq(2)').text();  
        $('#id').val(id);        
        $('#codigo').val(codigo);
        $('#nombre').val(nombre);        
        $('#telefono').val(telefono);              
        $('#user').val(usuario);   
        $('#contraseña').val(encrypt(contraseña,-2));                     
        $('#modalAltaEdicion').modal('show');
	});  
    const str = 'thisIsAString';
    const getMap = (legend, shift) => {
       return legend.reduce((charsMap, currentChar, charIndex) => {
          const copy = { ...charsMap };
          let ind = (charIndex + shift) % legend.length;
          if (ind < 0) {
             ind += legend.length;
          };
          copy[currentChar] = legend[ind];
          console.log( copy[currentChar])
          return copy;
       }, {});
    };
    const getMap2 = (legend2, shift) => {
        return legend2.reduce((charsMap, currentChar, charIndex) => {
           const copy = { ...charsMap };
           let ind = (charIndex + shift) % legend2.length;
           if (ind < 0) {
              ind += legend2.length;
           };
           copy[currentChar] = legend2[ind];
           console.log( copy[currentChar])
           return copy;
        }, {});
     };
    const encrypt = (str, shift = 0) => {
        
        
        const legend = 'abcdefghijklmnopqrstuvwxyz'.split('');
        const legend2= 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

        const map = getMap(legend, shift);
        const map2 = getMap2(legend2,shift);

        
        return str
        .split('')
        .map(char => map[char] || map2[char] || char)
        .join('');
     };
  
    $("#tablaProductos").on("click", ".btnBorrar", function() {   
        filaEliminada = $(this);
        Swal.fire({
        title: '¿Está seguro de eliminar el producto?',
        text: "¡Está operación no se puede revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Borrar'
        }).then((result) => {
        if (result.value) {
            let fila = $('#tablaProductos').dataTable().fnGetData($(this).closest('tr'));            
            let id = fila[0];            
            db.ref(`Usuarios/${id}`).remove()
            Swal.fire('¡Eliminado!', 'El producto ha sido eliminado.','success')
        }
        })        
	});  

    

});

