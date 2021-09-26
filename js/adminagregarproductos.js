function render(){
    let persona = JSON.parse(localStorage.getItem("datos"));

    if(persona==null){
        location.replace('login.html');
    }
    if(persona[0].usuario=="admin" || persona[0].usuario=="soporte"){
    alert("hola admin " + `${persona[0].nombre}`);
    }else{
        alert("usted no tiene privilegios para estar aqui adios.");
        location.replace('login.html');
    }
}

$(document).ready(function() {
      
  var a ="";
  var l = "";
    function mostrar(){
        document.getElementById('progreso').innerHTML = ' <progress id="progress_bar" value="0" max="100"></progress>';}
      
      document.getElementById('file').addEventListener('change', (event) => {
          const file = event.target.files[0];
          const storageRef = firebase.storage().ref('images/' + file.name);
      
          storageRef.put(file).on('state_changed', (snapshot) => {
            mostrar()
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(progress);
      
              const progressBar = document.getElementById('progress_bar');
              progressBar.value = progress;
          });
          
          storageRef.getDownloadURL().then(function(url){
              
              const image = document.getElementById('image');
              console.log(url);
              image.src = url
                    a= url;
          });
      });

    var filaEliminada; //para capturara la fila eliminada
    var filaEditada; //para capturara la fila editada o actualizada

    //creamos constantes para los iconos editar y borrar    
    const iconoEditar = '<svg class="bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>';
    const iconoBorrar = '<svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>';
     
      
      
    var db = firebase.database();
    var coleccionProductos = db.ref().child("productos");
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
                        visible: false, 
                    },
                    {
                        targets: -1,        
                        defaultContent: "<div class='wrapper text-center'><div class='btn-group'><button class='btnEditar btn btn-primary' data-toggle='tooltip' title='Editar'>"+iconoEditar+"</button><button class='btnBorrar btn btn-danger' data-toggle='tooltip' title='Borrar'>"+iconoBorrar+"</button></div></div>"
                    },
                    {
                        targets: -2, 
                        
                        visible: false,
           
                    }
                ]	   
            });

    coleccionProductos.on("child_added", datos => {        
                           
        dataSet = [datos.key, datos.child("ProductNombre").val(), datos.child("categoria").val(), datos.child("precio").val(), datos.child("descripcion").val(),datos.child("fechacaducidad").val(), datos.child("fecha").val(), datos.child("hora").val(), datos.child("cantidad").val(),datos.child("pid").val(),datos.child("imagen").val()];
        
        
        console.log(dataSet)
        table.rows.add([dataSet]).draw();


        
          
    });
    coleccionProductos.on('child_changed', datos => {           
        dataSet = [datos.key, datos.child("ProductNombre").val(), datos.child("categoria").val(), datos.child("precio").val(), datos.child("descripcion").val(),datos.child("fechacaducidad").val(), datos.child("fecha").val(), datos.child("hora").val(), datos.child("cantidad").val(),datos.child("pid").val(),datos.child("imagen").val()];
        table.row(filaEditada).data(dataSet).draw();
    });
    coleccionProductos.on("child_removed", function() {
        table.row(filaEliminada.parents('tr')).remove().draw();                     
    });
          

                                    function obtenerFecha()
                                    {

                                        var fecha=document.getElementById("fecha").value;
                                        var resFecha = fecha.split("-");
                                        var reversedFecha = resFecha.reverse(); 
                                        var FechaOb=reversedFecha.join('-');
                                         FechaOb= FechaOb.replaceAll("-","/") ;
                                        
                                       
                                       l = FechaOb;
                                    
                                    }

                                    function obtenerFecha1()
                                    {

                                        var fecha=document.getElementById("fechacaducidad").value;
                                        var resFecha = fecha.split("-");
                                        var reversedFecha = resFecha.reverse(); 
                                        var FechaOb=reversedFecha.join('-');
                                         FechaOb= FechaOb.replaceAll("-","/") ;
                                        
                                       
                                       d = FechaOb;
                                    
                                    }

                                    
                                    
    $('form').submit(function(e){       
        obtenerFecha();
        obtenerFecha1();                  

        e.preventDefault();
        let id = $.trim($('#nombre').val());        
        let ProductNombre = $.trim($('#nombre').val());
        let categoria = $.trim($('#categoria').val());
        let precio = $.trim($('#precio').val());         
        let descripcion = $.trim($('#descripcion').val()); 
        let fechacaducidad = d;                      
        let fecha = l;                       
        let hora = $.trim($('#hora').val());
        let cantidad = $.trim($('#cantidad').val());                         
        let imagen = a ;                     
        let pid = $.trim(l+$('#hora').val());                         
                                 
       
                   
        data = {ProductNombre:ProductNombre,categoria:categoria,descripcion:descripcion,fechacaducidad:fechacaducidad,fecha:fecha,hora:hora,cantidad:cantidad,imagen:imagen,pid:pid,precio:precio};             
        actualizacionData = {};
        actualizacionData[`/${id}`] = data;
        coleccionProductos.update(actualizacionData);
        id = '';        
        $("form").trigger("reset");
        $('#modalAltaEdicion').modal('hide');
    });

    //Botones
    $('#btnNuevo').click(function() {
       
        const image = document.getElementById('image');
        $('#nombre').val('');        
        $('#categoria').val('');
        $('#precio').val('');         
        $('#descripcion').val(''); 
        $('#fechacaducidad').val('');      
        $('#fecha').val('');      
        $('#hora').val('');      
        $('#cantidad').val('');    
        image.src="";  
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
        let categoria = $(this).closest('tr').find('td:eq(1)').text();        
        let precio = parseInt($(this).closest('tr').find('td:eq(2)').text());        
        let descripcion = $(this).closest('tr').find('td:eq(3)').text();  
        let fechacaducidad = $(this).closest('tr').find('td:eq(4)').text();
        let fecha = $(this).closest('tr').find('td:eq(5)').text();
        let hora = $(this).closest('tr').find('td:eq(6)').text();
        let cantidad = parseInt($(this).closest('tr').find('td:eq(7)').text());        
        $('#id').val(id);        
        $('#codigo').val(codigo);
        $('#nombre').val(nombre);        
        $('#categoria').val(categoria);         
        $('#precio').val(precio);         
        $('#descripcion').val(descripcion);   
        $('#fechacaducidad').val(fechacaducidad);      
        $('#fecha').val(fecha);      
        $('#hora').val(hora);      
        $('#cantidad').val(cantidad);                
        $('#modalAltaEdicion').modal('show');
	});  
  
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
            db.ref(`productos/${id}`).remove()
            Swal.fire('¡Eliminado!', 'El producto ha sido eliminado.','success')
        }
        })        
	});  

    

});

