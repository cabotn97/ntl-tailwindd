function BotoneraArribos() {
    alert("caller is " + arguments.callee.caller.name.toString());
}

// LLENADO TABLA Y FILTRO SEGUN TERMINAL

$(function () {
    $("#btnCerrar").hide();
    $("#btnSesion").click(function () { $("#btnCerrar").click(); });
    consultaarribos(0, true);
    $('#btnTodos').click(function () {
        limpiargrilla();
        consultaarribos(0, true);
    });
    $('#btnTRP').click(function () {
        limpiargrilla();
        consultaarribos(2, true);
    });
    $('#btnTerminal').click(function () {
        limpiargrilla();
        consultaarribos(3, true);
    });
    $('#btnExolgan').click(function () {
        limpiargrilla();
        consultaarribos(1, true);
    });
    function limpiargrilla() {
        $("#tblArribos").find("tr:gt(0)").remove();
        document.getElementById('barraBusqueda').value = ''
    }
    function consultaarribos(terminal, eta)
    {
        $.ajax({
            url: "/WebServices/ServicioControles.asmx/ListarArribos",
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: "{ 'terminal': '" + terminal + "'}",
            success: function (data) 
            {
                $.each(data.d, function (key, value) {
                    row = '<tr id="tr' + value.IDItem + '" class="h-12">';
                    row += '<td>' + value.barco + '</td>';
                    row += '<td>' + value.terminal + '</td>';
                    row += '<td class="text-center">' + value.fechaETA + '</td>';
                    row += '<td class="text-center">' + value.fechaForzoso + '</td>';
                    row += '<td class="h-full"><div class="bg-clr'+ value.estado +' rounded-md py-1 w-20 text-center text-xs font-bold">'+ value.estado +'</div></div></td>' ;
                    if (value.estado == 'Finalizado' || value.estado == 'Cancelado' || value.estado == 'Arribado' || value.estado == 'Arrived'){
                        row += '<td></td>';
                    }
                    else {
                        row += '<td class=" text-clrGrisClaro hover:text-clrCeleste cursor-pointer"><button id="btn ' + value.IDItem + '" onclick="cargarDetalle(' + value.IDItem + ')" data-modal-target="default-modal" data-modal-toggle="default-modal"  class="w-full flex justify-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" /><path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clip-rule="evenodd" /></svg></button></td>';
                    }
                    if (value.idBuqueMT == 0){
                        row += '<td></td>';
                    }
                    else{
                        row += '<td class="text-clrGrisClaro hover:text-clrCeleste"><a class="w-full flex justify-center" href="https://www.marinetraffic.com/en/ais/home/shipid:'+ value.idBuqueMT +'" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M8.161 2.58a1.875 1.875 0 0 1 1.678 0l4.993 2.498c.106.052.23.052.336 0l3.869-1.935A1.875 1.875 0 0 1 21.75 4.82v12.485c0 .71-.401 1.36-1.037 1.677l-4.875 2.437a1.875 1.875 0 0 1-1.676 0l-4.994-2.497a.375.375 0 0 0-.336 0l-3.868 1.935A1.875 1.875 0 0 1 2.25 19.18V6.695c0-.71.401-1.36 1.036-1.677l4.875-2.437ZM9 6a.75.75 0 0 1 .75.75V15a.75.75 0 0 1-1.5 0V6.75A.75.75 0 0 1 9 6Zm6.75 3a.75.75 0 0 0-1.5 0v8.25a.75.75 0 0 0 1.5 0V9Z" clip-rule="evenodd" /></svg></a></td>';
                    }
                    row += '</tr>';
                    $(row).appendTo("#tblArribos");
                });
            }
        });
    }
});

// HORA ULTIMA ACTUALIZACION

$(function () {
	lastUpdate();

	function lastUpdate()
    {
        $.ajax({
            url: "/WebServices/ServicioControles.asmx/ListarUltimaActualizacion",
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: "",
            success: function (data) 
            {
                $.each(data, function (key, value) {
                    //Web
                    document.getElementById("lblTRP").innerHTML = value[0]
					document.getElementById("lblT4").innerHTML = value[1]
					document.getElementById("lblEXOLGAN").innerHTML = value[2]

                });
            }
        });
	}
});


//SCRIPT LLENADO DE MODAL//
function cargarDetalle(id) {
    let elementoSeleccionado = document.getElementById("tr" + id);
    document.getElementById("lblBarco").innerHTML = elementoSeleccionado.childNodes[0].innerHTML;
    document.getElementById("lblTerminal").innerHTML = elementoSeleccionado.childNodes[1].innerHTML;
    document.getElementById("lblEta").innerHTML = elementoSeleccionado.childNodes[2].innerHTML;
    document.getElementById("lblForzoso").innerHTML = elementoSeleccionado.childNodes[3].innerHTML;
    document.getElementById("lblEstado").innerHTML = elementoSeleccionado.childNodes[4].firstChild.innerHTML;
    document.getElementById("txtID").value = id;

    let estado = elementoSeleccionado.childNodes[4].firstChild.innerHTML
    let colorBackground = ''
    if (estado == 'Finalizado' || estado == 'Finished' || estado == 'Arribado' || estado == 'Arrived'){
        colorBackground = '#69b79d'
    }else if (estado == 'Esperado' || estado == 'Expected' || estado == 'Creado' || estado == 'Created') {
        colorBackground = '#43b5e4'
    } else if (estado == 'Operando' || estado == 'Operating') {
        colorBackground = '#fce76f'
    } else if (estado == 'Cancelado' || estado == 'Cancelled') {
        colorBackground = '#e63f41'
    }
    document.getElementById('lblEstado').style.backgroundColor = colorBackground
}

//SCRIPT SEGUIR EMBARCO//

function agregarSeguimiento() {
    let idtransito = document.getElementById("txtID").value
    let mail = document.getElementById("txtEmail").value
    let impoExpo = document.getElementById("ImpoExpo").value
    let despachante = document.getElementById("Despachante").value
    let otro = document.getElementById("Otro").value
    let telegram = ''
    if (mail == "") {
        Swal.fire({
            icon: 'error',
            title: 'Ingrese mail para continuar',
            text: '',
            confirmButtonColor: '#41b6e6',
        })
    }
    else {
        $.ajax({
            url: "/WebServices/ServicioControles.asmx/SeguimientoArribo",
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: "{ 'idtransito': '" + idtransito + "', 'mail': '" + mail + "', 'telegram' : '" + telegram + "', 'impoExpo' : '" + impoExpo + "', 'despachante' : '" + despachante + "', 'otro' : '" + otro + "'}",
            success: function(data, status, xhr)
            {
                modal.style.display = "none";
                Swal.fire({
                    icon: 'success',
                    title: 'Seguimiento de buque activado',
                    text: '',
                    confirmButtonColor: '#41b6e6',
                })
            },
            error: function (data) {
                Swal.fire({
                    icon: 'error',
                    title: 'Intente de nuevo mas tarde',
                    text: '',
                    confirmButtonColor: '#41b6e6',
                })
            },
        })
    } 
}