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
  title = 'Premier Kanban';
  addTask(){
    var taskNumber = $("span.task").length;
    var newTask = taskNumber + 1;
    $('#startTask').append("<span class='task' draggable='true' id='task"+ newTask + "'>Tâche " + newTask + "</span>").trigger('create');
    // Rebind
    this.dragndrop();
    this.editableSpan();
  };
  
  addPerson() {
    $('#kanban tr:last').after('<tr><td><span>Utilisateur</span></td><td></td><td></td><td></td><td></td></tr>').trigger('create');;
    // Rebind
    this.dragndrop();
    this.editableSpan();
  }

  dragndrop() {
    $('.task').on("dragstart", function (event) {
      $(this).css("background-color", "black");
      var dt = event.originalEvent.dataTransfer;
      dt.setData('Text', $(this).attr('id'));
    });
    $('table td').not("td:first-child").on("dragenter dragover drop", function (event) {	
      event.preventDefault();
      if (event.type === 'drop') {
        var data = event.originalEvent.dataTransfer.getData('Text', $(this).attr('id'));
        var taskState = $(this).closest('table').find('th').eq($(this).index())[0].innerHTML;
        switch (taskState) {
          case "En attente": $('#' + data).css("background-color", "gray");break;
          case "En cours": $('#' + data).css("background-color", "orange");break;
          case "Terminé": $('#' + data).css("background-color", "green");break;
          case "Livré": $('#' + data).css("background-color", "black");break;
        }
        var de = $('#' + data).detach();
        de.appendTo($(this));
      };
    });
  }

  editableSpan() {
    $('span').bind('dblclick',
    function(){
        $(this).attr('contentEditable',true);
        var oldBg = $(this).css("background-color");
        $(this).attr("oldBg", oldBg);
        $(this).css("background-color", "white");
        $(this).css("color", "black");
        
    }).blur(
      function() {
          $(this).attr('contentEditable', false);
          var oldBg = $(this).attr("oldBg");
          $(this).css("background-color", oldBg);
          $(this).css("color", "white");
      });;
  }

  ngOnInit() {
    this.dragndrop();
    this.editableSpan();
  }
}