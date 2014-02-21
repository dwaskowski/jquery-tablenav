# jQuery tableNav - v0.1.0 - 2014-02-21
# http://www.invetek.nl/?p=120
# https://github.com/invetek/jquery-tablenav
# Copyright (c) 2014 Loran Kloeze | Invetek
# Licensed MIT 
#

(($) ->
  $.fn.tableNav = () ->
    $tbody = $(this).find 'tbody'

    # Delete any previous event handlers
    $tbody.find('input:enabled').off('keydown.tablenav click.tablenav')

    # Determine the maxium x and y values for this table
    max_x = $tbody.find('tr:first-child').find('input:enabled').not(':hidden').length-1
    max_y = $tbody.find('tr').length-1

    # Loop through all the enabled input fields
    y = 0
    $tbody.find('tr').each ->
      x = 0
      $(this).find('input:enabled').not(':hidden').each ->
        $(this).on 'click.tablenav', -> $(this).select()
        $(this).attr('data-x', x).attr('data-y', y)
        $(this).on 'keydown.tablenav', (e) ->
          old_x = parseInt $(this).attr('data-x'), 10
          old_y = parseInt $(this).attr('data-y'), 10
          new_x = old_x
          new_y = old_y
          
          # Which key is pressed?
          switch e.which
            when 37 then new_x = old_x - 1 # Left arrow key
            when 38 then new_y = old_y - 1 # Up arrow key
            when 39 then new_x = old_x + 1 # Right arrow key
            when 40 then new_y = old_y + 1 # Down arrow key
            else return # Not an arrow key
          e.preventDefault()

          # Determine strategy when end or beginning of table has been reached
          new_x = if new_x < 0 then max_x else new_x
          new_x = if new_x > max_x then 0 else new_x
          new_y = if new_y < 0 then max_y else new_y
          new_y = if new_y > max_y then 0 else new_y

          # Click/select the 'new' cell
          $tbody.find('input[data-x='+new_x+'][data-y='+new_y+']').click()
        x++
      y++

    $(this)
) jQuery