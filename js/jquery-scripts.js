(function ($){
  $(function(){ 
  
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 2000,
      values: [ 20, 1900 ],
      slide: function( event, ui ) {
        $( "#amount" ).val(ui.values[ 0 ] + " грн. - " + ui.values[ 1 ] + " грн." );
      }
    });
    $( "#amount" ).val($( "#slider-range" ).slider( "values", 0 ) +
      " грн. - " + $( "#slider-range" ).slider( "values", 1 ) +
      " грн." );



  })
}) (jQuery)