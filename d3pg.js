var init_code_editor = function() {
  var ed = ace.edit('code_editor');
  var JavaScriptMode = require("ace/mode/javascript").Mode;

  ed.getSession().setMode(new JavaScriptMode());
  ed.getSession().setTabSize(2);
  ed.getSession().setUseSoftTabs(true);

  var contents = localStorage['code'] || $('#default_code').text();
  ed.getSession().setValue(contents);

  return ed;
}

var init_css_editor = function() {
  var ed = ace.edit('css_editor');
  var CssMode = require("ace/mode/css").Mode;

  ed.getSession().setMode(new CssMode());
  ed.getSession().setTabSize(2);
  ed.getSession().setUseSoftTabs(true);

  var contents = localStorage['css'] || $('#default_css').text();
  ed.getSession().setValue(contents);

  return ed;
}

$('document').ready(function() {
  // Initialize editors.
  var code_editor = init_code_editor();
  var css_editor = init_css_editor();

  // This function executes the contents of the editors.
  var test = function() {
    $('#result').empty();
    var code = code_editor.getSession().getValue();
    var css = css_editor.getSession().getValue();

    $('#live_code').remove();
    $('#live_css').remove();

    $('body').append('<script id="live_code">'+code+'<\/script>');
    $('body').append('<style id="live_css">'+css+'<\/style>');

    $('#test_code').attr('disabled', 'true');
    $('#test_code').addClass('disabled');

    localStorage['code'] = code;
    localStorage['css'] = css;
  };

  // Run code, disable button, and save code, on button click.
  $('#test_code').click(test);

  // Re-enable button when the code has changed.
  code_editor.getSession().on('change', function() {
    $('#test_code').removeAttr('disabled');
    $('#test_code').removeClass('disabled');
  });
  css_editor.getSession().on('change', function() {
    $('#test_code').removeAttr('disabled');
    $('#test_code').removeClass('disabled');
  });
});
