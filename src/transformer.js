/*
Transformer
Version: 0.0.1
Author: Patrick Kearns
License: MIT

TODO:
-Add hooks for all transform types & CSS props.
create functionality for updating each.
-Add function to create CSS3 animations
-Add Matrix section
-Add SVG section
-Allow certain transforms to overwrite others,
ie let transform3d overwrite X/Y
-Update
-Update transform function to include easing
-Create jquery integration
-Clean up code
-Additional Tests
*/

function Transformer(el){
  if(el.nodeType === 1) {
    //element
    this.el = el;

    //identifiers
    this.id = el.id,
    this.classList = el.classList

    //DOM relations
    this.parent = el.parentNode;

    //style and transform properties
    this.style = el.style

    //Transformation Properties
    //Matrix
    this.matrix;
    this.matrix3d;
    //perspective
    this.perspective;
    //rotate
    this.rotate;
    this.rotate3d;
    this.rotateX;
    this.rotateY;
    this.rotateZ;
    //scale
    this.scale;
    this.scale3d;
    this.scaleX;
    this.scaleY;
    //skew
    this.skew;
    this.skewX;
    this.skewY;
    //translate
    this.translate;
    this.translate3d;
    this.translateX;
    this.translateY;
    this.translateZ;
  }

  else throw "Error: Must select a DOM Element"
}


/* -----------------------------------------------------------------------------------
Wraps CSS properties in an easy to use function to animate using transitions,
transforms, and other qualified css properties, allows callbacks

!TODO error handling

  Arguments:
    [CSS Property]: accepts animatable css properties (transform, opacity, height, etc.),
    transition: updates or sets elements transitions, can set individually or all,
    callback: callback function,
    delay: callback delay

Ex. Call:
  anim.animate({
    transform   : "perspective(100px) translate3d(10px, 10px, -100px) rotate(30deg)",
    transition  : "transform 1s, opacity 2s",
    opacity     : 0.3,
    callback    : shoutOut, - Fires callback
    delay       : 1000 - sets timeout on callback
  });
----------------------------------------------------------------------------------- */
Transformer.prototype.setStyle = function(arguments) {
  for(var property in arguments) {
    var currentProperty = arguments[property];
    //if transform throw
    if( property === 'transform') {
      throw "Error: Please use transform method instead"
    }
    //if transition throw
    else if( property === 'transition') {
      throw "Error: Please use transition method instead"
    }
    //sets other styles
    else {
      return this.style[property] = arguments[property]
    };
  }

  //fires callback if available
  if (arguments.callback) {
    delay = arguments.delay || 0
    setTimeout(arguments.callback, delay);
  }
}

/* ----------------------------------------------------------------------------
addTransition: add/update element transition css property.

!TODO create ability to update without overwrite

Arguments:
  transforms: string of css transform functions,

  overwrite: boolean, overwrite full transform property or update only
  what is called (default: true)

Ex. Call:
anim.transform("perspective(100px) translate3d(20px, 10px, -100px)", true)
---------------------------------------------------------------------------- */
Transformer.prototype.transition = function Transition(transitionTypes){
  if(typeof transitionTypes === "string") {
    return this.style.transition = transitionTypes;
  }
  else throw "Error: Incorrect argument format - 'transitionTypes' must be a string." ;
};

/* ----------------------------------------------------------------------------
transformation(s): Adds/Updates transform(s) on element.
TODO: implement easing
Arguments:
  Property: The type of transform to update
  Value: the value to pass as to the transform

Ex. Calls:
Transformer.transformation("translateX",300,"px")
---------------------------------------------------------------------------- */
Transformer.prototype.transform = function Transform(args,duration,callback) {

 //scope this and create function to be called with arguments
 var _$this = this;
 _$this.transition("transform " + duration/1000 + "s ease-out")
 var updateTransform = function (property,value) {
   //update the properties value stored in the current object
   _$this[property] = value;
   //the current transform css
   var currentTransform = _$this.el.style.transform;
   //the property to be replaced (ex. rotate(360deg))
   var replaceThisProp = new RegExp(property + "\\(.*?\\)","")
   //concatenates the new property
   var newProp = property + "(" + value + ")"
   //check if the element has a transform defined yet
   if(typeof currentTransform !== 'undefined') {
    // icheck to see the current transform contains the property passed, if so update it
     if(~currentTransform.indexOf(property)) {
        var newtransform = currentTransform.replace(replaceThisProp, newProp)
      }
      //if the property doesnt exist, add it to the list of existing transforms
      else {
        var newtransform = currentTransform+ " " + newProp
      }
      //set updated transform to element
      return _$this.style.transform = newtransform;
    }
    //if the element does not yet have a transform, set it
    else {
      return _$this.style.transform = newProp;
    }
  }
//if the args is an array of arrays, run updateTransform on each individual array,
 if(typeof args === 'object') {
   for(var property in args) {
       updateTransform(property,args[property])
   }
 }
 else throw "Error: invalid arugment in position 1"

  //if a callback is passed in to the function call it now, add slight easing between transforms
  if (typeof callback !== 'undefined') setTimeout(function(){callback()}, duration-duration/(duration/200));
}
/*
  Create User Defined Function on object
*/
Transformer.prototype.createUDF = Transformer.prototype.createUserDefinedFunction = function(fnName, fn) {
  if (typeof this[fnName] === 'undefined') {
    return this[fnName] = fn;
  }
  else {
    console.error("Warning: Function " + fnName + " is defined. Function saved as 'udf_" + fnName + "'");
    return this["udf_"+fnName] = fn;
  }
}
