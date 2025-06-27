library "MMR_Common_Library" version '1.0.0'

using FHIR version '4.0.1'



codesystem "CVX": 'http://hl7.org/fhir/sid/cvx'
codesystem "Snomed": 'http://snomed.info/sct'
codesystem "ICD-10-CM": 'http://hl7.org/fhir/sid/icd-10-cm'
codesystem "LOINC": 'http://loinc.org'
codesystem "UCUM": 'http://unitsofmeasure.org'

// Units of measure
code "/mm3": '/mm3' from UCUM
code "%": '%' from UCUM

// MMR valuesets
valueset "Measles, Mumps and Rubella (MMR) Vaccine Administered VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.110.11.1086'
valueset "Measles, Mumps and Rubella (MMR) Vaccine VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.196.11.1235'
valueset "Measles, Mumps and Rubella (MMR) Vaccine VS_1": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.196.12.1224'
valueset "Measles, Mumps and Rubella (MMR) Vaccine Administered VS_1": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.110.12.1031'
valueset "Measles, Mumps and Rubella (MMR) Vaccine Administered VS_2": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.110.11.1085'

code "measles, mumps, rubella, and varicella virus vaccine code": '94' from "CVX" display 'measles, mumps, rubella, and varicella virus vaccine'
code "measles, mumps and rubella virus vaccine code": '03' from "CVX" display 'measles, mumps and rubella virus vaccine'


// Pregnacy valuesets
valueset "Pregnant (ICD10CM) VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1146.1986'
valueset "Pregnant (SNOMED) VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1146.676'
valueset "Pregnant State VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.3157.4055'
valueset "Pregnancy VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1078.264'
valueset "Obstetrical or Pregnancy Related Conditions VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.117.1.7.1.263'
code "Single Pregnacy": '237244005' from "Snomed" display 'Single Pregnacy'


// Immunocompromised Valuesets
valueset "Immunocompromised Conditions VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.666.5.1940'
valueset "Immunocompromised Conditions VS_1": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.666.5.2343'
valueset "Immunocompromised Conditions I10 VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.666.5.2328'
valueset "Immunocompromised Conditions VS_2": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.666.5.1740'
valueset "Immunocompromised Therapies VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.666.5.2348'
valueset "Immunocompromised Therapies I10 VS-2": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.666.5.2349'
valueset "COVID19 immunocompromised underlying condition reference set VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1181.67'
valueset "Immunocompromised Therapies I9 VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.666.5.2350'
valueset "Immunocompromised Therapies SMCT VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.666.5.2351'
valueset "Immunocompromised state for Urology Care VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1151.18'
code "Immunodeficiency, unspecified": 'D84.9' from "ICD-10-CM"


// HIV AIDS condition valuesets
valueset "HIV Infection or AIDS (Disorders) (SNOMED) VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1146.460'
valueset "HIV VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.120.12.1003'
valueset "HIV 1 VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.120.11.1005'
valueset "HIV Lab Tests VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1056.50'
valueset "HIV Infection (Tests for HIV Antibody) VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1146.730'
valueset "Indicators of Human Immunodeficiency Virus (HIV) VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1056.54'
valueset "Indicators of Human Immunodeficiency Virus (HIV) VS_1": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1056.53'
valueset "HIV Infection (ARV Combination Treatment for HIV) (RXNORM) VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1146.1597'
valueset "HIV Infection (Tests for HIV Nucleic Acid [Qualitative]) VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1146.728'
valueset "HIV Infection (ARV Protease Inhibitors [PIs]) (RXNORM) VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1146.1598'
valueset "Human Immunodeficiency Virus (HIV)  Viral Load VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1056.71'
valueset "HIV Infection (Tests for HIV Nucleic Acid [Viral Load]) VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1146.729'
valueset "HIV Infection (ARV Integrase Strand Transfer Inhibitors [INSTIs]) (RXNORM) VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1146.1600'
valueset "HIV Infection (ARV Non nucleoside Reverse Transcriptase Inhibitors [NNRTIs]) (RXNORM) VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1146.1595'
valueset "HIV Infection (Organism or Substance in Lab Results) VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1146.356'
valueset "HIV Viral Load VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.120.12.1002'
valueset "HIV Infection (Tests for HIV Antigen) VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1146.368'
valueset "HIV Infection (Tests for HIV by Culture and Identification Method) VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1146.726'
valueset "HIV Infection or AIDS (Disorders) (ICD10CM) VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1146.461'
valueset "HIV Infection (ARV Boosters [CYP3A4 Inhibitor]) (RXNORM) VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1146.1601'
valueset "HIV Infection (ARV CCR5 Antagonists) (RXNORM) VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1146.1599'
valueset "Indicators of Human Immunodeficiency Virus (HIV) VS_2": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1056.52'
valueset "HIV 1 VS_1": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.120.11.1007'
valueset "HIV Tests VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1166.11'
valueset "HIV in Pregnancy Childbirth and Puerperium VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1029.272'
valueset "HIV in Pregnancy Childbirth and Puerperium VS_1": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1029.271'
//valueset "ICD10 Codes for HIV Diagnosis VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1262.4'
valueset "Indicators of Human Immunodeficiency Virus (HIV) VS_3": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1056.51'
valueset "HIV Infection (Combination Tests for HIV Antigen and Antibody) VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1146.731'
valueset "HIV VS_1": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1029.270'
valueset "HIV 1 VS_2": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.120.11.1006'
valueset "HIV 2 VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.120.11.1008'
valueset "HIV Infection (ARV Attachment Inhibitors) (RXNORM) VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1146.1603'
valueset "HIV Infection (ARV Fusion Inhibitors) (RXNORM) VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1146.1596'
valueset "HIV Infection (ARV Postattachment Inhibitors) (RXNORM) VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1146.1602'
valueset "ICD9 Codes for HIV Diagnosis VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1262.3'
valueset "HIV 2 VS_1": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.120.11.1009'
valueset "HIV 2 VS_2": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.120.11.1010'
valueset "History of HIV/AIDS ICD10CM VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1213.72'
valueset "History of HIV/AIDS SNOMED VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113762.1.4.1213.73'
code "Human immunodeficiency virus infection (disorder)": '86406008' from "Snomed"


