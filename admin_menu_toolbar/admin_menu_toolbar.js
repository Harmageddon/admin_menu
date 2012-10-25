(function($) {

Drupal.admin = Drupal.admin || {};
Drupal.admin.behaviors = Drupal.admin.behaviors || {};

/**
 * @ingroup admin_behaviors
 * @{
 */

/**
 * Apply active trail highlighting based on current path.
 *
 * @todo Not limited to toolbar; move into core?
 */
Drupal.admin.behaviors.toolbarActiveTrail = function (context, settings, $adminMenu) {
  if (settings.admin_menu.toolbar && settings.admin_menu.toolbar.activeTrail) {
    $adminMenu.find('> div > ul > li > a[href="' + settings.admin_menu.toolbar.activeTrail + '"]').addClass('active-trail');
  }
};

/**
 * Toggles the shortcuts bar.
 */
Drupal.admin.behaviors.shortcutToggle = function (context, settings, $adminMenu) {
  var $shortcuts = $adminMenu.find('.shortcut-toolbar');
  if (!$shortcuts.length) {
    return;
  }
  var storage = window.localStorage || false;
  var storageKey = 'Drupal.admin_menu.shortcut';
  var $body = $(context).find('body');
  var $toggle = $adminMenu.find('.shortcut-toggle');
  $toggle.click(function () {
    var enable = !$shortcuts.hasClass('active');
    $shortcuts.toggleClass('active', enable);
    $toggle.toggleClass('active', enable);
    if (settings.admin_menu.margin_top) {
      $body.toggleClass('admin-menu-with-shortcuts', enable);
    }
    // Persist toggle state across requests.
    storage && enable ? storage.setItem(storageKey, 1) : storage.removeItem(storageKey);
    this.blur();
    return false;
  });

  if (!storage || storage.getItem(storageKey)) {
    $toggle.trigger('click');
  }
};

/**
 * Toggles the toolbar.
 */
Drupal.admin.behaviors.toolbarToggle = function (context, settings, $adminMenu) {
  if (!$adminMenu.length) {
    return;
  }
  var storage = window.localStorage || false;
  var storageKey = 'Drupal.admin_menu.hideToolbar';
  var $body = $(context).find('body');
  var $toggle = $adminMenu.find('.toolbar-toggle');
  $toggle.click(function (event, loading) {
    var hide = $body.hasClass('admin-menu');
    if(hide) {
      if(loading) {
        $adminMenu.hide();
      }
      else {
        $adminMenu.hide('slide', {direction: "up"});
      }
      var $toggleClosed = $toggle.clone(true);
      $toggleClosed.toggleClass('closed', true);
      $toggleClosed.attr('title', Drupal.t('Show'));
      $toggleClosed.appendTo($body);
    }
    else {
      $adminMenu.show('slide', {direction: "up"});
      $(this).remove();
    }
    $body.toggleClass('admin-menu', !hide);
    // Persist toggle state across requests.
    storage && hide ? storage.setItem(storageKey, 1) : storage.removeItem(storageKey);
    return false;
  });

  if (!storage || storage.getItem(storageKey)) {
    $toggle.trigger('click', true);
  }
};

/**
 * @} End of "ingroup admin_behaviors".
 */

})(jQuery);
