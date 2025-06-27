const cql = require('cql-execution');
const cqlfhir = require('cql-exec-fhir');

const DEBUG_MODE = false;

/**
 * Defines a constant object 'UsageStatus' with three properties:
 * - ACTED: 'ACTED'
 * - DECLINED: 'DECLINED'
 * - ROUTINE: 'ROUTINE'
 */
const UsageStatus = Object.freeze({
    ACTED: 'ACTED',
    DECLINED: 'DECLINED',
    ROUTINE: 'ROUTINE',
});


/**
 * Defines a constant object with FHIR types and their corresponding values.
 */
const FhirTypes = Object.freeze({
    PATIENT: '{http://hl7.org/fhir}Patient',
    IMMUNIZATION: '{http://hl7.org/fhir}Immunization',
    MEDICATION_REQUEST: '{http://hl7.org/fhir}MedicationRequest',
    MEDICATION_STATEMENT: '{http://hl7.org/fhir}MedicationStatement',
    MEDICATION: '{http://hl7.org/fhir}Medication',
    OBSERVATION: '{http://hl7.org/fhir}Observation',
    CONDITION: '{http://hl7.org/fhir}Condition',
    CODEABLE_CONCEPT: '{http://hl7.org/fhir}CodeableConcept',
});

/**
 * Returns a frozen object containing different container types.
 * The object includes a method for generating a ListTypeSpecifier based on the provided type.
 *
 * @param {any} t - The type to be included in the ListTypeSpecifier.
 * @returns {string} The generated ListTypeSpecifier based on the provided type.
 */
const ContainerTypes = Object.freeze({
    LIST: (t) => {
        if (t == null) return 'ListTypeSpecifier';
        return 'ListTypeSpecifier<' + t + '>';
    },
});

function isFhirList(typeSpecifier) {
    return typeSpecifier.indexOf('ListTypeSpecifier') !== -1;
}

function isURL(str) {
    var pattern = new RegExp(/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/);
    return pattern.test(str);
}


/**
 * ReferenceMappings
 * -----------------
 * This object defines how to handle FHIR resource references within specific resource types.
 * It provides a declarative way to specify how a reference field (e.g., `medicationReference`)
 * should be resolved and replaced with more usable, embedded data (e.g., `medicationCodeableConcept`).
 *
 * Each key in ReferenceMappings corresponds to a FHIR resource type (e.g., `FhirTypes.MEDICATION_REQUEST`)
 * or a container type (e.g., `ContainerTypes.LIST(...)`) representing a list of those resources.
 *
 * Mapping Format:
 * ----------------
 * ReferenceMappings[ResourceType] = {
 *   referenceFieldName: {
 *     field: <string>,                 // The destination field to insert resolved data into
 *     type: <FhirTypes>,               // The expected type of the referenced resource
 *     value: <string>,                 // The property of the referenced resource to extract (e.g., "code", "display")
 *     deleteOriginalReference: <bool>  // Whether to remove the original reference field after transformation
 *   },
 *   ...
 * };
 *
 * Example:
 * --------
 * For FhirTypes.MEDICATION_REQUEST:
 * {
 *   medicationReference: {
 *     field: 'medicationCodeableConcept',
 *     type: FhirTypes.MEDICATION,
 *     value: 'code',
 *     deleteOriginalReference: true
 *   }
 * }
 * This means:
 *   - Resolve `medicationReference` to a `Medication` resource.
 *   - Extract the `code` field from that resource.
 *   - Put the extracted value into `medicationCodeableConcept`.
 *   - Delete the original `medicationReference` field.
 *
 * Extension Guidelines:
 * ---------------------
 * To extend support for additional FHIR resource types or reference fields:
 * 1. Add a new key to `ReferenceMappings` for the relevant resource type (or container type).
 * 2. Define the reference fields to be resolved with the same format.
 * 3. Ensure the FHIR client/service layer understands how to use this mapping to fetch, resolve,
 *    and transform the referenced data appropriately.
 *
 * Notes:
 * ------
 * - This structure supports both single resources and collections (via `ContainerTypes.LIST(...)`).
 * - Ensure that your code correctly handles asynchronous resolution of references.
 * - If the referenced resource is not found or is incomplete, consider adding fallback behavior.
 * - Keep this structure in sync with any custom extensions or profile-specific mappings.
 */
var ReferenceMappings = {};
ReferenceMappings[FhirTypes.MEDICATION_REQUEST] = {
    medicationReference: {
        field: 'medicationCodeableConcept', type: FhirTypes.MEDICATION,
        value: 'code',
        deleteOriginalReference: true
    },
};

ReferenceMappings[ContainerTypes.LIST(FhirTypes.MEDICATION_REQUEST)] = {
    medicationReference: {
        field: 'medicationCodeableConcept', type: FhirTypes.MEDICATION,
        value: 'code',
        deleteOriginalReference: true

    },
};


/**
 * Retrieves a list of expected parameters required buy the rule.
 *
 * @param {Object} rule - The rule object.
 * @returns {Array} An array of objects representing expected parameters with name and type.
 */
