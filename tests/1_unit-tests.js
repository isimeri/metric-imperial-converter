const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite("sugondese", function(){
    suite("getNum", function(){
        test("should correctly read a whole number input.", function(){
            let result = convertHandler.getNum("4km");
            assert.equal(result, 4);
        });
        test("should correctly read a decimal number input.", function(){
            let result = convertHandler.getNum("4.5km");
            assert.equal(result, 4.5);
        });
        test("should correctly read a fractional input.", function(){
            let result = convertHandler.getNum("2/3km");
            assert.equal(result, 2/3);
        });
        test("should correctly read a fractional input with a decimal.", function(){
            let result = convertHandler.getNum("1.2/2.4km");
            assert.equal(result, 0.5);
        });
        test("should correctly return an error on a double-fraction.", function(){
            let result = convertHandler.getNum("2/3/4km");
            assert.equal(result, "invalid number");
        });
        test("should correctly default to a numerical input of 1 when no numerical input is provided.", function(){
            let result = convertHandler.getNum("km");
            assert.equal(result, 1);
        });
        
    });
    suite("getUnit", function(){
        test("should correctly read each valid input unit.", function(){
            let inputs = ['2km', '3mi', '4gal', '5L', '6kg', '7lbs'];
            let expected = ['km', 'mi', 'gal', 'L', 'kg', 'lbs']
            let result = inputs.map(elem => {
                return convertHandler.getUnit(elem);
            });
            assert.deepEqual(result, expected);
        });
        test("should correctly return an error for an invalid input unit.", function(){
            let result = convertHandler.getUnit('3kj');
            assert.equal(result, 'invalid unit');
        });
    });
    suite("getReturnUnit", function(){
        test("should return the correct return unit for each valid input unit.", function(){
            let inputs = ['km', 'mi', 'gal', 'L', 'kg', 'lbs'];
            let expected = ['mi', 'km', 'L', 'gal', 'lbs', 'kg']
            let result = inputs.map(elem => {
                return convertHandler.getReturnUnit(elem);
            });
            assert.deepEqual(result, expected);
        });
        test("convertHandler should correctly convert gal to L.", function(){
            let result = convertHandler.getReturnUnit('gal');
            assert.equal(result, 'L');
        });
        test("convertHandler should correctly convert L to gal.", function(){
            let result = convertHandler.getReturnUnit('L');
            assert.equal(result, 'gal');
        });
        test("convertHandler should correctly convert mi to km.", function(){
            let result = convertHandler.getReturnUnit('mi');
            assert.equal(result, 'km');
        });
        test("convertHandler should correctly convert km to mi.", function(){
            let result = convertHandler.getReturnUnit('km');
            assert.equal(result, 'mi');
        });
        test("convertHandler should correctly convert lbs to kg.", function(){
            let result = convertHandler.getReturnUnit('lbs');
            assert.equal(result, 'kg');
        });
        test("convertHandler should correctly convert kg to lbs.", function(){
            let result = convertHandler.getReturnUnit('kg');
            assert.equal(result, 'lbs');
        });
    });
    suite("spellOutUnit", function(){
        test("should correctly return the spelled-out string unit for each valid input unit.", function(){
            let inputs = ['km', 'mi', 'L', 'gal', 'lbs', 'kg'];
            let expected = ['kilometers', 'miles', 'liters', 'gallons', 'pounds', 'kilograms']
            let result = inputs.map(elem => {
                return convertHandler.spellOutUnit(elem);
            });
            assert.deepEqual(result, expected);
        });
    });
});
