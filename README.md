# cdss-common

The **cdss-common** module is part of the [CDSS4PCP Project](https://cdss4pcp.com/), a Clinical Decision Support System (CDSS) that runs client-side using JavaScript and CQL (Clinical Quality Language). This module is designed to be EMR-agnostic and integrates with external systems via standard FHIR APIs.

It provides a powerful JavaScript interface for executing CQL logic on FHIR patient data, resolving value sets, and logging usage—all directly in the browser.

---

## Table of Contents

- [Overview](#overview)
- [How It Works](#how-it-works)
- [Module Structure](#module-structure)
  - [`cdss-module.js`](#cdss-modulejs)
  - [`index.js`](#indexjs)
- [Usage](#usage)
- [Extending the System](#extending-the-system)
- [FHIR & CQL Notes](#fhir--cql-notes)
- [Dependencies](#dependencies)
- [Testing and Compiling](#testing-and-compiling)
- [Webpack Configuration](#webpack-configuration)

---

## Overview

This module allows you to:

- Load patient data and related FHIR resources from custom or remote APIs.
- Execute CQL rules encoded in ELM (JSON) format using client-side CQL execution engines.
- Integrate with VSAC (Value Set Authority Center) to resolve value sets.
- Track rule usage via routine, acted, or declined interactions.
- Deploy and run directly in a browser.

---

## How It Works

1. **Retrieve Patient and Rule** – Patient and rule data are fetched via configurable endpoints.
2. **Resolve Parameters/Libraries** – Expected CQL parameters and included libraries are dynamically loaded.
3. **Execute CQL** – The `cql-execution` and `cql-exec-fhir` libraries run the rule logic.
4. **Log and Return Results** – Results including recommendations and metadata are returned, and optionally logged.

---

## Module Structure

### `cdss-module.js`

Defines constants, enums, and core logic for executing CQL rules:

- `executeCql(...)`: Main engine to run a CQL rule with libraries, parameters, and value sets.
- `getListOfExpectedParameters(rule)`: Extracts required parameters from a CQL ELM rule.
- `getListOfExpectedLibraries(rule)`: Detects required libraries used in the rule.
- `createBundle(...)`: Wraps resources into a valid FHIR Bundle if necessary.
- `ReferenceMappings`: Declarative FHIR reference resolution engine (e.g., `medicationReference` → `medicationCodeableConcept`).
- Enums: `FhirTypes`, `ContainerTypes`, `UsageStatus`
- Utility: `isFhirList()`, `isURL()`

### `index.js`

Defines the browser-facing client-side integration layer:

- Endpoint configuration and default FHIR resource fetchers.
- High-level functions:
  - `executeRuleWithPatient(...)`
  - `executeRuleWithPatientLibsParams(...)`
- Logging functions:
  - `recordRoutineUsage(...)`
  - `recordActedUsage(...)`
  - `recordDeclinedUsage(...)`
- VSAC integration using `browserfy-cql-exec-vsac`.

Initializes the global `cdss` object to expose all functionality for use in web apps.

---

## Usage

### Setup

Configure `global.cdss.endpoints` before running:

```js
global.cdss.endpoints = {
  patientById: { address: 'https://example.com/Patient/{{patientId}}', method: 'GET' },
  ruleById: { address: 'https://example.com/Rule/{{ruleId}}', method: 'GET' },
  recordUsage: { address: 'https://example.com/Usage', method: 'POST' },
  vsacSvs: { address: 'https://vsac.nlm.nih.gov/vsac/svs' },
  vsacFhir: { address: 'https://vsac.nlm.nih.gov/vsac/fhir' },
  metadata: { vsacApiKey: 'your-api-key' }
};
```

### Run a Rule

```js
const result = await cdss.executeRuleWithPatient('patient-123', 'rule-abc');
console.log(result);
```

Or with custom parameters and libraries:

```js
const result = await cdss.executeRuleWithPatientLibsParams(patient, rule, libraries, parameters);
```

---

## Extending the System

### Add Reference Resolution

To resolve `Reference` fields automatically:

```js
ReferenceMappings[FhirTypes.MEDICATION_STATEMENT] = {
  medicationReference: {
    field: 'medicationCodeableConcept',
    type: FhirTypes.MEDICATION,
    value: 'code',
    deleteOriginalReference: true
  }
};
```

### Add New FHIR Types

Extend `getFhirResource()` to handle new FHIR resource types.

---

## FHIR & CQL Notes

- **FHIR Version**: R4 (4.0.1) is used.
- **CQL**: Requires JSON-ELM compiled from `.cql`.
- **VSAC Integration**: Optional API key required to resolve value sets.

---

## Dependencies

This module depends on the following libraries (also listed in `package.json`):

| Package | Purpose |
|--------|---------|
| `browserify-fs` | FS emulation in browser |
| `buffer` | Global buffer polyfill |
| `cql-exec-fhir` | CQL execution against FHIR |
| `browserfy-cql-exec-vsac` | VSAC-compatible value set service |
| `cql-execution` | CQL logic execution engine |
| `fhir` | Lightweight FHIR resource utils |
| `lodash` | Utility library |
| `path-browserify` | Path manipulation in browser |
| `process` | Node.js process polyfill |
| `timers-browserify` | Timers polyfill |
| `unit.js` | JavaScript testing framework |

> **Note:** `browserfy-cql-exec-vsac` is not published to NPM. Install from GitHub:
[https://github.com/sorliog/browserfy-cql-exec-vsac](https://github.com/sorliog/browserfy-cql-exec-vsac)

---

## Testing and Compiling

Use the following workflow to test and build the project:

1. **Lint**: Fix style issues.
2. **Test**: Use Jest to test `cdss-module.js`.
3. **Compile**: Bundle for browser using Webpack.
4. **Test Final Build**: Run unit tests on compiled output using Unit.js.

To run all steps:

```bash
npm run all
```

---

## Webpack Configuration

The `webpack.config.js` file is responsible for producing a single browser-ready JavaScript bundle. It is configured to polyfill necessary Node.js modules using `resolve.fallback` and includes the following setup:

```js
const webpack = require('webpack');

module.exports = {
  resolve: {
    fallback: {
      buffer: require.resolve('buffer/'),
      timers: require.resolve('timers-browserify'),
      fs: false, // filesystem is not allowed on clientside, so webpack should ignore it
      utils: false,
      util: false,
      path: require.resolve('path-browserify'), // Use path-browserify for paths
      constants: false,
      assert: false,
      process: false,
      events: false
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    })
  ],
  output: {
    filename: 'cdss.js',
  },
};

```

### Notes:
- Modules like `fs`, `process`, and `events` are disabled since they are not applicable in the browser.
- `ProvidePlugin` ensures that `process` is available in the browser context.
- The bundled output will be named `cdss.js` and can be used directly in client-side applications.
