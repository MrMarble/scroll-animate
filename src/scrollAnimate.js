(function (window) {
  var assets = [];
  var parent;
  var latestFrame;
  var context;
  var scroll = {
    start: 0,
    length: 100,
  };

  var _log = function (msg) {
    console.error(msg);
  };

  var _map = function (n, start1, stop1, start2, stop2) {
    var newVal = ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
    return Math.floor(Math.max(Math.min(newVal, stop2), start2));
  };

  var _pad = function (character, num, size) {
    var s = '' + num;
    var c = character || '0';
    while (s.length < size) s = c + s;
    return s;
  };

  var _downloadAssets = function (routes, onAllLoaded) {
    var i;
    var img;
    var numLoading = routes.length;
    var onload = function () {
      --numLoading === 0 && onAllLoaded();
    };
    var images = [];
    for (i = 0; i < routes.length; i++) {
      img = (images[i] = new Image());
      img.src = routes[i];
      img.onload = onload;
    }
    return images;
  };

  var _generateAssetsUrl = function (path, prefix, extension, count, pad) {
    var routes = [];
    var padString = '';
    var assetNumber;
    if (path.split('')[path.length - 1] !== '/') {
      path += '/';
    }
    if (extension.indexOf('.') !== 0) {
      extension = '.' + extension;
    }
    if (typeof pad === 'string') {
      padString = pad.substr(0, 1);
    }
    for (assetNumber = 0; assetNumber < count; assetNumber++) {
      routes.push(path + prefix + _pad(padString, assetNumber, pad.length) + extension);
    }
    return routes;
  };

  var _createCanvas = function (width, height) {
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    parent.appendChild(canvas);
    return canvas.getContext('2d');
  };

  var _animationFrame = function () {
    var frame = _map(window.scrollY, scroll.start, scroll.length, 0, assets.length - 1);
    if (frame !== latestFrame) {
      latestFrame = frame;
      context.drawImage(assets[latestFrame], 0, 0);
    }
    window.requestAnimationFrame(_animationFrame);
  };

  var _animationStart = function () {
    context = _createCanvas(assets[0].width, assets[0].height);
    window.requestAnimationFrame(_animationFrame);
  };

  var init = function (params) {
    if (typeof params === 'undefined') {
      _log('Invalid Settings!', 'An object must be passsed.');
      return;
    }
    if (typeof params.parent === 'string') {
      parent = document.querySelector(params.parent);
    } else {
      parent = params.parent;
    }
    if (!parent || parent.length <= 0) {
      _log('Parent element not found!');
      return;
    }
    if (typeof params.scroll !== 'object') {
      _log('Invalid scroll argument!', 'scroll must be {start, length}');
      return;
    }
    scroll.start = params.scroll.start;
    scroll.length = scroll.start + params.scroll.length;

    if (Array.isArray(params.frames)) {
      assets = _downloadAssets(params.frames, _animationStart);
    } else if (typeof params.frames === 'object') {
      assets = _downloadAssets(_generateAssetsUrl(params.frames.path, params.frames.prefix,
        params.frames.extension, params.frames.amount,
        params.frames.pad ? params.frames.pad : false), _animationStart);
    } else {
      _log('Invalid frames argument!', 'frames must be of type array or object.');
    }
  };

  // eslint-disable-next-line dot-notation
  if (typeof window['scrollAnimate'] === 'undefined') {
  // eslint-disable-next-line dot-notation
    window['scrollAnimate'] = init;
  }
}(window));
