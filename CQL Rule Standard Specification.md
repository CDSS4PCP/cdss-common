# Authoring CQL Files for the Clinical Decision Support System (CDSS)

This document outlines the rules, conventions, and examples for writing Clinical Quality Language (CQL) files compatible with the CDSS platform. CQL authors must adhere to this structure to ensure proper integration, rule execution, and configuration by the system.

---

## Table of Contents

1. [Overview](#overview)
2. [Structuring the CQL](#structuring-the-cql)
3. [Input Parameters](#input-parameters)
4. [Recommendation Expressions](#recommendation-expressions)
5. [Parameter Expressions](#parameter-expressions)
6. [Helper Libraries](#helper-libraries)
7. [Summary of Requirements](#summary-of-requirements)

---

## Overview

Each CQL file represents a rule that evaluates patient data and produces vaccine-related clinical recommendations. The CDSS will automatically detect these rules, extract recommendations, and apply rule logic in real-time to patient records.

---

## Structuring the CQL

A CQL file must follow a specific structure to be valid:

### 1. Library Header

```cql
library MMRRecommendation version '1.0.0'
```

* `library` defines the name of the rule file.
* The version **must** follow [Semantic Versioning (SemVer)](https://semver.org/), e.g., `'1.0.0'`.

### 2. FHIR Version

```cql
using FHIR version '4.0.1'
```

This specifies compatibility with FHIR R4 (version 4.0.1), the standard version used by the CDSS.

### 3. Context

```cql
context Patient
```

This declares that all expressions and logic in the CQL rule operate in the context of an individual patient.

---

### 4. VaccineName Expression

Every rule must define a `VaccineName` expression that clearly identifies which vaccine the rule applies to.

### Syntax

```cql
define "VaccineName": '<Vaccine Name>'
```

### Example

```cql
define "VaccineName": 'Measles, Mumps, and Rubella Virus Vaccine'
```

This expression must return a single **string** and should match the clinical name used in system interfaces or patient documentation.

---

## Input Parameters

Rules must declare external data inputs as parameters. These parameters represent the patient’s historical and active clinical data.

All input parameters must be **lists** of FHIR resource types:

```cql
parameter "Immunizations" List<Immunization>
parameter "Observations" List<Observation>
parameter "MedicationRequests" List<MedicationRequest>
parameter "Medications" List<Medication>
parameter "Conditions" List<Condition>
```

Each parameter should contain the complete set of relevant data for the patient. These parameters are populated externally by the CDSS engine and can be used within any expression in the rule.

---

## Recommendation Expressions

The system supports two ways of producing recommendations. You may use either approach depending on whether recommendations are ordered by priority or returned all at once.

### Option 1: Combined List Output

```cql
define "Recommendation":
  if someCondition then
    {'Give MMR vaccine today', 'Schedule second dose in 1 month'}
  else
    null
```

This returns all applicable recommendations as a list of strings. It is useful when recommendations are evaluated together.

### Option 2: Prioritized Individual Recommendations

Define individual expressions named `Recommendation1`, `Recommendation2`, etc.

```cql
define "Recommendation1": 'Give MMR vaccine today'
define "Recommendation2": 'Schedule second dose in 1 month'
```

The number in the expression name indicates the **priority**, with `Recommendation1` being the highest. The CDSS will collect and sort these accordingly.

---

## Parameter Expressions

Parameter expressions allow external systems to **programmatically configure** or override rule behavior. These expressions must:

* Start with a dollar sign (`$`)
* Return a **primitive** value: `Integer`, `String`, or `Boolean`

### Valid Examples

```cql
define "$Age1": 0
define "$Age1_unit": 'month'
define "$IncludeHistoricalInfections": true
```

These expressions are intended to be changed **without modifying the rule source code**, enabling dynamic configuration.

---

## Helper Libraries

CQL rules can include **helper libraries** to simplify logic and encourage reuse.

### Rules for Helper Libraries

* Must not declare any `parameter` expressions

* Can define:

    * Value sets
    * Utility functions
    * Shared expressions

### Example Usage in Main Rule

```cql
include "CommonVaccineHelpers" version '1.0.0' called Helpers
```

### Example of a Helper Library

```cql
library CommonVaccineHelpers version '1.0.0'

using FHIR version '4.0.1'
context Patient

define function "IsInfant"(birthDate DateTime): Boolean:
  difference in months between birthDate and Today() < 12
```

This function can now be used in any rule that includes the helper.

---

## Summary of Requirements

| Component                     | Requirement                                                               |
| ----------------------------- | ------------------------------------------------------------------------- |
| **Library Name**              | Must be defined at top; version must follow SemVer                        |
| **FHIR Version**              | Must be `'4.0.1'`                                                         |
| **Context**                   | Must be `Patient`                                                         |
| **Input Parameters**          | Must be `List<...>` of allowed FHIR resource types                        |
| **VaccineName Expression**    | Required; returns string describing the vaccine                           |
| **Recommendation Expression** | Either a single `"Recommendations"` list, or numbered expressions         |
| **Parameter Expressions**     | Must begin with `$`; return integer, string, or boolean                   |
| **Helper Libraries**          | Optional; must not declare parameters; can include helpers and value sets |

---

## Example Rule Template

```cql
library HepBRecommendation version '1.0.0'

using FHIR version '4.0.1'

context Patient

include "CommonVaccineHelpers" version '1.0.0' called Helpers

parameter "Immunizations" List<Immunization>
parameter "Observations" List<Observation>
parameter "MedicationRequests" List<MedicationRequest>
parameter "Medications" List<Medication>
parameter "Conditions" List<Condition>

define "$MinimumAge": 1
define "$MinimumAge_unit": 'day'

define "VaccineName": 'Hepatitis B Vaccine'

define "Recommendation1":
  if Helpers.IsInfant(Patient.birthDate) then
    'Administer first dose of Hepatitis B vaccine'
  else
    null

define "Recommendation2":
  if not Helpers.IsInfant(Patient.birthDate) then
    'Check for delayed HepB immunization schedule'
  else
    null
```
