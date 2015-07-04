<?php 
require_once 'header.php';
?>

<script>
var results = {"data":[{"id":"1","email":"bmiloshev@tarasoft.bg","password":"a8f5f167f44f4964e6c998dee827110c","username":"bmiloshev","date_entered":"2015-07-04 12:00:00"},{"id":"2","email":"petreliyski@tarasoft.bg","password":"a8f5f167f44f4964e6c998dee827110c","username":"vasko","date_entered":"2015-07-04 00:00:00"},{"id":"3","email":"buglow@tarasoft.bg","password":"a8f5f167f44f4964e6c998dee827110c","username":"buglow","date_entered":"2015-07-04 00:00:00"},{"id":"4","email":"djamal@tarasoft.bg","password":"a8f5f167f44f4964e6c998dee827110c","username":"djamal","date_entered":"2015-07-04 00:00:00"},{"id":"5","email":"krasi@tarasoft.bg","password":"a8f5f167f44f4964e6c998dee827110c","username":"krasi","date_entered":"2015-07-04 00:00:00"},{"id":"6","email":"vitozev@tarasoft.bg","password":"a8f5f167f44f4964e6c998dee827110c","username":"vitozev","date_entered":"2015-07-04 00:00:00"},{"id":"11","email":"bmiloshev@tarasoft.bg","password":"a8f5f167f44f4964e6c998dee827110c","username":"bmiloshev","date_entered":"2015-07-04 12:00:00"},{"id":"21","email":"petreliyski@tarasoft.bg","password":"a8f5f167f44f4964e6c998dee827110c","username":"vasko","date_entered":"2015-07-04 00:00:00"},{"id":"62","email":"dsadsada","password":"32132123","username":"32131231","date_entered":"2011-11-11 00:00:00"},{"id":"41","email":"djamal@tarasoft.bg","password":"a8f5f167f44f4964e6c998dee827110c","username":"djamal","date_entered":"2015-07-04 00:00:00"},{"id":"51","email":"krasi@tarasoft.bg","password":"a8f5f167f44f4964e6c998dee827110c","username":"krasi","date_entered":"2015-07-04 00:00:00"},{"id":"61","email":"vitozev@tarasoft.bg","password":"a8f5f167f44f4964e6c998dee827110c","username":"vitozev","date_entered":"2015-07-04 00:00:00"},{"id":"63","email":"dsadsada","password":"32132123","username":"32131231","date_entered":"2011-11-11 00:00:00"},{"id":"64","email":"dsadsada","password":"32132123","username":"32131231","date_entered":"2011-11-11 00:00:00"},{"id":"65","email":"dsadsada","password":"32132123","username":"32131231","date_entered":"2011-11-11 00:00:00"},{"id":"66","email":"dsadsada","password":"32132123","username":"32131231","date_entered":"2011-11-11 00:00:00"},{"id":"67","email":"dsadsada","password":"32132123","username":"32131231","date_entered":"2011-11-11 00:00:00"},{"id":"68","email":"dsadsada","password":"32132123","username":"32131231","date_entered":"2011-11-11 00:00:00"},{"id":"69","email":"dsadsada","password":"32132123","username":"32131231","date_entered":"2011-11-11 00:00:00"},{"id":"70","email":"dsadsada","password":"32132123","username":"32131231","date_entered":"2011-11-11 00:00:00"},{"id":"71","email":"dsadsada","password":"32132123","username":"32131231","date_entered":"2011-11-11 00:00:00"},{"id":"72","email":"dsadsada","password":"32132123","username":"32131231","date_entered":"2011-11-11 00:00:00"},{"id":"73","email":"dsadsada","password":"32132123","username":"32131231","date_entered":"2011-11-11 00:00:00"},{"id":"74","email":"dsadsada","password":"32132123","username":"32131231","date_entered":"2011-11-11 00:00:00"},{"id":"75","email":"dsadsada","password":"32132123","username":"32131231","date_entered":"2011-11-11 00:00:00"}]}

$(document).ready(function() {
	
	$.each(results.data, function(key, val) {				
    	$('<tr>'+
              '<td>'+val.id+'</td>'+
                '<td>'+val.username+'</td>'+
                '<td><img width="50" src="/" alt="" /></td>'+                                                
                '<td>'+
                '<a href="/admin/edit_user.php?id='+val.id+'" class="left"><img src="/resources/images/edit_icon.png" width="20" alt="Edit" /></a>'+
                '<a class="left" onclick="javascript:return confirm(\'Сигурни ли сте че искате да изтриете тази страница?\');" href="/admin/delete_user.php?id='+val.id+'"><img width="20" style="margin-right:5px;" alt="Delete" src="/resources/images/delete_icon.png" /></a>'+
                '</td>'+
            '</tr>').appendTo('#list_users');           
	});
});

</script>

<div class="row">
    <div class="col-xs-12">
        <div class="box">
            <div class="box-header">
                <h3 class="box-title">Списък със статии</h3>
                <div style="float:right;" class="mr10 mt10">
                    <a href="/admin/add_user.php" class="btn btn-primary" style="color:#fff;">Добавяне на user</a>
                </div>
            </div>
            <div class="box-body table-responsive no-padding">
                <table class="table table-hover" id="list_users">
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Снимка</th>                    
                        <th>Опции</th>
                    </tr>                                                                               
                </table>                
            </div>
        </div>
    </div>
</div>
 -->
<?php 


include_once 'footer.php';
?>


