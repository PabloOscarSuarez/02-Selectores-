var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];

      if (typeof startEl === "undefined") {
        startEl = document.body;
      }
  
      if (matchFunc(startEl)){
        resultSet.push(startEl);
      }
      if (startEl.children){
        for (var i=0 ; i<startEl.children.length; i++){
          resultSet = resultSet.concat(traverseDomAndCollectElements(matchFunc, startEl.children[i]));
        };
      };
  
  
    
  
  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  console.log(resultSet);
  
  return resultSet;

};
// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag


var selectorTypeMatcher = function(selector) {
  var copia = selector.slice();
  if(selector[0]=="#")return "id";
  else if(selector[0]==".")return "class";
  else if(copia.split(".").length==2)return "tag.class";
  else if (copia.split(".").length==1)return "tag";
  }

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function(selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") {
    matchFunction = function(elemento){
      var arrSelector = selector.split("#");
      return elemento.id && elemento.id==arrSelector[1];
    };
    // define matchFunction para id

  } else if (selectorType === "class") {
      matchFunction = function(elemento){
        var coin= false
        var arrSelector = selector.split(".")
        for (let index = 0; index < elemento.classList.length && coin===false; index++) {
          if (elemento.classList[index]==arrSelector[1]) {
            coin =true
            return coin
          }
          
        }
        return coin 

        };
    //     selector
    //     var arrSelector = selector.split(".");
    //     return elemento.className && elemento.className==arrSelector[1];
    // };

  } else if (selectorType === "tag.class") {
    matchFunction = function(){};
    var arrTagClass= selector.split(".")
    var newClass = "."+arrTagClass[1];
    console.log(arrTagClass[0] + " " + newClass)
    return matchFunctionMaker(arrTagClass[0]) && matchFunctionMaker(newClass)

    // define matchFunction para tag.class
  } else if (selectorType === "tag") {
    matchFunction = function(elemento){ 
      return elemento.tagName && elemento.tagName.toLowerCase()==selector.toLowerCase();
    };


  }
  return matchFunction;
};

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};