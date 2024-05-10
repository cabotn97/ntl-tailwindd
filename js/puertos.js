$(document).ready(function () {
    $.ajax({
        type: "POST",
        url: "/WebServices/ServicioControles.asmx/ListaPaisesMANI",
        data: "",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var s
            for (var i = 0; i < data.d.length; i++) {
                s += '<option value="' + data.d[i].idPaisAfip + '">' + data.d[i].pais + '</option>';
            }
            $('#selectpuertos').html(s);
            $("#selectpuertos").val('').trigger('change')

        },
        error: function (data) {
            var s = '<option value="0">SELECCIONAR PAIS</option>';
            $("#selectpuertos").html(s);
        }
    });

    
});

$('#selectpuertos').on('change', function() {
    function limpiargrilla() {
        $("#tblPuertos").find("tr:gt(0)").remove();
        document.getElementById('barraBusqueda').value = ''
    }
       
        $.ajax({
            url: "/WebServices/ServicioControles.asmx/ListaPuertosMANI",
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: "{ 'idPais': '" + this.value + "'}",
            success: function (data)
            {
                limpiargrilla();
                $.each(data.d, function (key, value) {
                    row = '<tr class="border-b">';
                    row += '<td class="text-left font-normal text-sm py-2 pl-2">' + value.puerto + '</td>';
                    row += '<td class="text-center font-bold text-clrAzul text-sm py-2">' + value.codMalvina + '</td>';
                    row += '</tr>';
                    $(row).appendTo("#tblPuertos");
                    document.getElementById('pais').innerHTML = value.pais
                    document.getElementById('codPais').innerHTML = ("(COD: "+ value.idPais +")")
                });
            }
        });
  });