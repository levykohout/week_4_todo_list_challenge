$(function(){
    getList();
    getCompletedList();
    $('#addNew').on('click',addTodo);
    $('#list').on('click','.save', updateTodo);
    $('#list').on('click','.delete', deleteTodo);
    $('#list').on('change', 'input[type=checkbox]',completeTodo);
    $('#completed').on('change', 'input[type=checkbox]', updateTodo); //enable completed task unfinished


});

function getList(){

    $.ajax({
        type:'GET',
        url:'/todo',
        success: displayList
    });
}

function displayList(lists){

    $('#list').empty();
    console.log(lists);
    lists.forEach(function(list){

        var $li= $('<li></li>');
        var $form =$('<form></form>');
        var $group=$('<div class="input-group input-group-lg "></div>');

        $group.append('<span class="input-group-addon"><input type="checkbox" class="complete btn btn-default checked" data-id="'+list.id+'"></input></span>');
        $group.append('<input type="text" class="form-control" name="task" value="'+list.task+'">');
        var $span=$('<span class="input-group-btn"></div>'); //bootstrap styling purposes
        $span.append('<button type="button" class="save btn btn-primary" data-id="'+list.id+'">Update</button>');
        $span.append('<button type="button" class="delete btn btn-primary" data-id="'+list.id+'">Delete</button>');
        $group.append($span);
        $form.append($group);
        $li.append($form);
        $('#list').append($li);

    });

}


function addTodo(){

    var task=$('#new_todo').val(); //captures new todo value
    var taskData={task:task};

    $.ajax({
        type:'POST',
        url:'/todo',
        data:taskData,
        success: getList
    });

    $('#new_todo').val(''); //empties the input field

}

function updateTodo(){

    var $button = $(this);
    var task = $button.closest('form').find('input[name="task"]').val();
    var completeStatus = $button.closest('form').find('.complete').is(":checked"); //checks if complete checkbox is checked

        if(completeStatus==true){

            completeStatus=!completeStatus; //sets complete status back to false after returning from completed task
        }

    var taskData = {task:task, complete: completeStatus};
    $.ajax({
        type:'PUT',
        url:'/todo/'+$(this).data('id'),
        data:taskData,
        success:function(){
            getList();
            getCompletedList();
        }

    });

}

function deleteTodo(){

    var reply = confirm('Are you sure you want to delete this task?');
    var $button = $(this);

        if (reply == true) {
            $.ajax({
                type:'DELETE',
                url:'/todo/'+$button.data('id'),
                success: getList
            });
        }
}

function completeTodo() {

    var $button = $(this);
    var task = $button.closest('form').find('input[name="task"]').val();
    var completeStatus = $button.closest('form').find('.complete').is(":checked"); //checks if complete checkbox is checked
    var taskData = {task:task, complete: completeStatus};

    $.ajax({
        type:'PUT',
        url:'/complete/'+$button.data('id'),
        data:taskData,
        success: function (){
            getCompletedList();
            getList();
        }
    });

}

function getCompletedList(){
    $.ajax({
        type:'GET',
        url:'/complete',
        success: displayCompletedList

    });
}

function displayCompletedList(lists){

    $('#completed').empty();
    console.log(lists);
    lists.forEach(function(list){

        var $li= $('<li></li>');
        var $form =$('<form></form>');
        var $group=$('<div class="input-group input-group-lg "></div>');

        $group.append('<span class="input-group-addon"><input type="checkbox" class="complete btn btn-default checked" data-id="'+list.id+'"></input></span>');
        $group.append('<input type="text" class="form-control completed" name="task" value="'+list.task+'">');
        $form.append($group);
        $li.append($form);

        $('#completed').append($li);
        $('#completed').find('input[type="checkbox"]').prop('checked',true); //dispalys a checked box


    });


}
