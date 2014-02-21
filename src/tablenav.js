(function() {
  (function($) {
    return $.fn.tableNav = function() {
      var $tbody, max_x, max_y, y;
      $tbody = $(this).find('tbody');
      $tbody.find('input:enabled').off('keydown.tablenav click.tablenav');
      max_x = $tbody.find('tr:first-child').find('input:enabled').not(':hidden').length - 1;
      max_y = $tbody.find('tr').length - 1;
      y = 0;
      $tbody.find('tr').each(function() {
        var x;
        x = 0;
        $(this).find('input:enabled').not(':hidden').each(function() {
          $(this).on('click.tablenav', function() {
            return $(this).select();
          });
          $(this).attr('data-x', x).attr('data-y', y);
          $(this).on('keydown.tablenav', function(e) {
            var new_x, new_y, old_x, old_y;
            old_x = parseInt($(this).attr('data-x'), 10);
            old_y = parseInt($(this).attr('data-y'), 10);
            new_x = old_x;
            new_y = old_y;
            switch (e.which) {
              case 37:
                new_x = old_x - 1;
                break;
              case 38:
                new_y = old_y - 1;
                break;
              case 39:
                new_x = old_x + 1;
                break;
              case 40:
                new_y = old_y + 1;
                break;
              default:
                return;
            }
            e.preventDefault();
            new_x = new_x < 0 ? max_x : new_x;
            new_x = new_x > max_x ? 0 : new_x;
            new_y = new_y < 0 ? max_y : new_y;
            new_y = new_y > max_y ? 0 : new_y;
            return $tbody.find('input[data-x=' + new_x + '][data-y=' + new_y + ']').click();
          });
          return x++;
        });
        return y++;
      });
      return $(this);
    };
  })(jQuery);

}).call(this);
