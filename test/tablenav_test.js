/*!
 * jQuery TableNav Plugin Test Suite
 * https://github.com/invetek/jquery-tablenav
 *
 * Copyright 2014 Loran Kloeze - Invetek
 * Released under the MIT license
 */
 
 (function($){
        /*
	 *  Helper functions
	 * 
	 */
        
        function create_table_fixture(){
            var $table = $('<table/>').attr('id', 'table-fixture');
            var $thead = $('<thead/>');
            var $tbody = $('<tbody/>');
            
            $thead.append('<tr><th>A</th><th>B</th><th>C</th></tr>');
            
            
            for (var i=0;i<10;i++) {
                $tbody.append('<tr><td><input/></td><td><input/></td><td><input/></td></tr>');
            }            
            $table.append($thead).append($tbody);
            $('#qunit-fixture').append($table);
            return $table;
            
        }
	/*
	 *  Initialize QUnit
	 * 
	 */
	QUnit.begin(function(){
            $.fx.off = true;
	});

	/*
	 *  Standard jQuery plugin tests
	 * 
	 */
	module("Standard jQuery plugin tests");
	test("return value", function(){
            expect(1); 
            var $table = create_table_fixture();
            ok(typeof $table.tableNav() === 'object'); 
	});
        
        /*
	 *  Plugin specific tests
	 * 
	 */
	module("Plugin specific tests");
	test("x and y values", function(){
            expect(4); 
            var $table = create_table_fixture();
            $table.tableNav();
            var $input_first = $table.find('tbody tr:first-child td:first-child input');
            var $input_last = $table.find('tbody tr:last-child td:last-child input');
            equal($input_first.attr('data-x'), 0);
            equal($input_first.attr('data-y'), 0);
            equal($input_last.attr('data-x'), 2);
            equal($input_last.attr('data-y'), 9);            
	});
        
        test("disabled inputs are not counted for x and y", function(){
            expect(4); 
            var $table = create_table_fixture();            
            $table.find('tbody tr td:last-child input').attr('disabled', true);
            $table.tableNav();
            var $input_first = $table.find('tbody tr:first-child td:first-child input');
            var $input_last = $table.find('tbody tr:last-child td:last-child input');
            equal($input_first.attr('data-x'), 0);
            equal($input_first.attr('data-y'), 0);
            equal($input_last.attr('data-x'), undefined);
            equal($input_last.attr('data-y'), undefined);            
	});
        
        test("arrow keys are selecting the next input in the table", function(){
            expect(16);
            var $table = create_table_fixture();
            $table.tableNav();
            var e = $.Event('keydown');
            var prev_pos = {x: null, y: null};
            var exp_pos = {x: null, y: null};
            $table.find('input').on('select', function(){
                equal($(this).attr('data-x'), exp_pos.x);
                equal($(this).attr('data-y'), exp_pos.y);
            });            
            
            //Right normal
            e.which = 39; //Right arrow              
            prev_pos = {x: 0, y: 0};
            exp_pos = {x: 1, y: 0};
            $table.find('input[data-x='+prev_pos.x+'][data-y='+prev_pos.y+']').trigger(e);
            
            //Left normal
            e.which = 37; //Left arrow
            prev_pos = {x: 2, y: 1};
            exp_pos = {x: 1, y: 1};
            $table.find('input[data-x='+prev_pos.x+'][data-y='+prev_pos.y+']').trigger(e);
            
            //Up normal
            e.which = 38; //Up arrow
            prev_pos = {x: 2, y: 2};
            exp_pos = {x: 2, y: 1};
            $table.find('input[data-x='+prev_pos.x+'][data-y='+prev_pos.y+']').trigger(e);
            
            //Down normal
            e.which = 40; //Down arrow 
            prev_pos = {x: 2, y: 1};
            exp_pos = {x: 2, y: 2};
            $table.find('input[data-x='+prev_pos.x+'][data-y='+prev_pos.y+']').trigger(e);
            
            //Right, reaching the end
            e.which = 39; //Right arrow  
            prev_pos = {x: 2, y: 1};
            exp_pos = {x: 0, y: 1};
            $table.find('input[data-x='+prev_pos.x+'][data-y='+prev_pos.y+']').trigger(e);
            
            //Left, reaching the beginning
            e.which = 37; //Left arrow  
            prev_pos = {x: 0, y: 1};
            exp_pos = {x: 2, y: 1};
            $table.find('input[data-x='+prev_pos.x+'][data-y='+prev_pos.y+']').trigger(e);
            
            //Up, reaching the beginning
            e.which = 38; //Up arrow
            prev_pos = {x: 2, y: 0};
            exp_pos = {x: 2, y: 9};
            $table.find('input[data-x='+prev_pos.x+'][data-y='+prev_pos.y+']').trigger(e);
            
            //Down, reaching the end
            e.which = 40; //Down arrow 
            prev_pos = {x: 2, y: 9};
            exp_pos = {x: 2, y: 0};
            $table.find('input[data-x='+prev_pos.x+'][data-y='+prev_pos.y+']').trigger(e);
            
        });
                
    
 })(jQuery);
 
 



