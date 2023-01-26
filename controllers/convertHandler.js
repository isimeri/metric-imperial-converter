function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    // const regex = /^\d*/;
    const regex = /(^\d*(?:\.\d+)?)(?:\/(\d+(?:\.\d+)?))?(?:[a-zA-Z]*)$/i;    //la chestii precum 5kh sau 2.1uoi, nu matchueste nici numarul
    result = input.match(regex);
    if(result && result[1] && result[2] && result[2] !== 0){
      return Number(result[1]) / Number(result[2]);
    } else if(result && result[1] && !result[2]){
      return Number(result[1]);
    } else if(result && result[1] === ''){
      return 1;
    } else return 'invalid number';
  };
  
  this.getUnit = function(input) {
    let result;
    const regex = /\d*(km|mi|gal|L|kg|lbs)$/i;
    result = input.match(regex)
    // console.log(result);
    if(result && result[1])
      return result[1].toLowerCase();
    else return "invalid unit";
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch(initUnit){
      
      case "mi":
        result = 'km';
        break;
      case "km":
        result = 'mi';
        break;
      case "lbs":
        result = 'kg';
        break;
      case "kg":
        result = 'lbs';
        break;
      case "gal":
        result = 'L';
        break;
      case "L":
        result = 'gal';
        break;
      default:
        result = 'bruh';
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch(unit){
      
      case "mi":
        result = 'miles';
        break;
      case "km":
        result = 'kilometers';
        break;
      case "lbs":
        result = 'pounds';
        break;
      case "kg":
        result = 'kilograms';
        break;
      case "gal":
        result = 'gallons';
        break;
      case "L":
        result = 'liters';
        break;
      default:
        result = 'bruh';
    }
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    if(initNum === 'invalid number'){
      return 'invalid number';
    }
    switch(initUnit){
      
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "gal":
        result = initNum * galToL;
        break;
      case "L":
        result = initNum / galToL;
        break;
      default:
        result = -1;
    }
    return result.toFixed(5);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    if(initNum === 'invalid number' && initUnit === 'invalid unit'){
      console.log('invalid u and n');
      return 'invalid number and unit';
    } else if(initUnit === "invalid unit"){
      console.log('invalid u');
      return "invalid unit";
    } else if(initNum === 'invalid number'){
      console.log("invalid n");
      return 'invalid number'
    }
    let longInitUnit = this.spellOutUnit(initUnit);
    let longReturnUnit = this.spellOutUnit(returnUnit)
    let result = `${initNum} ${longInitUnit} converts to ${returnNum} ${longReturnUnit}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
