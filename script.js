window.onload = function () {
  startInit();
}

var penColour = 'rgb(199, 23, 23)';
var matrixRows = 16;
var matrixCollumns = 64;
var matrix = [];
var dataResult;
var dataResultForMCU;

function startInit() {
  console.log("startInit()");

  for (var i = 0; i < matrixRows; i++) {
    matrix[i] = [];
    for (var j = 0; j < matrixCollumns; j++) {
      matrix[i][j] = 0;
    }
  }
  //console.log(matrix);

  var art = document.getElementById('art');

  for(var i = 0; i < matrixRows; i++)
  {
    tr = document.createElement('div');
    tr.setAttribute('class', 'row');
    for(var j = 0; j < matrixCollumns; j++)
    {
      tc = document.createElement('div');
      tc.setAttribute('class', 'pixel');
      tc.setAttribute('onclick', 'setPixelColour(this)');
      tr.appendChild(tc);
    }
    art.appendChild(tr);
  }
}

function setPenColour(pen) {
  penColour = pen;
}

function setPixelColour(pixel) {
  pixel.style.backgroundColor = penColour;
  var xPos = $(pixel).index();
  var yPos = $(pixel).parent().index();
  
  // alert("Cell index is: " + $(pixel).index() + "\nRow index is: " + $(pixel).parent().index());
  //console.log("Cell index is: " + xPos + "\nRow index is: " + yPos);

  if (penColour == 'rgb(199, 23, 23)') {
    matrix[yPos][xPos] = 1;
  }
  else {
    matrix[yPos][xPos] = 0;
  }

  //console.log("Add pixel");
  //console.log(matrix);
  // for (var i = 0; i < matrix.length; i++) {
  //   for (var z = 0; z < matrix[i].length; z++) {
  //     console.log(matrix);
  //   }
  // }
}

function buttonClick()
{
  dataResult = '';
  dataResultForMCU = '{';
  var buf;
  for(var i = 0; i<matrixCollumns; i++ )
  {
    buf = '';
    for (var j = 7; j >= 0; j--)
    {
      buf += matrix[j][i].toString();
    }
    dataResultForMCU += '0x';
    // console.log(buf);
    // console.log(parseInt(buf, 2).toString(16));
    if(parseInt(buf,2) <= 0xF)
    {
      dataResult +=0;
      dataResultForMCU +=0;
    }
    dataResult += parseInt(buf, 2).toString(16);

    dataResultForMCU += parseInt(buf, 2).toString(16);
    dataResultForMCU += ',';
  }

  for(var i = 0; i<matrixCollumns; i++ )
  {
    buf = '';
    for (var j = 15; j >= 8; j--)
    {
      buf += matrix[j][i].toString();
    }
    
    // console.log(buf);
    // console.log(parseInt(buf, 2).toString(16));
    dataResultForMCU += '0x';
    if(parseInt(buf,2) <= 0xF)
    {
      dataResult +=0;
      dataResultForMCU +=0;
    }
    dataResult += parseInt(buf, 2).toString(16);

    dataResultForMCU += parseInt(buf, 2).toString(16);
    dataResultForMCU += ',';
  }

  dataResultForMCU += '}';

  writeData();
  //console.log(dataResult);
  //console.log(dataResultForMCU);
}

function writeData()
{
  document.getElementById("myText").value  = dataResultForMCU;
  //alert(dataResultForMCU);
}


$(function() {
  var d = function() {};
  $(document).delegate(".b-ball_bounce", "mouseenter", function() {
    b(this);
    m(this)
  }).delegate(".b-ball_bounce .b-ball__right", "mouseenter", function(i) {
    i.stopPropagation();
    b(this);
    m(this)
  });

  function f() {
    var i = "ny2012.swf";
    i = i + "?nc=" + (new Date().getTime());
    swfobject.embedSWF(i, "z-audio__player", "1", "1", "9.0.0", null, {}, {
      allowScriptAccess: "always",
      hasPriority: "true"
    })
  }

  function h(i) {
    if ($.browser.msie) {
      return window[i]
    } else {
      return document[i]
    }
  }
  window.flashInited = function() {
    d = function(j) {
      try {
        h("z-audio__player").playSound(j)
      } catch (i) {}
    }
  };
  if (window.swfobject) {
    window.setTimeout(function() {
      $("body").append('<div class="g-invisible"><div id="z-audio__player"></div></div>');
      f()
    }, 100)
  }
  var l = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "\\"];
  var k = ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"];
  var g = 36;
  var a = {};
  for (var e = 0, c = l.length; e < c; e++) {
    a[l[e].charCodeAt(0)] = e
  }
  for (var e = 0, c = k.length; e < c; e++) {
    a[k[e].charCodeAt(0)] = e
  }
  $(document).keypress(function(j) {
    var i = $(j.target);
    if (!i.is("input") && j.which in a) {
      d(a[j.which])
    }
  });

  function b(n) {
    if (n.className.indexOf("b-ball__right") > -1) {
      n = n.parentNode
    }
    var i = /b-ball_n(\d+)/.exec(n.className);
    var j = /b-head-decor__inner_n(\d+)/.exec(n.parentNode.className);
    if (i && j) {
      i = parseInt(i[1], 10) - 1;
      j = parseInt(j[1], 10) - 1;
      d((i + j * 9) % g)
    }
  }

  function m(j) {
    var i = $(j);
    if (j.className.indexOf(" bounce") > -1) {
      return
    }
    i.addClass("bounce");

    function n() {
      i.removeClass("bounce").addClass("bounce1");

      function o() {
        i.removeClass("bounce1").addClass("bounce2");

        function p() {
          i.removeClass("bounce2").addClass("bounce3");

          function q() {
            i.removeClass("bounce3")
          }
          setTimeout(q, 300)
        }
        setTimeout(p, 300)
      }
      setTimeout(o, 300)
    }
    setTimeout(n, 300)
  }
});