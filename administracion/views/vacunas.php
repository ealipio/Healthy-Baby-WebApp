<div class="row">
    <div class="col-lg-12 col-lg-offset-0 col-md-12 col-md-offset-0 table-responsive">
		 <h4>Lista de Vacunas</h4></br>

<?php
session_start();
    if($_SESSION['id_perfil'][0]['id_perfil']== 1){
    echo "<a href='#nueva_vacuna'><button type='button' class='cyan darken-2 waves-effect waves-light btn'>Agregar Vacuna +</button></a></br>";
    }
?>



</br></br>
    <table class="table table-bordered bordered" id="searchObjResults">
    	<thead>
    		<tr>
    		    <th>Vacuna</th>
    		    <th ng-repeat="j in vacunas.total">DOSIS {{$index +1}}</th>
    		    <th>Estado</th> 
                <th>Observaciones</th> 
    		    
                <?php
                    if($_SESSION['id_perfil'][0]['id_perfil']== 1){
                    echo "<th>Acciones</th>";
                    }
                ?>

                
    		  
    		</tr>
    	</thead>

        <tbody>
        	<tr ng-repeat="n in vacunas_pag">
            
                <td data-ng-show="n.nombre_vacuna">{{n.nombre_vacuna}}</td>
                <td ng-repeat="m in vacunas.dosis | filter : {id_vacuna:n.id_vacuna}:true" >{{m.nombre_dosis}} <br> <span ng-show="m.nombre_dosis"> {{m.meses | filterFecha}} </span></td> 
                <td>{{n.estado | estadoFilter}} </td>
                <td >{{n.observaciones}}</td>
                
                <?php
                    if($_SESSION['id_perfil'][0]['id_perfil']== 1){
                    ?>

                    <td ><a href="#editar_vacuna/{{n.id_vacuna}}"><i tittle="Editar" class='small mdi-content-create'></i></a><a href="#vacunas" ng-click="delVacuna(n.id_vacuna, $index)"><i tittle='Eliminar' class="small mdi-action-delete"></i></a>
                        </td>
                <?php
                    }
                ?>

              
            </tr>
        </tbody>
    </table>
    </div> 

    <div>
           <pagination
                    page="1"
                    page-size="elementos"
                    total="vacunas.vacunas.length"
                    show-prev-next="true"
                    dots="...."
                    hide-if-empty="false"
                    adjacent="2"
                    scroll-top="false"
                    pagination-action="changePage(page)" />
       </div>      
</div>
<style type="text/css">td   { text-align: center; } th  { text-align: center; }</style>
