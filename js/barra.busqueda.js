function busquedaTabla(inputBusqueda, nombreTabla, colDesde, colHasta) {
    var input, filter, table, tr, td, i, txtValue, fila, col;
    input = document.getElementById(inputBusqueda);
    filter = input.value.toUpperCase();
    table = document.getElementById(nombreTabla);
    tr = table.getElementsByTagName("tr");
    for (fila = 0; fila < tr.length; fila++) {
        for (col = colDesde; col <= colHasta; col++) {
            td = tr[fila].getElementsByTagName("td")[col];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[fila].style.display = "";
                    break;
                } else {
                    tr[fila].style.display = "none";
                }
            }
        }
    }
}