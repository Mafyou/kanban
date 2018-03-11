import { Component, OnInit, ViewEncapsulation } from '@angular/core';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None // To apply style on the fly
})
export class AppComponent implements OnInit {
  title = 'my First Kanban';
  addTask(){
    var taskNumber = $("span.task").length;
    var newTask = taskNumber + 1;
    $('#startTask').append("<span class='task' draggable='true' id='task"+ newTask + "'>Task " + newTask + "</span>").trigger('create');
    // Rebind
    this.dragndrop();
    this.editableSpan();
  };
  
  addPerson() {
    $('#kanban tr:last').after('<tr><td><span>MyUser</span></td><td></td><td></td><td></td><td></td></tr>').trigger('create');;
    // Rebind
    this.dragndrop();
    this.editableSpan();
  }

  dragndrop() {
    $('.task').on("dragstart", function (event) {
      var dt = event.originalEvent.dataTransfer;
      dt.setData('Text', $(this).attr('id'));
    });
    $('table td').on("dragenter dragover drop", function (event) {	
      event.preventDefault();
      if (event.type === 'drop') {
        var data = event.originalEvent.dataTransfer.getData('Text', $(this).attr('id'));
        var de = $('#'+data).detach();
        de.appendTo($(this));	
      };
    });
  }

  editableSpan() {
    $('span').bind('dblclick',
    function(){
        $(this).attr('contentEditable',true);
    }).blur(
      function() {
          $(this).attr('contentEditable', false);
      });;
  }

  ngOnInit() {
    this.dragndrop();
    this.editableSpan();
  }
}