function getListOfExpectedParameters(rule) {

    if (rule?.library?.parameters?.def === undefined) return undefined;

    if (!Array.isArray(rule.library.parameters.def)) return undefined;

    let result = [];
    rule.library.parameters.def.forEach(p => {
        let type = '';
        if (p.parameterTypeSpecifier.name != undefined) {
            type = p.parameterTypeSpecifier.name;
        } else {
            type = p.parameterTypeSpecifier.type + '<' + p.parameterTypeSpecifier.elementType.name + '>';
        }
        result.push({
            name: p.name,
            type: type,
        });
    });
    return result;
}

/**
 * Retrieves a list of expected libraries based on the given rule.
 *
 * @param {Object} rule - The rule object.
 * @returns {Array} An array of objects representing expected libraries with name and path.
 */
function getListOfExpectedLibraries(rule) {

    if (rule?.library?.includes?.def === undefined) return undefined;
    if (!Array.isArray(rule.library.includes.def)) return undefined;

    let result = [];
    rule.library.includes.def.forEach(l => {
        result.push({
            name: l.localIdentifier,
            path: l.path,
        });
    });

    return result;
}

/**
 * Creates a FHIR (Fast Healthcare Interoperability Resources) Bundle based on the given resource and URL.
 *
 * @param {Object} resource - The resource object to be included in the Bundle.
 * @param {string|null} url - The URL associated with the resource. Can be null.
 * @returns {Object} A FHIR Bundle object.
 */
function createBundle(resource, url = null) {
    if (resource === undefined) return undefined;
    if (resource.resourceType !== 'Bundle') {
        if (url === null) {
            return {
                resourceType: 'Bundle',
                entry: [{resource: resource}],
            };
        }
        return {
            resourceType: 'Bundle',
            entry: [{
                resource: resource,
                fullUrl: url,
            }],
        };
    }
    return resource;
}

/**
 * Returns an array containing the current timestamp in the format [year, month, day, hours, minutes, seconds].
 */
function getCurrentTimestamp() {
    let date = new Date();
    let timestamp = [date.year, date.month, date.day, date.getHours(), date.getMinutes(), date.getSeconds()];
    return timestamp;
}

/**
 * Executes a Clinical Quality Language (CQL) rule on a FHIR (Fast Healthcare Interoperability Resources) patient.
 *
 * @param {Object} patient - The FHIR patient resource on which the CQL rule will be executed.
 * @param {Object} rule - The CQL rule to be executed.
 * @param {Array|null} libraries - An array of additional CQL libraries to be used in the execution. Default is null.
 * @param {Object|null} parameters - Additional parameters to be used in the CQL execution. Default is null.
 * @returns {Object} The result of the CQL execution on the patient, including patient-specific results.
 */
async function executeCql(patient, rule, libraries = null, parameters = null, codeService = null, vsacApiKey = null) {
    if (patient === null || patient === undefined) {
        // console.error("Error Executing CDSS: Patient is undefined\nPatient FHIR resource is required to execute a CQL rule.");
        throw new Error('Patient is undefined');
    }
    if (rule === null || rule === undefined) {
        // console.error("Error Executing CDSS: Rule is undefined\nRule object is required to execute a CQL rule.");
        throw new Error('Rule is undefined');
    }

    const fhirWrapper = cqlfhir.FHIRWrapper.FHIRv401(); // or .FHIRv102() or .FHIRv300() or .FHIRv401()

    // let codeService = new vsac.CodeService(false, true, global.cdss.endpoints.vsacSvs.address, global.cdss.endpoints.vsacFhir.address);

    let patientIds = [];
    if (patient.resourceType === 'Bundle') {
        patientIds = patient.entry.filter(f => f.resource.resourceType === 'Patient')
            .map(p => p.resource.id);
    } else {
        patientIds = [patient.id];
    }

    // Create a patient bundle if patient is not a bundle
    const patientBundle = createBundle(patient);

    const psource = new cqlfhir.PatientSource.FHIRv401({
        requireProfileTagging: true,
    });

    // Load patients
    psource.loadBundles([patientBundle]);

    // Create a library object and make sure all expected libraries are provided
    const expectedLibraries = getListOfExpectedLibraries(rule);
    let libraryObject = {};
    if (expectedLibraries !== undefined && expectedLibraries.length > 0) {
        if (libraries === null || libraries === undefined) {
            throw new Error('Rule expects libraries, but they are undefined');
        }

        for (const expectedLibrary of expectedLibraries) {
            let lib = libraries[expectedLibrary.name];
            if (lib === undefined || lib === null) {
                throw new Error(`Rule expects library "${expectedLibrary.name}", but it is undefined`);
            }
            libraryObject[expectedLibrary.name] = lib;

        }
    }

    // Create the rule merged with libraries if necessary
    let ruleWithLibraries = libraryObject.length === 0 ? new cql.Library(rule) : new cql.Library(rule, new cql.Repository(libraryObject));

    try {
        let success = await codeService.ensureValueSetsInLibraryWithAPIKey(ruleWithLibraries, true, vsacApiKey);

    } catch (error) {
        console.error(`Ran into error when gathering valuesets for library ${rule.library.identifier.id}-${rule.library.identifier.version}\n${error}`);
        return null;
    }

    let executor = new cql.Executor(ruleWithLibraries, codeService);

    // Create parameter object and make sure all expected parameters are provided
    let paramObject = {};
    const expectedParameters = getListOfExpectedParameters(rule);

    if (expectedParameters !== undefined && expectedParameters.length > 0) {

        if (parameters === null || parameters === undefined) {
            throw new Error('Rule expects parameters, but they are undefined');
        }

        for (const expectedParameter of expectedParameters) {

            let res = parameters[expectedParameter.name];

            if (res === undefined || res === null) {
                throw new Error(`Rule expects parameter "${expectedParameter.name}", but it is undefined`);
            }

            if (expectedParameter.type.startsWith(ContainerTypes.LIST(null))) {

                paramObject[expectedParameter.name] = [];

                if (res.entry != null) {
                    for (const entry of res.entry) {

                        let wrapped = fhirWrapper.wrap(entry.resource);
                        paramObject[expectedParameter.name].push(wrapped);
                    }
                } else if (Array.isArray(res)) {
                    for (const resource of res) {

                        let wrapped = fhirWrapper.wrap(resource);
                        paramObject[expectedParameter.name].push(wrapped);
                    }
                }

            } else {
                paramObject[expectedParameter.name] = fhirWrapper.wrap(res);
            }

        }
    }


    // Load parameters into executor
    executor = executor.withParameters(paramObject);

    // Execute the rule
    const result = await executor.exec(psource); // Await the execution result

    let patientResults = result.patientResults;
    patientResults.library = {
        name: rule.library.identifier.id,
        version: rule.library.identifier.version,
    };

    let recommendations = [];

    patientIds.forEach(patientId => patientResults[patientId].Recommendations = extractRecommendations(patientResults[patientId]));

    // Return the results
    return patientResults;
}

