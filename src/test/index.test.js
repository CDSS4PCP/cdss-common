/**
 * Test the endpoints of the CDSS module on the clientside.
 * Checks if the required properties are present for each endpoint.
 * Requires Webpack to be run before testing clientside features.
 * Uses unit.js for testing.
 */

/* eslint no-console: 0 */
var test = require('unit.js');

/*
NOTE: Run Webpack before testing the clientside features
 */
var cdss = require('../../dist/cdss.js');

console.log('**** Testing Clientside components ****');

function testEndpoints() {

    function endpoints_metadata() {
        test.object(global.cdss.endpoints).hasProperty('metadata');
        test.object(global.cdss.endpoints['metadata']).hasProperty('systemName');
        test.object(global.cdss.endpoints['metadata']).hasProperty('remoteAddress');
    }

    function endpoints_patientById() {
        test.object(global.cdss.endpoints).hasProperty('patientById');
        test.object(global.cdss.endpoints['patientById']).hasProperty('address');
        test.object(global.cdss.endpoints['patientById']).hasProperty('method');
    }

    function endpoints_medicationByMedicationRequestId() {
        test.object(global.cdss.endpoints).hasProperty('medicationByMedicationRequestId');
        test.object(global.cdss.endpoints['medicationByMedicationRequestId']).hasProperty('address');
        test.object(global.cdss.endpoints['medicationByMedicationRequestId']).hasProperty('method');
    }

    function endpoints_medicationRequestByPatientId() {
        test.object(global.cdss.endpoints).hasProperty('medicationRequestByPatientId');
        test.object(global.cdss.endpoints['medicationRequestByPatientId']).hasProperty('address');
        test.object(global.cdss.endpoints['medicationRequestByPatientId']).hasProperty('method');
    }

    function endpoints_medicationById() {
        test.object(global.cdss.endpoints).hasProperty('medicationById');
        test.object(global.cdss.endpoints['medicationById']).hasProperty('address');
        test.object(global.cdss.endpoints['medicationById']).hasProperty('method');
    }

    function endpoints_immunizationByPatientId() {
        test.object(global.cdss.endpoints).hasProperty('immunizationByPatientId');
        test.object(global.cdss.endpoints['immunizationByPatientId']).hasProperty('address');
        test.object(global.cdss.endpoints['immunizationByPatientId']).hasProperty('method');
    }

    function endpoints_observationByPatientId() {
        test.object(global.cdss.endpoints).hasProperty('observationByPatientId');
        test.object(global.cdss.endpoints['observationByPatientId']).hasProperty('address');
        test.object(global.cdss.endpoints['observationByPatientId']).hasProperty('method');
    }

    function endpoints_conditionByPatientId() {
        test.object(global.cdss.endpoints).hasProperty('conditionByPatientId');
        test.object(global.cdss.endpoints['conditionByPatientId']).hasProperty('address');
        test.object(global.cdss.endpoints['conditionByPatientId']).hasProperty('method');
    }

    function endpoints_ruleById() {
        test.object(global.cdss.endpoints).hasProperty('ruleById');
        test.object(global.cdss.endpoints['ruleById']).hasProperty('address');
        test.object(global.cdss.endpoints['ruleById']).hasProperty('method');
    }

    function endpoints_getRules() {
        test.object(global.cdss.endpoints).hasProperty('getRules');
        test.object(global.cdss.endpoints['getRules']).hasProperty('address');
        test.object(global.cdss.endpoints['getRules']).hasProperty('method');
    }

    function endpoints_getUsages() {
        test.object(global.cdss.endpoints).hasProperty('getUsages');
        test.object(global.cdss.endpoints['getUsages']).hasProperty('address');
        test.object(global.cdss.endpoints['getUsages']).hasProperty('method');
    }

    function endpoints_recordUsage() {
        test.object(global.cdss.endpoints).hasProperty('recordUsage');
        test.object(global.cdss.endpoints['recordUsage']).hasProperty('address');
        test.object(global.cdss.endpoints['recordUsage']).hasProperty('method');
    }

    function endpoints_vsacSvs() {
        test.object(global.cdss.endpoints).hasProperty('vsacSvs');
        test.object(global.cdss.endpoints['vsacSvs']).hasProperty('address');
    }

    function endpoints_vsacFhir() {
        test.object(global.cdss.endpoints).hasProperty('vsacFhir');
        test.object(global.cdss.endpoints['vsacFhir']).hasProperty('address');
    }

    endpoints_metadata();
    endpoints_patientById();
    endpoints_medicationRequestByPatientId();
    endpoints_medicationById();
    endpoints_medicationByMedicationRequestId();
    endpoints_immunizationByPatientId();
    endpoints_observationByPatientId();
    endpoints_conditionByPatientId();
    endpoints_ruleById();
    endpoints_getRules();
    endpoints_getUsages();
    endpoints_recordUsage();
    endpoints_vsacSvs();
    endpoints_vsacFhir();
}

testEndpoints();

setTimeout(() => {
    console.log('**** All clientside tests passed ****');
}, 1000);

