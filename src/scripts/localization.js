'use strict'

// ----------------------------------------------------------------------------

function t(key, params) {
  var s = chrome.i18n.getMessage(key, params)
  if (s == "") {
    throw "Missing string '" + key + "'.";
  }
  return s;
}


function o(key) {
  document.write(t(key));
}

// ----------------------------------------------------------------------------

function tE(id, key, attr, esc) {
  if (attr) {
    document.getElementById(id).setAttribute(attr, t(key));
  }
  else if (typeof esc == "undefined" || esc) {
    document.getElementById(id).appendChild(document.createTextNode(t(key)));
  }
  else {
    document.getElementById(id).innerHTML = t(key);
  }
}


// ----------------------------------------------------------------------------

function tHTML(html) {
  var node = document.createElement("div")
  node.innerHTML = html.replace(/>\s+</g, '><'); // spaces are removed; use &nbsp; for an explicit space
  tNodeList(node.querySelectorAll("*"));
  var child = node.removeChild(node.firstElementChild);
  node.remove();
  return child;
}


function tNodeList(nodes) {
  for (var n = 0; n < nodes.length; n++) {
    var node = nodes[n];

    if (node.nodeType != 1) { // not an ELEMENT_NODE
      continue;
    }

    if (node.localName == "template") {
      tNodeList(node.content.querySelectorAll("*"));
      template[node.dataset.id] = node.content.firstElementChild;
      continue;
    }

    for (var a = node.attributes.length - 1; a >= 0; a--) {
      var attr = node.attributes[a];
      var name = attr.nodeName;
      if (name.indexOf("i18n-") != 0) {
        continue;
      }
      name = name.substr(5); // "i18n-".length
      var value = t(attr.nodeValue);
      switch (name) {
        case "text":
          node.insertBefore(document.createTextNode(value), node.firstChild);
          break;
        case "html":
          node.insertAdjacentHTML("afterbegin", value);
          break;
        default:
          node.setAttribute(name, value);
      }
      node.removeAttributeNode(attr);
    }
  }
}


function tDocLoader() {
  // localize HEAD
  tNodeList(document.querySelectorAll("*"));

  // localize BODY
  var observer = new MutationObserver(function(mutations) {
    for (var m = 0; m < mutations.length; m++) {
      tNodeList(mutations[m].addedNodes);
    }
  });
  observer.observe(document, {subtree: true, childList: true});
  document.addEventListener("DOMContentLoaded", function() {
    observer.disconnect();
    tNodeList(document.querySelectorAll("*"));
  });
}

// tDocLoader();



// ------------------------------------------------------------

var template = {};


function i18niseAllNodes(root) {
  root = root || document.documentElement

  const nodes = (root.matches('[data-text]') ? [ root ] : [])
    .concat([ ...root.querySelectorAll('[data-text]') ])

  nodes.forEach(i18nise)

  return root
}


// ----------------------------------------------------------------------------

function i18nise(elem) {
  const key = elem && (elem.dataset.text || elem.dataset.placeholder)

  if (!key) {
    return
  }

  if (elem.dataset.textParams) {
    elem.textContent = chrome.i18n.getMessage(key, elem.dataset.textParams.split('|'))
    elem.removeAttribute('data-text-params')
  }
  else {
    elem.textContent = chrome.i18n.getMessage()
  }

  elem.removeAttribute('data-text')
}


// ----------------------------------------------------------------------------

const _templates = new Map()

document.addEventListener("DOMContentLoaded", function() {
  i18niseAllNodes()

  Array.from(document.querySelectorAll('template'), node => {
    _templates.set(node.dataset.id, i18niseAllNodes(node.content))
  })
})