/**
 * Extracts recommendations from the given patient results.
 *
 * @param {Object} patientResults - The patient results object containing recommendations.
 * @returns {Array|null} An array of recommendations with priority or null if no recommendations found.
 */
function extractRecommendations(patientResults) {
    if (patientResults === null) {
        return null;
    }

    if (patientResults.Recommendation != null) {

        if (Array.isArray(patientResults.Recommendation)) {
            return patientResults.Recommendation.map(recommendation => {
                return {
                    'recommendation': recommendation,
                    'priority': 1,
                };
            });
        } else if (typeof patientResults.Recommendation == 'string') {
            return [{
                'recommendation': patientResults.Recommendation,
                'priority': 1,
            }];
        } else {
            throw new Error(`Recommendation function returned unrecognized type. Expect Array of strings of single string, got ${typeof patientResults.Recommendation} instead`);
        }
    } else {
        const recommendationKeys = Object.keys(patientResults)
            .filter(key => key.startsWith('Recommendation'));

        const recommendationKeyOrder = {};
        for (const recommendationKey of recommendationKeys) {
            const numberSubstring = recommendationKey.substring(recommendationKey.lastIndexOf('Recommendation') + 14);
            const num = new Number(numberSubstring);
            if (patientResults[recommendationKey] != null)
                recommendationKeyOrder[num] = recommendationKey;
        }

        return Object.keys(recommendationKeyOrder)
            .sort()
            .map(priority => {
                const key = recommendationKeyOrder[priority];

                return {
                    'recommendation': patientResults[key],
                    'priority': priority,
                };
            });

    }

    return null;

}

/**
 * Executes a rule for a specific patient based on the provided patient ID and rule ID.
 * Attempts to fetch all expected libraries and parameters for the rule.
 *
 * @param {string} patientId - The unique identifier of the patient
 * @param {string} ruleId - The unique identifier of the rule to execute
 * @returns {Object} The result of the CQL execution on the patient, including patient-specific results.
 */
async function executeRuleWithPatient(patientId, ruleId) {
    let patient = await getPatientResource(patientId);
    let rule = await getRule(ruleId);

    let libraries = {};
    let expectedLibraries = getListOfExpectedLibraries(rule);
    if (expectedLibraries !== undefined) {
        for (const lib of expectedLibraries) {
            libraries[lib.name] = await getRule(lib.path);
        }
    }

    let parameters = {};

    let expectedParameters = getListOfExpectedParameters(rule);

    if (expectedParameters !== undefined) {
        for (const par of expectedParameters) {
            parameters[par.name] = await getFhirResource(patientId, par.type);

        }
    }
    return await executeCql(patient, rule, libraries, parameters);
}

module.exports = {
    createBundle,
    getCurrentTimestamp,
    executeCql,
    getListOfExpectedParameters,
    getListOfExpectedLibraries,
    FhirTypes,
    UsageStatus,
    ContainerTypes,
    ReferenceMappings,
    isFhirList,
    isURL
};
