/**
 * Executes tests for the executeCql function, including error cases and valid conditions.
 * Tests include throwing errors for undefined patient, rule, parameters, and libraries,
 * as well as validating a valid condition with specific parameters and libraries.
 *
 **/

/* eslint no-console: 0 */

const {executeCql, getListOfExpectedLibraries, getListOfExpectedParameters} = require('../cdss-module');
const vsac = require('cql-exec-vsac');

const fhirHelpers = require('./testResources/fhirHelpers.json'); // Update the path accordingly
const p1 = require('./testResources/p1.json');


const imm1 = require('./testResources/imm1.json');
const r1 = require('./testResources/r1.json');
const r2 = require('./testResources/r2.json');

const VALUESETS_CACHE = './src/test/testResources/valuesets/';

const API_KEY = 'c4269c97-fab9-4675-860d-6a811daf430b';
const codeService = new vsac.CodeService(VALUESETS_CACHE, true, true);

describe('executeCql function', () => {
    test('should throw an error if patient is undefined', async () => {
        await expect(executeCql(null, {})).rejects.toThrow('Patient is undefined');
    });

    test('should throw an error if rule is undefined', async () => {
        await expect(executeCql({}, null)).rejects.toThrow('Rule is undefined');
    });


    test('should throw an error if rule expects parameters but they are undefined', async () => {
        await expect(executeCql(p1, r1, {'FHIRHelpers': fhirHelpers}, {}, codeService, API_KEY))
            .rejects.toThrow('Rule expects parameter \"Imm\", but it is undefined');
    });

    test('should throw an error if rule expects libraries but they are undefined', async () => {
        await expect(executeCql(p1, r1, {}, {}, codeService, API_KEY))
            .rejects.toThrow('Rule expects library \"FHIRHelpers\", but it is undefined');
    });

    test('should throw an error if rule expects parameters but they are undefined', async () => {
        await expect(executeCql(p1, r1, {'FHIRHelpers': fhirHelpers}, null, codeService, API_KEY))
            .rejects.toThrow('Rule expects parameters, but they are undefined');
    });

    test('should throw an error if rule expects libraries but they are undefined', async () => {
        await expect(executeCql(p1, r1, null, {'Imm': imm1}, codeService, API_KEY))
            .rejects.toThrow('Rule expects libraries, but they are undefined');
    });

    test('valid condition', async () => {
        let result = await executeCql(p1, r2, {'FHIRHelpers': fhirHelpers}, {'Imm': imm1}, codeService, API_KEY);
        expect(result).not.toBeNull();
    }, 15000);

});


describe('getListOfExpectedLibraries function', () => {
    test('returns an array of expected libraries with name and path', () => {
        const rule = {
            library: {
                includes: {
                    def: [
                        {localIdentifier: 'lib1', path: '/path/to/lib1'},
                        {localIdentifier: 'lib2', path: '/path/to/lib2'},
                    ],
                },
            },
        };

        expect(getListOfExpectedLibraries(rule)).toEqual([
            {name: 'lib1', path: '/path/to/lib1'},
            {name: 'lib2', path: '/path/to/lib2'},
        ]);
    });

    test('returns undefined if rule or its properties are missing', () => {
        expect(getListOfExpectedLibraries()).toBeUndefined();
        expect(getListOfExpectedLibraries({})).toBeUndefined();
        expect(getListOfExpectedLibraries({library: {}})).toBeUndefined();
        expect(getListOfExpectedLibraries({library: {includes: {}}})).toBeUndefined();
    });

    test('returns undefined if def is not an array', () => {
        const rule = {
            library: {
                includes: {
                    def: {},
                },
            },
        };

        expect(getListOfExpectedLibraries(rule)).toBeUndefined();
    });
});


describe('getListOfExpectedParameters function', () => {
    test('should return undefined if rule or its properties are undefined', () => {
        expect(getListOfExpectedParameters()).toBeUndefined();
        expect(getListOfExpectedParameters({})).toBeUndefined();
        expect(getListOfExpectedParameters({library: {}})).toBeUndefined();
    });

    test('should return undefined if parameters.def is not an array', () => {
        const rule = {
            library: {
                parameters: {
                    def: {}
                }
            }
        };
        expect(getListOfExpectedParameters(rule)).toBeUndefined();
    });

    test('should return an array of objects with name and type properties', () => {
        const rule = {
            library: {
                parameters: {
                    def: [
                        {
                            name: 'par1',
                            parameterTypeSpecifier: {
                                name: 'Number'
                            }
                        },
                        {
                            name: 'par2',
                            parameterTypeSpecifier: {
                                type: 'Array',
                                elementType: {name: 'String'}
                            }
                        }
                    ]
                }
            }
        };
        const expected = [
            {name: 'par1', type: 'Number'},
            {name: 'par2', type: 'Array<String>'}
        ];
        expect(getListOfExpectedParameters(rule)).toEqual(expected);
    });
});
