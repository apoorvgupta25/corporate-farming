import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

$(function() {

    $(".btn").on("click", function() {

      $('.btn-group').on('click', '.btn', function() {
        $(this).addClass('active').siblings().removeClass('active');
      });
      //hide all sections
      $(".content-section").hide();
      //show the section depending on which button was clicked
      $("#" + $(this).attr("data-section")).show();
    });

});