// HIV AIDS mmeasurements valuesets
valueset "CD4 Percentage VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.121.12.1005'
valueset "CD4+ Percentage VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.121.11.1009'
code "CD3+CD4+ Percent": '8123-2' from "LOINC"

valueset "CD4 Count VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.121.12.1004'
valueset "CD4+ Count VS": 'https://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.121.11.1006'
code "CD3+CD4+ Count": '24467-3' from "LOINC"

context Patient



define "MMR_All_Valuesets":
    MMR_Vaccine_valuesets union MMR_Vaccine_Admin_valuesets union MMR_Vaccine_CVXCodes


define "MMR_Vaccine_valuesets":
     "Measles, Mumps and Rubella (MMR) Vaccine VS"
    union  "Measles, Mumps and Rubella (MMR) Vaccine VS_1"

define "MMR_Vaccine_Admin_valuesets":
  "Measles, Mumps and Rubella (MMR) Vaccine Administered VS"
           "Measles, Mumps and Rubella (MMR) Vaccine Administered VS_1"
    union  "Measles, Mumps and Rubella (MMR) Vaccine Administered VS_2"

define "MMR_Vaccine_CVXCodes":
  "measles, mumps, rubella, and varicella virus vaccine code"
    union "measles, mumps and rubella virus vaccine code"

//
//define "Pregnacy_All_Valuesets":
//    ("Pregnant (ICD10CM) VS" union "Pregnant (SNOMED) VS" union "Pregnant State VS" union "Pregnancy VS" union "Obstetrical or Pregnancy Related Conditions VS") union "Single Pregnacy"
//

define "Pregnacy_All_Valuesets":
    "Single Pregnacy" union ("Pregnant State VS")


define "Immunocompromised_All_Valuesets":
    ("Immunocompromised Conditions VS"  union
     "Immunocompromised Conditions VS_1" union
     "Immunocompromised Conditions I10 VS" union
     "Immunocompromised Conditions VS_2" union
     "Immunocompromised Therapies VS" union
     "Immunocompromised Therapies I10 VS-2" union
     "COVID19 immunocompromised underlying condition reference set VS" union
     "Immunocompromised Therapies I9 VS" union
     "Immunocompromised Therapies SMCT VS" union
     "Immunocompromised state for Urology Care VS") union "Immunodeficiency, unspecified"




