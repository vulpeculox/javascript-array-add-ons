// In-situ array modification by value
// Hacking Array.prototype


// append(Value)
// Same as .push() but only if not in subject already
// Returns true if added
//----------------------------------------------------
Object.defineProperty(Array.prototype, 'append', {
  enumerable: false,
  value: function(Value){
    if(this.includes(Value)===false){
      this.push(Value);
      return true;
    }else{
      return false;
    }  
  }
});


// concatExtra(AnArray)
// Add elements of AnArray to end of subject, but only 
//  if they don't appear already in the subject
// Return changed subject
// Note:  If AnArray isn't an array then whatever it is
//  will be .append()-ed
//----------------------------------------------------
Object.defineProperty(Array.prototype, 'concatExtra', {
  enumerable: false,
  value: function(AnArray){
    var a = Array.isArray(AnArray) ? AnArray : [AnArray];
    a.forEach(function(A){
      this.append(A);
    },this);
    return this;
  }
});


// remove(Value|FilterFunction)
// Return changed subject
//----------------------------------------------------
Object.defineProperty(Array.prototype, 'remove', {
  enumerable: false,
  value: function(ValueOrFilter){
    var ix;
    if(typeof ValueOrFilter == 'function'){
      ix = this.length - 1;
      while(ix>=0){
        if(ValueOrFilter(this[ix])){
          this.splice(ix,1);
        }  
        ix--;
      }
    }else{  
      ix = this.indexOf(ValueOrFilter);
      if(ix > -1){
        this.splice(ix,1);
      }
    }
    return this;
  }
});

// unconcat(AnArray)
// weed array of values from the subject that appear in the argument
// Return changed subject.
// Note:  If AnArray isn't an array then it will be .remove()-ed
//----------------------------------------------------
Object.defineProperty(Array.prototype, 'unconcat', {
  enumerable: false,
  value: function(AnArray){
    var a = Array.isArray(AnArray) ? AnArray : [AnArray];
    a.forEach(function(A){
      this.remove(A);
    },this);
    return this;
  }
});



// substitute(OldValue,NewValue)
// Return boolean for success
//----------------------------------------------------
Object.defineProperty(Array.prototype, 'substitute', {
  enumerable: false,
  value: function(OldValue,NewValue){
    var ix = this.indexOf(OldValue);
    if(ix > -1){
      this.splice(ix,1,NewValue);
      return true;
    }else{
      return false;
    }
  }
});


// insert(Value,After|SortFun,Before Flag)
// Return boolean for success
//----------------------------------------------------
Object.defineProperty(Array.prototype, 'insert', {
  enumerable: false,
  value: function(Value,AfterOrMatch,Before){
    var ix;
    if(typeof AfterOrMatch == 'function'){
      ix = this.findIndex(AfterOrMatch);
    }else{    
      ix = this.indexOf(AfterOrMatch);
    }
    if(ix > -1){
      if(Before){ix--;}
      this.splice(ix+1,0,Value);
      return true;
    }else{
      return false;
    }
  }    
});

// intersection(AnArray)
// Return an array of elements appearing in both.
// The order follows the order of the subject array
//----------------------------------------------------
Object.defineProperty(Array.prototype, 'intersection', {
  enumerable: false,
  value: function(AnArray){
    var rv = [];
    this.forEach(function(V){
      if(AnArray.includes(V)){
        rv.push(V);
      }
    });
    return rv;
  }
});
  
  
// missingFrom(AnArray)
// Return an array of elements appearing this array
//  but not the argument
// The order follows the order of the subject array
//----------------------------------------------------
Object.defineProperty(Array.prototype, 'missingFrom', {
  enumerable: false,
  value: function(AnArray){
    var rv = [];
    this.forEach(function(V){
      if(!AnArray.includes(V)){
        rv.push(V);
      }
    });
    return rv;
  }
});
  
  

// deduplicate in-situ  
//----------------------------------------------------
Object.defineProperty(Array.prototype, 'deduplicate', {
  enumerable: false,
  value: function(){
    var i = 0;
    while(i < this.length){
      var el = this[i];
      while(true){
        var f = this.indexOf(el,i+1);
        if(f == -1){break;}
        this.splice(f,1);
      }
      i++;
    }
    return this;
  }
});
  
          
// sort in-situ according to a given index or name
// If elements are arrays then provide a numeric index
// If elements are objects then give name of field 
//----------------------------------------------------- 
Object.defineProperty(Array.prototype, 'sortOnData', {
  enumerable: false,
  value: function(IxOrName){
    this.sort(function(A,B){
      if(A[IxOrName]<B[IxOrName]){
        return -1;
      }else{
        if(A[IxOrName]>B[IxOrName]){
          return 1;
        }else{
          return 0;
        }
      }
    });
  } 
});

    
    
