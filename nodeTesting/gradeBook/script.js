
var button = document.getElementById('button');
var counter = document.getElementById('counter');

counter.innerText = 1;

button.addEventListener('mousemove', function() {
  counter.innerText++;
});






var test = document.getElementsByClassName("test");

test[0].addEventListener('click', function() {
  test[0].style.backgroundColor = 'black';
});

test[1].addEventListener('click', function() {
  test[1].style.backgroundColor = 'black';
});





var pieces = document.getElementsByClassName('piece');

function addCheckerboardEventListener(piece) {
  piece.addEventListener('mouseover', function() {
    piece.style.backgroundColor = 'black';
  });
}

for (var i = 0; i < pieces.length; i++) {
  var piece = pieces[i];
  addCheckerboardEventListener(piece);
}


