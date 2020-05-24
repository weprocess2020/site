$(function () {
    jQuery.postOnCsv = function (data, options) {
        var _options = options || {}
        var onDone = _options.done || function (response) {}
        var onFail =
            _options.fail ||
            function (msg) {
                console.error(msg)
            }
        var onAlways = _options.always || function () {}
        onDone()
        return onAlways()
    }
})
// Exemple d'utilisation :
/*
<!doctype html>
<html>
  <body>
    <form>
      <input type="hidden" name="csv_name" value="inscription">
      <input type="hidden" name="fields" value="firstname,lastname,email">
      <label>Email <input type="email" name="email"></label>
      <label>Nom <input type="text" name="firstname"></label>
      <label>Prénom <input type="text" name="lastname"></label>
      <button type="submit">S'incrire</button>
    </form>
    <script src="/logics-media/vendors/js/jquery-1.12.5-pre.min.js"></script>
    <script src="/logics-media/commons/form.js"></script>
    <script>
      $('form').submit(function(event) {
        event.preventDefault();
        //$.postOnCsv($(this).serialize()); // sans callbacks
        $.postOnCsv($(this).serialize(), { // avec callbacks
          done: function(response) { alert('success'); },
          fail: function(message) { alert(message); },
          always: function() {},
        });
      });
    </script>
  </body>
</html>
*/