define "HIV_AIDS_All_Valuesets":
  ( "HIV Infection or AIDS (Disorders) (SNOMED) VS"
    union "HIV VS"
    union "HIV 1 VS"
    union "HIV Lab Tests VS"
    union "HIV Infection (Tests for HIV Antibody) VS"
    union "Indicators of Human Immunodeficiency Virus (HIV) VS"
    union "Indicators of Human Immunodeficiency Virus (HIV) VS_1"
    union "HIV Infection (ARV Combination Treatment for HIV) (RXNORM) VS"
    union "HIV Infection (Tests for HIV Nucleic Acid [Qualitative]) VS"
    union "HIV Infection (ARV Protease Inhibitors [PIs]) (RXNORM) VS"
    union "Human Immunodeficiency Virus (HIV)  Viral Load VS"
    union "HIV Infection (Tests for HIV Nucleic Acid [Viral Load]) VS"
    union "HIV Infection (ARV Integrase Strand Transfer Inhibitors [INSTIs]) (RXNORM) VS"
    union "HIV Infection (ARV Non nucleoside Reverse Transcriptase Inhibitors [NNRTIs]) (RXNORM) VS"
    union "HIV Infection (Organism or Substance in Lab Results) VS"
    union "HIV Viral Load VS"
    union "HIV Infection (Tests for HIV Antigen) VS"
    union "HIV Infection (Tests for HIV by Culture and Identification Method) VS"
    union "HIV Infection or AIDS (Disorders) (ICD10CM) VS"
    union "HIV Infection (ARV Boosters [CYP3A4 Inhibitor]) (RXNORM) VS"
    union "HIV Infection (ARV CCR5 Antagonists) (RXNORM) VS"
    union "Indicators of Human Immunodeficiency Virus (HIV) VS_2"
    union "HIV 1 VS_1"
    union "HIV Tests VS"
    union "HIV in Pregnancy Childbirth and Puerperium VS"
    union "HIV in Pregnancy Childbirth and Puerperium VS_1"
//    union "ICD10 Codes for HIV Diagnosis VS"
    union "Indicators of Human Immunodeficiency Virus (HIV) VS_3"
    union "HIV Infection (Combination Tests for HIV Antigen and Antibody) VS"
    union "HIV VS_1"
    union "HIV 1 VS_2"
    union "HIV 2 VS"
    union "HIV Infection (ARV Attachment Inhibitors) (RXNORM) VS"
    union "HIV Infection (ARV Fusion Inhibitors) (RXNORM) VS"
    union "HIV Infection (ARV Postattachment Inhibitors) (RXNORM) VS"
    union "ICD9 Codes for HIV Diagnosis VS"
    union "HIV 2 VS_1"
    union "HIV 2 VS_2"
    union "History of HIV/AIDS ICD10CM VS"
    union "History of HIV/AIDS SNOMED VS") union "Human immunodeficiency virus infection (disorder)"

define "HIV_AIDS_Quantity_Valuesets":
    "CD4 Count VS" union "CD4+ Count VS" union "CD3+CD4+ Count"

define "HIV_AIDS_Percent_Valuesets":
    "CD4 Percentage VS" union "CD4+ Percentage VS" union "CD3+CD4+ Percent"

// Convert a FHIR.coding to a System.code
define function ToCode (coding FHIR.Coding):
     System.Code{
	 code: coding.code.value,
	 system: coding.system.value,
	 version: coding.version.value,
	 display: coding.display.value
	 }

define function FindValidCodes(codes List<FHIR.Coding>):
    codes c where ToCode(c) in "MMR_All_Valuesets"

define function FindValidVaccines(Immunizations List<Immunization>):
    Immunizations Temp where  (FindValidCodes(Temp.vaccineCode.coding)) is not null

define function FindValidPregnancyCodes(codes List<FHIR.Coding>):
    codes c where ToCode(c) in "Pregnacy_All_Valuesets"

define function FindValidImmunocompromisedCodes(codes List<FHIR.Coding>):
    codes c where ToCode(c) in "Immunocompromised_All_Valuesets"

define function FindValidHivAidsCodes(codes List<FHIR.Coding>):
    codes c where ToCode(c) in "HIV_AIDS_All_Valuesets"


define function FindValidPregnantCondition(Conditions List<Condition>):
    Conditions Temp where ((FindValidPregnancyCodes(Temp.code.coding)) is not null)


define function FindValidImmunocompromisedCondition(Conditions List<Condition>):
    Conditions Temp where ((FindValidImmunocompromisedCodes(Temp.code.coding)) is not null)

define function FindValidHivAidsCondition(Conditions List<Condition>):
    Conditions Temp where ((FindValidHivAidsCodes(Temp.code.coding)) is not null)





define function FindValidHivAidsObservationMeasurementQuantity(Obs Observation):
       (Obs.value.code.value = "/mm3".code and Obs.value.value.value < 200)


define function FindValidHivAidsCodesCount(codes List<FHIR.Coding>):
    codes c where ToCode(c) in "HIV_AIDS_Quantity_Valuesets"

define function FindValidHivAidsObservationMeasurementPercent(Obs Observation):
       (Obs.value.code.value = "%".code and Obs.value.value.value < 15)


define function FindValidHivAidsCodesPercent(codes List<FHIR.Coding>):
    codes c where ToCode(c) in "HIV_AIDS_Percent_Valuesets"

define function FindValidHivAidsObservation(Obs List<Observation>):
    Obs Temp where (
                    ((FindValidHivAidsCodesCount(Temp.code.coding)) is not null  and FindValidHivAidsObservationMeasurementQuantity(Temp))
                    or
                    ((FindValidHivAidsCodesPercent(Temp.code.coding)) is not null and FindValidHivAidsObservationMeasurementPercent(Temp))
                    )


define function GetAge(unit String):
    if unit = 'week' then
        AgeInWeeks()
    else if unit = 'month' then
        AgeInMonths()
    else if unit = 'year' then
        AgeInYears()
    else
        null

define function GetDifferenceInUnit(date1 Date, date2 Date, unit String):
    if unit = 'week' then
        difference in weeks between date1 and date2
    else if unit = 'month' then
        difference in months between date1 and date2
    else if unit = 'year' then
        difference in years between date1 and date2
    else
        null
