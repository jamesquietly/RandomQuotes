$(document).ready(function() {
  var count = 0;
  $("#getQuote").on("click", function(e) {
      e.preventDefault();
      $.ajax( {
        url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
        success: function(data) {
          var post = data.shift(); // The data is an array of posts. Grab the first one.
          $('#quote-author').text("-- " + post.title);
          var content = post.content.replace(/<\/*p>/g, "");
          $('#quote-content').html('"' + $.trim(content) + '"');

          // If the Source is available, use it. Otherwise hide it.
          if (typeof post.custom_meta !== 'undefined' && typeof post.custom_meta.Source !== 'undefined') {
            var s = post.custom_meta.Source;
            var aIndex = s.indexOf(">");
            var source = s.slice(0, aIndex) + ' target="_blank"' + s.slice(aIndex, s.length);
            $('#quote-source').html('Source:' + source);
          } else {
            $('#quote-source').text('');
          }
        },
        cache: false
    });
  });
});